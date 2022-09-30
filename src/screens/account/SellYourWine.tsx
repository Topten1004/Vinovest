import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useHistory } from "#shared/hooks/useHistory";
import { MainButton } from "#shared/ui";
import { ROUTE_PATHS } from "#screens/route-paths";
import { getStatus } from "#models/FetchStatus";
import { useRootStore } from "#shared/hooks";
import { PageHeader } from "#shared/components/PageHeader";
import {I18nLink as Link} from "#localization/localizedRouter";
import { useConfig } from "#shared/hooks";
import { languageCodeChina } from "../../utils/constants";

export const SellYourWine = observer(() => {
    const { t } = useTranslation(["account"]);
    const config = useConfig();

    const s = useRootStore();
    const currencyCode = s.user.userCurrency;
    const history = useHistory();
    const winesInLiquidationProcessIsDone = getStatus(s.liquidation.winesInLiquidationProcessEntity).isDone();
    const liquidateWinesListIsDone = getStatus(s.liquidation.liquidateWinesListEntity).isDone();

    const { winesInLiquidationProcess, liquidateWinesList } = s.liquidation;

    React.useEffect(() => {
        if (s.auth.isAuthenticated && s.user.oktaUserInfo && s.user.oktaUserInfo.sub) {
            if (!s.liquidation.winesInLiquidationProcess.length) {
                s.liquidation.fetchWinesInLiquidationProcess();
            }

            if (!s.liquidation.liquidateWinesList.length) {
                s.liquidation.fetchLiquidateWinesList(currencyCode);
            }
        }

        return () => {
            s.liquidation.resetState();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s.auth.isAuthenticated, s.user.oktaUserInfo.sub]);

    const disableButton = winesInLiquidationProcess.length && liquidateWinesList.length;

    function handleSellYourWine() {
        try {
            posthog.capture("click_sell_your_wine_account_setting", {});
        } catch (err) {}
        history.push(ROUTE_PATHS.beforeYouRequest);
    }
    const onBookACall = React.useCallback(() => {
        posthog.capture("rebalance_calendly", {
            component: "SellYourWine",
            progress: "launch",
            location: "overview",
        });
        if (!languageCodeChina) {
            window.Calendly.initPopupWidget({
                url: config.calendly.rebalancing
            })
        } else {
            window.location.href = "https://airtable.com/shr0yMiUh5ty4zjyP";
        }
    }, [config]);

    return (
        <>
            <Wrapper style={{ marginBottom: "20px" }}>
                {!winesInLiquidationProcessIsDone || !liquidateWinesListIsDone ? (
                    <Skeleton style={{ height: "48px", width: "50%", marginBottom: "42px" }} />
                ) : (
                    <PageHeader>{t("account_settings.rebalance")}</PageHeader>
                )}
                {!winesInLiquidationProcessIsDone || !liquidateWinesListIsDone ? (
                    <>
                        <Skeleton count={1} height="50px" style={{ marginBottom: "1.5rem" }} />
                        <Skeleton count={1} style={{ height: "50px", width: "300px", marginBottom: "1.5rem" }} />
                    </>
                ) : (
                    <>
                        <Description style={{ marginBottom: "40px" }}>{t("rebalance_description")}</Description>
                        <BookACall
                            onClick={onBookACall}
                            disabled={disableButton || !s.liquidation.liquidateWinesList.length}
                        >
                            {t("book_a_call")}
                        </BookACall>
                    </>
                )}
            </Wrapper>

            <Wrapper>
                {!winesInLiquidationProcessIsDone || !liquidateWinesListIsDone ? (
                    <Skeleton style={{ height: "48px", width: "50%", marginBottom: "42px" }} />
                ) : (
                    <PageHeader>{t("account_settings.liquidate_portfolio")}</PageHeader>
                )}

                <div>
                    <Container>
                        {!winesInLiquidationProcessIsDone || !liquidateWinesListIsDone ? (
                            <>
                                <Skeleton count={1} height="50px" style={{ marginBottom: "1.5rem" }} />
                                <Skeleton
                                    count={1}
                                    style={{ height: "50px", width: "300px", marginBottom: "1.5rem" }}
                                />
                                <Skeleton count={1} height="28px" />
                            </>
                        ) : (
                            <>
                                <Description>{t("sell_your_wine.description.paragraph1")}</Description>
                                <Description>
                                    <p style={{ margin: "0" }}>{t("sell_your_wine.description.paragraph2")}</p>
                                    <p style={{ margin: "0" }}>{t("sell_your_wine.description.paragraph3")}</p>
                                </Description>
                                <Description>{t("sell_your_wine.description.paragraph4")}</Description>

                                <ButtonContainer>
                                    <MainSellButton
                                        onClick={handleSellYourWine}
                                        disabled={disableButton || !s.liquidation.liquidateWinesList.length}
                                    >
                                        {disableButton
                                            ? t("sell_your_wine.sell_button.enabled")
                                            : t("sell_your_wine.sell_button.disabled")}
                                    </MainSellButton>
                                    <ContactSupport>
                                        {disableButton ? (
                                            <>
                                                {t("sell_your_wine.support.sold")}{" "}
                                                <a href="mailto:support@vinovest.co">
                                                    {t("sell_your_wine.support.sold_email_message")}
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                {t("sell_your_wine.support.notsold")}{" "}
                                                <Link to="/help">
                                                    {t("sell_your_wine.support.notsold_email_message")}
                                                </Link>
                                            </>
                                        )}
                                    </ContactSupport>
                                </ButtonContainer>
                            </>
                        )}
                    </Container>
                </div>
            </Wrapper>
        </>
    );
});

const Container = styled.div`
    width: 100%;
`;

const Description = styled.div`
    font-size: 16px;
    line-height: 25px;
    color: #242424;
    padding: 5px;
    margin-top: 24px;

    @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 0.5rem;

    button {
        margin: 8px auto;
    }
`;

const MainSellButton = styled(MainButton)`
    margin-left: 0 !important;
`;

const ContactSupport = styled.div`
    margin-top: 35px;
    width: 100%;
    text-align: left;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;

    @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 21px;
    }

    a {
        color: #a86d37;
        text-decoration: none;
    }
`;

const Wrapper = styled.div`
    border: 1px solid ${(p) => p.theme.colors.lighterGray};
    border-radius: 10px;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    padding: 1.5rem 1rem;
    ${(p) => p.theme.media.greaterThan("1024px")` 
        padding: 3rem;       
  `};
`;

const BookACall = styled(MainSellButton)`
    width: 220px;
    @media (max-width: 767px) {
        width: 100%;
    }
`;
