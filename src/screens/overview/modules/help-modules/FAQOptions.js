import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCreateRoutingCallback } from "#shared/hooks";
import { BaseModuleContainer } from "../styles";
import { LeftSide } from "./styles";
import Accordion from "#shared/components/Accordion";
import fagSvg from "./assets/faq/faq.svg";
import bottleSvg from "./assets/faq/bottle.svg";
import bottleLogoSvg from "./assets/faq/bottleLogo.svg";
import labelSvg from "./assets/faq/label.svg";
import oldBuildingSvg from "./assets/faq/oldBuilding.svg";
import wineAndBidSvg from "./assets/faq/wineAndBid.svg";

const FAQOptions = () => {
    const {
        t,
        i18n: { locale },
    } = useTranslation(["overview"]);

    const goToInvite = useCreateRoutingCallback("/invite");

    const data = React.useMemo(
        () => [
            {
                src: bottleSvg,
                ...getFields(t, 0),
            },
            {
                src: labelSvg,
                ...getFields(t, 1),
                redirect: goToInvite,
                redirectText: t("fag-overview-options.redirectText"),
            },
            {
                src: bottleLogoSvg,
                ...getFields(t, 2),
            },
            {
                src: oldBuildingSvg,
                ...getFields(t, 3),
            },
            {
                src: wineAndBidSvg,
                ...getFields(t, 4),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [t, locale],
    );

    return (
        <CustomModuleContainer isRow>
            <Left>
                <img className="fagSvg" src={fagSvg} alt="FAG icon" />
                <h3>{t("fag-overview-options.weBet")}</h3>
                <p> {t("fag-overview-options.findAnswer")}</p>
                <Link to="/help">
                    <div>{t("fag-overview-options.checkFAQ")}</div>{" "}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 4.99988L11.2909 4.99988" stroke="#A86D37" strokeWidth="1.5" />
                        <path
                            d="M7.74512 0.745361L11.9997 4.99991L7.74512 9.25445"
                            stroke="#A86D37"
                            strokeWidth="1.5"
                        />
                    </svg>
                </Link>
            </Left>
            <Right>
                {data.map(({ title, paragraph, src, alt, redirect, redirectText }) => (
                    <Accordion key={title} title={title}>
                        <AccordionChild>
                            <div className="contentWrapper">
                                <div className="left">
                                    {paragraph.map((p) => (
                                        <div key={p}>{p}</div>
                                    ))}
                                    {redirect && (
                                        <div className="redirectBtn">
                                            <button type="button" onClick={redirect}>
                                                {redirectText}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="right">
                                    <img src={src} alt={alt} />
                                </div>
                            </div>
                        </AccordionChild>
                    </Accordion>
                ))}
            </Right>
        </CustomModuleContainer>
    );
};

const CustomModuleContainer = styled(BaseModuleContainer)`
    display: flex;
    justify-content: space-between;

    @media (min-width: 0px) {
        height: fit-content;
        padding: 70px 60px 65px 65px;
    }

    @media (max-width: 1023px) {
        flex-direction: column;
        padding: 28px 45px 39px;
    }

    @media (max-width: 767px) {
        flex-direction: column;
        padding: 26px 10px 39px;
    }

    ${Accordion.AccordionWrapper} {
        margin-bottom: 23px;

        &:last-child {
            margin-bottom: 0;
        }

        @media (max-width: 767px) {
            margin-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
`;

const Left = styled.div`
    width: 36.8%;
    padding-right: 55px;
    ${LeftSide};

    @media (max-width: 767px) {
        width: 100%;
        padding: 0 10px;

        h3 {
            margin-top: 0;
        }
    }

    @media (max-width: 1023px) {
        width: 100%;
    }

    a {
        margin-top: 68px;

        @media (max-width: 1024px) {
            margin-top: 28px;
        }
    }
`;

const Right = styled.div`
    width: 63.2%;

    @media (max-width: 1023px) {
        width: 100%;
    }
`;

const AccordionChild = styled.div`
    display: block;
    padding: 0 24px 32px;

    @media (max-width: 767px) {
        padding: 0 17px 31px;
    }

    &:before {
        content: "";
        display: block;
        border-top: 1px solid #d8d8d8;
    }

    .contentWrapper {
        display: flex;
        align-items: center;

        .left {
            width: 67%;
            padding: 30px 14px 0;
            font-family: VinovestMedium;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 31px;
            color: #242e35;

            @media (max-width: 767px) {
                width: 100%;
                padding: 21px 0 0;
            }
        }

        .right {
            width: 33%;
            display: flex;
            align-items: center;
            justify-content: center;

            @media (max-width: 767px) {
                display: none;
                font-size: 14px;
                line-height: 24px;
            }
        }

        .redirectBtn {
            margin-top: 24px;

            button {
                border: 1px solid #242e35;
                box-sizing: border-box;
                border-radius: 3px;
                min-height: 50px;
                min-width: 192px;
                padding: 0 15px;
                justify-content: center;
                align-items: center;
                display: flex;
                outline: 0;
                transition: 0.3s;
                background-color: transparent;
                font-family: VinovestMono;
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 22px;
                color: #242e35;
                text-transform: uppercase;

                &:hover {
                    cursor: pointer;
                    opacity: 0.5;
                }
            }
        }
    }
`;

function getFields(t, index) {
    return {
        title: t(`fag-overview-options.${index}.title`),
        alt: t(`fag-overview-options.${index}.alt`),
        paragraph: t(`fag-overview-options.${index}.paragraph`),
    };
}

export default FAQOptions;
