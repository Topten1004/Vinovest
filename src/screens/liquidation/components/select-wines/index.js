import React from "react";
import { observer } from "mobx-react-lite";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useRootStore } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import { I18nLink } from "#localization/localizedRouter";
import { Fade } from "#shared/ui";
import CustomCheckbox from "#shared/components/CustomCheckbox";
import MarkSvg from "#assets/shared/MarkSvg";
import Note from "../note";
import NextButton from "../next-button";
import { ROUTE_PATHS } from "../../../route-paths";
import { NotesWrapper } from "../styled";
import { uppercaseWordsInString } from "#utils/stringUtils";

const showWinesCountByLwin18 = ({ lwin18, bottleCount, t }) => {
    const winesInCase = lwin18 && +lwin18.slice(11, 13);
    const count = winesInCase ? (+bottleCount / +winesInCase).toFixed(0) : +bottleCount;
    const type =
        winesInCase > 1 ?
            count > 1 ?
                t("before_you_request.select_wines.cases") :
                t("before_you_request.select_wines.case") :
            t("before_you_request.select_wines.bottle");

    return `${count} ${type}`;
};

const SelectWines = ({
    liquidateWinesList = [],
    liquidateWinesListPending,
    goNext,
    selectedWines = [],
    setSelectedWines,
    confirmMode,
    generalWinesList,
}) => {
    const { t } = useTranslation(["liquidation"]);
    const s = useRootStore();
    const currencyCode = s.user.userCurrency;
    const isPostWinesToLiquidatePending = getStatus(s.liquidation.postWinesToLiquidateStatusEntity).isPending();

    React.useEffect(() => {
        if (s.auth.isAuthenticated && s.user.oktaUserInfo && s.user.oktaUserInfo.sub) {
            if (!s.liquidation.liquidateWinesList.length) {
                s.liquidation.fetchLiquidateWinesList(currencyCode);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s.auth.isAuthenticated, s.user.oktaUserInfo.sub]);

    const checkedHandler = ({ target }) => {
        setSelectedWines((selected) => {
            if (selected.includes(target.value)) {
                return selected.filter((lwin18) => lwin18 !== target.value);
            }
            return [...selected, target.value];
        });
    };

    const notes = [
        {
            id: "1",
            text: (
                <>
                    {t("before_you_request.sell_options.note")}{" "}
                    <I18nLink to={ROUTE_PATHS.transactions} target="_blank">
                        {t("sell-options.transactionTab")}
                    </I18nLink>
                </>
            ),
        },
        {
            id: "2",
            text: <> {t("general_note")} </>,
        },
    ];

    const note =
        generalWinesList.length === selectedWines.length && !liquidateWinesListPending ? (
            <NotesWrapper>
                {notes.map((item) => (
                    <Note key={item.id}>{item.text}</Note>
                ))}
            </NotesWrapper>
        ) : (
            <NotesWrapper>
                {notes.slice(1, 2).map((item) => (
                    <Note key={item.id}>{item.text}</Note>
                ))}
            </NotesWrapper>
        );
    return (
        <Fade in>
            <div>
                <Table>
                    <TableTitle>{t("before_you_request.select_wines.holdings.title")}</TableTitle>
                    <Quantity>{t("before_you_request.select_wines.holdings.quantity")}</Quantity>
                    <TableTitle hide={confirmMode}>{t("before_you_request.select_wines.holdings.sell")}</TableTitle>
                    {liquidateWinesList.map(({ name, lwin18, bottleCount, pending }) => (
                        <React.Fragment key={lwin18}>
                            <NameCell>
                                {pending ? (
                                    <Skeleton
                                        style={{
                                            height: "24px",
                                            maxWidth: "240px",
                                            width: "100%",
                                            display: "block",
                                            margin: "0",
                                        }}
                                    />
                                ) : (
                                    uppercaseWordsInString(name)
                                )}
                            </NameCell>
                            <Cell>
                                {pending ? (
                                    <Skeleton
                                        style={{
                                            height: "24px",
                                            maxWidth: "50px",
                                            width: "100%",
                                            display: "block",
                                            margin: "0",
                                        }}
                                    />
                                ) : (
                                    showWinesCountByLwin18({ bottleCount, lwin18, t })
                                )}
                            </Cell>
                            <CellWithInput>
                                {confirmMode ? (
                                    <MarkSvg color={selectedWines.includes(lwin18) ? "#448B47" : "#fff"} />
                                ) : (
                                    <>
                                        {liquidateWinesListPending ? (
                                            <Skeleton
                                                style={{
                                                    height: "24px",
                                                    width: "24px",
                                                    display: "block",
                                                    margin: "0",
                                                }}
                                            />
                                        ) : (
                                            <CustomCheckbox
                                                id={lwin18}
                                                value={lwin18}
                                                checked={selectedWines.includes(lwin18)}
                                                onChange={checkedHandler}
                                                disabled={liquidateWinesListPending}
                                            />
                                        )}
                                    </>
                                )}
                            </CellWithInput>
                        </React.Fragment>
                    ))}
                </Table>
                {note}
                <NextButtonWrapper>
                    {confirmMode ? (
                        <NextButton
                            goNext={goNext}
                            nextTitle={t("acknowledge_button")}
                            disabled={liquidateWinesListPending || isPostWinesToLiquidatePending}
                            isLoading={isPostWinesToLiquidatePending}
                        />
                    ) : (
                        <NextButton
                            goNext={selectedWines.length ? goNext : null}
                            disabled={liquidateWinesListPending}
                        />
                    )}
                </NextButtonWrapper>
            </div>
        </Fade>
    );
};

const Table = styled.div`
    display: grid;
    grid-template-columns: 1fr max-content max-content;
    grid-template-rows: 1fr;
    gap: 1px 0px;
    grid-template-areas: ". . .";
    background: #eeeeee;
    max-width: 780px;
    width: 100%;
    margin: 51px auto 45px;
    border-bottom: 1px solid #eeeeee;
`;

const TableTitle = styled.div`
    padding: 17px 0;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #767a7f;
    background: #fff;
    ${({ hide }) => (hide ? "color: transparent;" : "")}
`;

const Quantity = styled(TableTitle)`
    min-width: 175px;

    @media screen and (max-width: 1024px) {
        min-width: 85px;
    }
`;

const Cell = styled.div`
    padding: 17px 0;
    padding-right: 10px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;
    background: #fff;
`;

const NameCell = styled(Cell)`
    min-width: 160px;
    width: 100%;
`;

const CellWithInput = styled(Cell)`
    padding-right: 15px;
`;

const NoteWrapper = styled.div`
    width: fit-content;
    margin: 0 auto;
    padding-bottom: 10px;
`;

const NextButtonWrapper = styled.div`
    width: 100%;
    margin-top: 50px;
`;

export default observer(SelectWines);
