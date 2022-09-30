import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopDescription, TopTitle } from "#shared/ui/Typography/styled";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import { useMobile } from "#shared/hooks";
import OptionBox from "./OptionBox";
import InvestmentStyle1Jpg from "../assets/InvestmentStyle1.jpg";
import InvestmentStyle2Jpg from "../assets/InvestmentStyle2.jpg";
import InvestmentStyle3Jpg from "../assets/InvestmentStyle3.jpg";
import AdvisorsStyle4Jpg from "../assets/AdvisorsStyle4.jpg";

const AccessInvestmentPlatform = () => {
    const { t } = useTranslation("how-works");
    const isMobile = useMobile(991);

    return (
        <AccessInvestmentPlatformContainer>
            <OptionBox
                color="#4f1c28"
                background="#c5d5e4"
                src={InvestmentStyle1Jpg}
                title={t("access-investment-platform.createAccount.title")}
                data={t("access-investment-platform.createAccount.data")}
            />
            <OptionBox
                reverse
                src={InvestmentStyle2Jpg}
                background="#efddc7"
                title={t("access-investment-platform.maximizedReturns.title")}
                data={t("access-investment-platform.maximizedReturns.data")}
            />

            <OptionBox
                src={InvestmentStyle3Jpg}
                background="#e6c9c9"
                color="#3c400c"
                title={t("access-investment-platform.enjoyReturns.title")}
                data={t("access-investment-platform.enjoyReturns.data")}
            />

            <OptionBox
                reverse
                src={AdvisorsStyle4Jpg}
                background="#e0e5cd"
                color="#242e35"
                title={
                    isMobile
                        ? t("access-investment-platform.questions.titleMobile")
                        : t("access-investment-platform.questions.title")
                }
                data={t("access-investment-platform.questions.data")}
            />
        </AccessInvestmentPlatformContainer>
    );
};

export const AccessInvestmentPlatformContainer = styled.div`
    width: 100%;
    color: #242e35;
    text-align: center;
    @media screen and (max-width: 991px) {
        padding-top: 68px;
    }

    ${TopDescription},
    ${TopTitle} {
        margin-left: auto;
        margin-right: auto;
        padding: 0 20px 0;
        max-width: 817px;
    }

    ${TopDescription} {
        margin-bottom: 24px;
    }

    ${TopDescription},
    ${TopTitle} {
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s ease-out;
        }
    }

    ${TopTitle} {
        @media screen and (max-width: 991px) {
            margin-bottom: 64px;
        }
    }
`;

export default AccessInvestmentPlatform;
