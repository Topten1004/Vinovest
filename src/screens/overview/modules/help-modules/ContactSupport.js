import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useConfig } from "#shared/hooks";
import { MainButton } from "#shared/ui";
import { Left, Right } from "./styles";
import hunterRSvg from "./assets/faq/hunterR.svg";
import ivanCSvg from "./assets/faq/ivanC.svg";
import elaineLSvg from "./assets/faq/elaineL.svg";
import laurenBSvg from "./assets/faq/laurenB.svg";
import phoneSvg from "./assets/faq/phone.svg";
import { BaseModuleContainer } from "../styles";
import { languageCodeChina } from "../../../../utils/constants";

const data = (t) => [
    { src: ivanCSvg, fullName: "Ivan Cassuto", role: t("premium.advisor") },
    { src: hunterRSvg, fullName: "Hunter  Robillard", role: t("premium.advisor") },
    { src: elaineLSvg, fullName: "Elaine Lau", role: t("premium.advisor") },
    { src: laurenBSvg, fullName: "Lauren Bletcher", role: t("premium.advisor") },
];

const ContactSupportPremium = () => {
    const {
        t,
        i18n: { locale },
    } = useTranslation(["overview"]);

    const config = useConfig();
    const onBookACall = React.useCallback(() => {
        posthog.capture("calendly", {
            component: "ContactSupport",
            progress: "launch",
            location: "let-us-help-overview",
        });
        if (!languageCodeChina) {
            window.Calendly.initPopupWidget({
                url: config.calendly.wineExpertsUrl,
            });
        } else {
            window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
        }
    }, [config]);

    const list = React.useMemo(
        () => data(t),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [locale],
    );

    return (
        <CustomModuleWrapper isRow>
            <LeftWrapper>
                <h3>{t("premium.letUsHelp")}</h3>
                <p>{t("premium.dontHaveToInvest")}</p>
                <ButtonBookACall onClick={onBookACall}>{t("premium.book")}</ButtonBookACall>
            </LeftWrapper>
            <RightWrapper>
                <div className="boxInner">
                    <SupportTeamWrapper>
                        {list.map((member) => (
                            <SupportTeamMember key={member.fullName}>
                                <img className="memberAvatar" src={member.src} alt={member.fullName} />
                                <div className="memberInfo">
                                    <div className="titleMember">{member.fullName}</div>
                                    <div className="roleMember">{member.role}</div>
                                </div>
                                <img src={phoneSvg} className="phoneIcon" alt="phone icon" />
                            </SupportTeamMember>
                        ))}
                    </SupportTeamWrapper>
                </div>
            </RightWrapper>
        </CustomModuleWrapper>
    );
};

const ButtonBookACall = styled(MainButton)`
    border-radius: 3px;

    @media (min-width: 0px) {
        max-width: 202px;
        height: 50px;
        margin: 0;
        margin-top: 39px;
        margin-bottom: 39px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
        margin-bottom: 27px;
    }
`;

const LeftWrapper = styled(Left)`
    margin-right: 40px;

    h3 {
        margin: 0;
    }

    p {
        margin-top: 15px;
    }

    a {
        display: flex;
        color: #fff;
        background: #a86d37;
        width: 202px;
        height: 50px;
        margin-top: 39px;
        margin-bottom: 39px;
        cursor: pointer;
        transition: box-shadow 0.3s ease-in-out;
        @media (max-width: 768px) {
            width: 100%;
        }
        &:hover {
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        max-width: 100%;
        width: 100%;
    }

    @media (max-width: 900px) {
        margin-right: 0;
    }
`;

const RightWrapper = styled(Right)`
    padding-right: 61px;

    @media (max-width: 900px) {
        padding-left: 10px;
        padding-right: 10px;
    }

    .boxInner {
        width: 523px;
        min-height: 298px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #efddc7;
        position: relative;

        @media (max-width: 900px) {
            width: calc(100% - 15px);
        }

        &:before {
            content: " ";
            display: block;
            border-top: 1px solid #efddc7;
            border-right: 1px solid #efddc7;
            box-sizing: border-box;
            border-top-right-radius: 10px;
            position: absolute;
            top: 20px;
            bottom: 1px;
            right: -15px;
            left: 0;
        }
    }
`;

export const CustomModuleWrapper = styled(BaseModuleContainer)`
    display: flex;
    justify-content: space-between;
    height: fit-content;

    @media (min-width: 0px) {
        height: fit-content;
        padding: 0 57px 1px 66px;
    }

    @media (max-width: 1023px) {
        padding: 0 0 1px 45px;
    }

    @media (max-width: 900px) {
        flex-direction: column;
        padding: 33px 45px 0;
    }

    @media (max-width: 600px) {
        padding: 33px 22px 0;
    }
`;

const SupportTeamMember = styled.div`
    background: #ffffff;
    border-radius: 100px;
    max-width: 335px;
    width: 100%;
    min-height: 74px;
    padding-left: 10px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
        max-width: 201.7px;
        min-height: 44.5px;
        padding-left: 6px;
        padding-right: 18;
    }

    .memberAvatar {
        width: 55px;
        height: 55px;
        object-fit: cover;

        @media (max-width: 600px) {
            width: 33.12px;
            height: 33.12px;
        }
    }

    .memberInfo {
        flex-grow: 1;
        margin-left: 23px;

        @media (max-width: 600px) {
            margin-left: 9px;
        }

        .titleMember {
            text-transform: uppercase;
            font-family: VinovestMono;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;

            @media (max-width: 600px) {
                font-size: 11px;
            }
        }

        .roleMember {
            font-family: VinovestMedium;
            font-style: normal;
            font-weight: 500;
            font-size: 11px;
            line-height: 18px;

            @media (max-width: 600px) {
                font-size: 10px;
            }
        }
    }

    .phoneIcon {
        width: 20px;
        object-fit: contain;

        @media (max-width: 600px) {
            width: 12px;
        }
    }
`;

const SupportTeamWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 42px 0;
    min-height: 461px;
    width: 100%;

    ${SupportTeamMember}:nth-child(odd) {
        transform: translateX(41px);
    }

    ${SupportTeamMember}:nth-child(even) {
        transform: translateX(-37px);
    }

    @media (max-width: 600px) {
        padding: 36px 0;
        min-height: 298px;

        ${SupportTeamMember}:nth-child(odd) {
            transform: translateX(31.96px);
        }

        ${SupportTeamMember}:nth-child(even) {
            transform: translateX(-15px);
        }
    }

    @media (max-width: 350px) {
        ${SupportTeamMember}:nth-child(odd) {
            transform: translateX(10px);
        }

        ${SupportTeamMember}:nth-child(even) {
            transform: translateX(-20px);
        }
    }
`;

export default ContactSupportPremium;
