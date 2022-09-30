/* eslint-disable indent */
import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { Fade, BottleAnimationLoader } from "#shared/ui";
import { getStatus } from "#models/FetchStatus";
import { useRootStore } from "#shared/hooks";
import { useHistory } from "#shared/hooks/useHistory";
import StepWrapper from "./components/step-wrapper";
import flow from "./liquidationFlow";
import SellOptions from "./components/sell-options";
import ConfirmLiquidation from "./components/confirm-liquidation";
import SelectWines from "./components/select-wines";
import WithdrawOptions from "./components/withdraw-options";
import ConfirmYourAgreements from "./components/confirm-your-agreements";
import RebalancePortfolio from "./components/rebalance-portfolio";


const Liquidation = () => {
    const { t } = useTranslation(["liquidation"]);
    const history = useHistory();
    const [step, setStep] = React.useState("choose-the-option");
    const [selectedSellOption, setSelectedSellOption] = React.useState(null);
    const [selectedWithdrawOption, setSelectedWithdrawOption] = React.useState(null);
    const [selectedWines, setSelectedWines] = React.useState([]);
    const s = useRootStore();
    
    const { liquidateWinesList, winesInLiquidationProcess } = s.liquidation;

    const isDoneWinesInLiquidationProcess = getStatus(s.liquidation.winesInLiquidationProcessEntity).isDone();
    const liquidateWinesListPending = getStatus(s.liquidation.liquidateWinesListEntity).isPending();

    if (winesInLiquidationProcess.length && isDoneWinesInLiquidationProcess && step !== "confirm-liquidation") {
        setStep("confirm-liquidation");
    }

    React.useEffect(() => {
        if (selectedSellOption && !liquidateWinesListPending) {
            setSelectedWines(selectedSellOption === "all" ? liquidateWinesList.map(({ lwin18 }) => lwin18) : []);
        }
    }, [selectedSellOption, liquidateWinesList, liquidateWinesListPending]);

    React.useEffect(() => {
        if (s.auth.isAuthenticated && s.user.oktaUserInfo && s.user.oktaUserInfo.sub) {
            if (!s.liquidation.liquidateWinesList.length) {
                s.liquidation.fetchWinesInLiquidationProcess();
            }
        }

        return () => {
            s.liquidation.resetState();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s.auth.isAuthenticated, s.user.oktaUserInfo.sub]);

    React.useEffect(() => window.scrollTo(0, 0), [step]);

    const flowWithSteps = React.useMemo(() => flow(t), [t]);

    const { title, next, prev, description, subPage } = flowWithSteps[step] || {};

    const moveStep = (move) => (move.includes("/") ? history.push(move) : setStep(move));
    const goBack = prev ? () => moveStep(prev) : null;
    const isPartial = selectedWines.length && selectedWines.length !== liquidateWinesList.length;

    const goNext = () => {
        if (next && next !== "withdraw-options") {
            moveStep(next);
        }
        if (next === "withdraw-options" && isPartial) {
            moveStep("withdraw-options");
        }
        if (next === "withdraw-options" && !isPartial) {
            moveStep("confirm-liquidation");
        }
        if (selectedWithdrawOption === "reinvest") {
            moveStep("rebalance-portfolio");
        }
        if (!next) {
            return null;
        }
    };

    let currentStep = null;

    let showGoBack = true;

    const shouldBeLiquidated = React.useMemo(
        () => liquidateWinesList.filter(({ lwin18 }) => selectedWines.includes(lwin18)),
        [liquidateWinesList, selectedWines],
    );

    const onRequestWithdrawalClick = React.useCallback(
        (callBack) => {
            const liquidateList = shouldBeLiquidated.map(({ lwin18, bottleCount }) => ({
                lwin18,
                quantity: bottleCount,
            }));
            s.liquidation.liquidateWines(liquidateList, callBack);
        },
        [s.liquidation, shouldBeLiquidated],
    );

    switch (subPage) {
        case "choose-the-option":
            currentStep = (
                <SellOptions
                    goNext={() => {
                        try {
                            posthog.capture("click_next_describe_goal", { goal: selectedSellOption });
                        } catch (err) {}
                        goNext();
                    }}
                    selectedSellOption={selectedSellOption}
                    setSelectedSellOption={setSelectedSellOption}
                    nextTitle={t("next")}
                />
            );
            break;

        case "select-wines":
            currentStep = (
                <SelectWines
                    selectedWines={selectedWines}
                    setSelectedWines={setSelectedWines}
                    goNext={() => {
                        try {
                            posthog.capture("click_next_select_wines_to_sell", {});
                        } catch (err) {}
                        goNext();
                    }}
                    liquidateWinesList={liquidateWinesList}
                    liquidateWinesListPending={liquidateWinesListPending}
                    generalWinesList={liquidateWinesList}
                />
            );
            break;

        case "confirm-your-wines":
            currentStep = (
                <SelectWines
                    selectedWines={selectedWines}
                    goNext={goNext}
                    liquidateWinesList={shouldBeLiquidated}
                    liquidateWinesListPending={liquidateWinesListPending}
                    generalWinesList={liquidateWinesList}
                    confirmMode
                />
            );
            break;

        case "confirm-your-agreements":
            currentStep = (
                <ConfirmYourAgreements
                    goNext={goNext}
                    nextTitle={t("acknowledge_button")}
                    onRequestWithdrawalClick={onRequestWithdrawalClick}
                    isPartial={isPartial}
                />
            );
            break;

        case "withdraw-options":
            currentStep = (
                <WithdrawOptions
                    goNext={() => {
                        if (selectedWithdrawOption === "reinvest") {
                            try {
                                posthog.capture("reinvest_funds", {});
                            } catch (err) {}
                        }
                        goNext();
                    }}
                    selectedWithdrawOption={selectedWithdrawOption}
                    setSelectedWithdrawOption={setSelectedWithdrawOption}
                    nextTitle={t("acknowledge_button")}
                    onRequestWithdrawalClick={onRequestWithdrawalClick}
                />
            );
            break;
        case "rebalance-portfolio":
            currentStep = <RebalancePortfolio />
            break;

        case "confirm-liquidation":
            showGoBack = false;
            currentStep = <ConfirmLiquidation />;
            break;

        default:
            showGoBack = false;
            currentStep = null;
    }

    return (
        <Fade in>
            {isDoneWinesInLiquidationProcess ? (
                <StepWrapper
                    title={title}
                    goBack={showGoBack ? goBack : null}
                    description={description}
                    subPage={subPage}
                >
                    {currentStep}
                </StepWrapper>
            ) : (
                <BottleAnimationLoader />
            )}
        </Fade>
    );
};

export default observer(Liquidation);
