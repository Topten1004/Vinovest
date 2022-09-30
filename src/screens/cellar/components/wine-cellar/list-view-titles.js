import React from "react";
import styled from "styled-components";
import { useMobile } from "#shared/hooks";
import WithToolTipWrapper from "#shared/components/with-tool-tip";
import { ListOfTitles, CellBasis } from "../assets/basicStyles";
import infoSvg from "../assets/icons/info.svg";
import { useTranslation } from "react-i18next";

const ListViewTitles = ({ cellarViewState }) => {
    const { t } = useTranslation(["portfolio"]);
    const isMobile = useMobile(1023);
    const isTablet = useMobile(1024);

    return (
        <ListOfTitlesWithMobile pale={cellarViewState === "grid"}>
            <CellBasisWithMobile style={{ paddingLeft: "14px", textAlign: "left" }}>
                <span>{t("wine-cellar.list-view-titles.wine")}</span>
            </CellBasisWithMobile>
            {!isMobile && (
                <>
                    <CellBasis>
                        <NoWrap>
                            <span>{t("wine-cellar.list-view-titles.quantity")}</span>{" "}
                            <WithToolTipWrapper text={t("wine-cellar.list-view-titles.tooltip-quantity")}>
                                <img src={infoSvg} alt="info" />
                            </WithToolTipWrapper>
                        </NoWrap>
                    </CellBasis>
                    <CellBasis>
                        <span>{t("wine-cellar.list-view-titles.avg-cost")}</span>{" "}
                        <NoWrap>
                            <span>{t("wine-cellar.list-view-titles.basis")}</span>{" "}
                            <WithToolTipWrapper text={t("wine-cellar.list-view-titles.tooltip-cost-basis")}>
                                <img src={infoSvg} alt="info" />
                            </WithToolTipWrapper>
                        </NoWrap>
                    </CellBasis>
                </>
            )}
            <>
                <CellBasisWithMobile>
                    <span>{t("wine-cellar.list-view-titles.position")}</span>{" "}
                    <NoWrap>
                        <span>{t("wine-cellar.list-view-titles.total")}</span>{" "}
                        <WithToolTipWrapper
                            toRight={isTablet}
                            text={t("wine-cellar.list-view-titles.tooltip-position")}
                        >
                            <img src={infoSvg} alt="info" />
                        </WithToolTipWrapper>
                    </NoWrap>
                </CellBasisWithMobile>
            </>
        </ListOfTitlesWithMobile>
    );
};

const NoWrap = styled.span`
    white-space: nowrap;
`;

const ListOfTitlesWithMobile = styled(ListOfTitles)`
    @media screen and (max-width: 1023px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 0;
        border: 0;
    }
`;

const CellBasisWithMobile = styled(CellBasis)`
    @media screen and (max-width: 1023px) {
        margin-right: 18px;
        padding-left: 14px;
        margin-top: 9px;
        margin-bottom: 6px;
    }
`;

export default ListViewTitles;
