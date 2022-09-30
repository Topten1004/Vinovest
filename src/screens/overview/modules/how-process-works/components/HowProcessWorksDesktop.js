import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { BaseModuleContainer } from "../../styles";
import BoxRatio from "#shared/components/BoxRatio";
import FixedList from "./FixedList";
import FixedWrap, { IconWrapper } from "./FixedWrap";
import Tip, { TipWrapper } from "./Tip";
import { useCreateRoutingCallback } from "#shared/hooks";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import { Title, Description, AddFunds } from "./styles";

import illustrationSvg from "../assets/illustration.svg";
import goodPriceSvg from "../assets/goodPrice.svg";
import weBuySvg from "../assets/weBuy.svg";
import addFundsSvg from "../assets/addFunds.svg";

const HowProcessWorksDesktop = () => {
    const iconA = React.useMemo(() => <img src={addFundsSvg} alt="add funds icon" />, []);
    const iconB = React.useMemo(() => <img src={weBuySvg} alt="we buy wine for you" />, []);
    const iconC = React.useMemo(() => <img src={goodPriceSvg} alt="good price" />, []);

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
        <CustomModuleWrapper isRow illustrationSvg={illustrationSvg}>
            <TopDescription>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </TopDescription>
            <RelativeWrapper>
                <BoxRatio ratio={[1175, 427]}>
                    <img className="illustration" src={illustrationSvg} alt="illustration" />
                </BoxRatio>
                <FixedWrap icon={iconA} className="FixedWrapA">
                    <AddFunds onClick={openAddFunds}>{addFunds}</AddFunds>
                </FixedWrap>
                <FixedWrap icon={iconB} className="FixedWrapB">
                    <FixedList list={fixedListA} text={fixedTextA} />
                </FixedWrap>
                <FixedWrap icon={iconC} className="FixedWrapC">
                    <FixedList list={fixedListB} text={fixedTextB} />
                </FixedWrap>
                <Tip text={tipATitle} className="fixedTipA" />
                <Tip list={tipBList} text={tipBTitle} className="fixedTipB" />
            </RelativeWrapper>
        </CustomModuleWrapper>
    );
};

export const CustomModuleWrapper = styled(BaseModuleContainer)`
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;

    @media (min-width: 0px) {
        padding: 150px 38px 45px 1px;
        height: fit-content;
    }

    @media (max-width: 1080px) {
        padding-top: 200px;
    }

    @media (max-width: 970px) {
        padding-top: 355px;
    }

    .illustration {
        width: 100%;
        object-fit: contain;
    }
`;

const TopDescription = styled.div`
    position: absolute;
    left: 65px;
    top: 51px;
    width: 100%;
    z-index: 1;
`;

const RelativeWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    .FixedWrapA {
        left: calc(100% / 1200 * 180);
        bottom: calc(100% / 435 * 1);
        align-items: center;

        .verticalLine {
            height: 117px;
        }
    }
    .FixedWrapB {
        left: calc(100% / 1200 * 500);
        bottom: calc(100% / 435 * 34);

        .verticalLine {
            height: 92px;
        }

        ${IconWrapper} {
            margin-top: 21px;
        }
    }

    .FixedWrapC {
        left: calc(100% / 1200 * 917);
        bottom: calc(100% / 435 * 170);
    }

    .fixedTipA {
        left: calc(100% / 1200 * 340);
        bottom: calc(100% / 435 * 88.6);
        max-width: 140px;
    }

    .fixedTipB {
        left: calc(100% / 1200 * 670);
        bottom: calc(100% / 435 * 186);
        max-width: 206px;
    }

    @media (max-width: 1131px) {
        .FixedWrapA {
            left: calc(100% / 1200 * 40);
        }

        .FixedWrapB {
            left: calc(100% / 1200 * 440);
        }

        .FixedWrapC {
        }

        .fixedTipA {
            left: calc(100% / 1200 * 230);
        }

        .fixedTipB {
            left: calc(100% / 1200 * 620);
        }
    }

    @media (max-width: 909px) {
        ${TipWrapper} {
            padding: 15px 10px;
        }

        .FixedWrapA {
            left: calc(100% / 1200 * 10);
        }

        .FixedWrapB {
            left: calc(100% / 1200 * 420);
        }

        .FixedWrapC {
        }

        .fixedTipA {
            bottom: calc(100% / 435 * 160);
            left: calc(100% / 1200 * 210);
            max-width: 125px;
        }

        .fixedTipB {
            max-width: 140px;
            left: calc(100% / 1200 * 655);
        }
    }
`;

export default HowProcessWorksDesktop;
