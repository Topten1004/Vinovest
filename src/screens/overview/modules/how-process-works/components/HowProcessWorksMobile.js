import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { BaseModuleContainer } from "../../styles";
import FixedList from "./FixedList";
import Tip from "./Tip";
import { useCreateRoutingCallback } from "#shared/hooks";
import { DepositEvent } from "#screens/deposit/RootDepositPage";

import { Title, Description, AddFunds } from "./styles";

import goodPriceSvg from "../assets/goodPriceMobile.svg";
import weBuySvg from "../assets/weBuyMobile.svg";
import addFundsSvg from "../assets/addFundsMobile.svg";

const HowProcessWorksMobile = () => {
    const iconA = React.useMemo(() => <img width="46px" src={addFundsSvg} alt="add funds icon" />, []);
    const iconB = React.useMemo(() => <img width="46px" src={weBuySvg} alt="we buy wine for you" />, []);
    const iconC = React.useMemo(() => <img width="46px" src={goodPriceSvg} alt="good price" />, []);

    const openAddFunds = useCreateRoutingCallback("/deposit", {
        posthogId: DepositEvent.AddFunds,
        refresh: true,
    });

    const { t } = useTranslation(["overview"]);
    const title = t("how-process-works.title");
    const description = t("how-process-works.description");
    const tipATitle = t("how-process-works.tipATitle");
    const tipBTitle = t("how-process-works.tipBTitle");
    const tipBList = t("how-process-works.tipBList");
    const fixedListA = t("how-process-works.fixedListA");
    const fixedTextA = t("how-process-works.fixedTextA");
    const fixedListB = t("how-process-works.fixedListB");
    const fixedTextB = t("how-process-works.fixedTextB");
    const addFunds = t("how-process-works.addFunds");

    return (
        <CustomModuleWrapper isRow>
            <Title>{title}</Title>
            <Description>{description}</Description>

            <DivideWrapper>
                <div className="leftA flexCenter">
                    {iconA}
                    <div className="rightLine" />
                </div>
                <div className="addFundsButtonA">
                    <AddFundsButton onClick={openAddFunds}>{addFunds}</AddFundsButton>
                </div>
                <div className="leftB flexCenter" />
                <Tip notAbsolute text={tipATitle} className="fixedTipB" toLeft />
                <div className="leftC flexCenter">
                    {iconB}
                    <div className="rightLine" />
                </div>
                <div className="fixedListC">
                    <FixedList list={fixedListA} text={fixedTextA} />
                </div>
                <div className="leftD flexCenter" />
                <Tip notAbsolute list={tipBList} text={tipBTitle} className="fixedTipD" toLeft />
                <div className="leftE">
                    <div className="flexCenter">
                        {iconC}
                        <div className="rightLine" />
                    </div>
                </div>
                <div className="fixedListE">
                    <FixedList list={fixedListB} text={fixedTextB} />
                </div>
            </DivideWrapper>
        </CustomModuleWrapper>
    );
};

export const CustomModuleWrapper = styled(BaseModuleContainer)`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    overflow: hidden;

    @media (min-width: 0px) {
        padding: 26px 20px 36px;
        height: fit-content;
    }
`;
const DivideWrapper = styled.div`
    margin: 45px auto 0;
    position: relative;
    display: grid;
    grid-template-columns: 86fr 212fr;
    gap: 0px 0px;
    grid-template-areas:
        "leftA a"
        "leftB b"
        "leftC c"
        "leftD d"
        "leftE e";

    max-width: 500px;
    width: 100%;

    .addFundsButtonA {
        grid-area: a;
        width: 100%;
        padding-top: 7px;

        button {
            width: 100%;
        }
    }
    .fixedTipB {
        grid-area: b;
        margin-top: 24px;
        margin-bottom: 29px;
        max-width: 100%;
    }
    .fixedListC {
        grid-area: c;
    }
    .fixedTipD {
        grid-area: d;
        margin: 22px 0;
        max-width: 100%;
    }
    .fixedListE {
        grid-area: e;
    }

    .leftA,
    .leftB,
    .leftC,
    .leftD,
    .leftE {
        position: relative;
        z-index: 1;
        padding-right: 13px;
    }

    .flexCenter {
        display: flex;
        align-items: center;
        height: fit-content;
    }

    .leftE {
        background-color: #fff;
    }

    .rightLine {
        width: 27px;
        height: 1px;
        background: #3c400c;
        flex-grow: 1;
    }

    &:before {
        content: " ";
        display: block;
        position: absolute;
        left: 23px;
        top: 0;
        height: 100%;
        width: 2px;
        border-left: 2px dashed #3c400c;
    }
`;

const AddFundsButton = styled(AddFunds)`
    min-height: 32px;
`;

export default HowProcessWorksMobile;
