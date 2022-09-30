import React from "react";
import styled from "styled-components";
import { TFunction, useTranslation } from "react-i18next";
import { useHistory } from "#shared/hooks/useHistory";
import WithToolTipWrapper from "#shared/components/with-tool-tip";
import { Fade } from "#shared/ui";
import { WireTable } from "./components/WireTable";
import { WireWrapper, WireDescription, DoneButton, WithToolTipContainer } from "./styles";
import checkSvg from "./components/assets/check.svg";
import arrowDepositSvg from "./components/assets/arrowDeposit.svg";
import infoSvg from "./components/assets/info.svg";

const dataGenerate = (t: TFunction<string[]>) => [
    { title: t("pay_order"), value: [t("vinovest")] },
    {
        title: t("memo"),
        value: [t("memo_value")],
    },
    {
        title: t("mail_to"),
        value: [t("vinovest_address.name"), t("vinovest_address.street"), t("vinovest_address.city_state")],
    },
    {
        title: (
            <>
                {t("courier")}
                <br />
                {t("delivery_services")}
            </>
        ),
        value: [
            t("vinovest_courier_address.name"),
            t("vinovest_courier_address.index"),
            t("vinovest_courier_address.street"),
            t("vinovest_courier_address.city_state"),
        ],
    },
    {
        title: (
            <WithToolTipContainer>
                {t("amount")}{" "}
                <WithToolTipWrapper text={t("portfolio_tooltip")}>
                    <img src={infoSvg} alt={t("info")} />
                </WithToolTipWrapper>
            </WithToolTipContainer>
        ),
        value: [t("minimum_check_limit_reminder")],
    },
];

export const MailACheck = () => {
    const { t } = useTranslation(["deposit"]);
    const history = useHistory();
    const handleDone = () => {
        history.push("/");
    };

    return (
        <WireWrapper>
            <WireDescription>{t("check_instructions")}</WireDescription>
            <Fade in>
                <MailCheckExample>
                    <img className="mailCheckExampleImg" src={checkSvg} alt={t("mail_check_example")} />
                    <ArrowTip>
                        <svg
                            className="arrowTimImgHorizontal"
                            width="117"
                            height="8"
                            viewBox="0 0 117 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.646446 3.64646C0.451187 3.84172 0.451187 4.1583 0.646446 4.35356L3.82843 7.53554C4.02369 7.73081 4.34027 7.73081 4.53554 7.53554C4.7308 7.34028 4.7308 7.0237 4.53554 6.82844L1.70711 4.00001L4.53554 1.17158C4.7308 0.976321 4.7308 0.659738 4.53554 0.464476C4.34027 0.269214 4.02369 0.269214 3.82843 0.464476L0.646446 3.64646ZM117 3.5L1 3.50001L1 4.50001L117 4.5L117 3.5Z"
                                fill="#5B646B"
                            />
                        </svg>
                        <div>
                            {t("average_deposit.first")}
                            <br />
                            <span className="recommended">{t("average_deposit.second")}</span>{" "}
                            {t("average_deposit.third")}
                            <br />
                            {t("average_deposit.fourth")}
                        </div>
                    </ArrowTip>
                    <ArrowTimImgVertical>
                        <img src={arrowDepositSvg} alt={t("arrow")} />
                        <div>
                            {t("average_deposit.first")}
                            <br />
                            <span className="recommended">{t("average_deposit.second")}</span>{" "}
                            {t("average_deposit.third")} {t("average_deposit.fourth")}
                        </div>
                    </ArrowTimImgVertical>
                </MailCheckExample>
            </Fade>
            <WireTable data={dataGenerate(t)} />
            <WireBottomDescription maxWidth="456px">
                {t("wire_description")} <a href="mailto:support@vinovest.co">{t("wire_mail_link")}</a>{" "}
                {t("wire_description_contd")}
            </WireBottomDescription>
            <DoneButton onClick={handleDone}>{t("done")}</DoneButton>
        </WireWrapper>
    );
};

export const MailCheckExample = styled.div`
    max-width: 883px;
    margin: 58px auto 80px;
    position: relative;

    .mailCheckExampleImg {
        width: 100%;
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        max-width: 666px;
        grid-template-columns: 1fr 1fr;    
    `}

    ${(p) => p.theme.media.greaterThan("1140px")`
        margin: 37px auto;
    `}
`;

const ArrowTimImgVertical = styled.div`
    position: absolute;
    right: 26%;
    top: 42%;
    display: flex;
    align-items: center;
    width: 2.5%;

    img {
        width: 100%;
    }

    div {
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.005em;
        color: #5b646b;
        font-size: 11px;
        line-height: 21px;
        white-space: nowrap;
        position: absolute;
        bottom: -30px;
        left: -30px;
        transform: translateX(-50%);

        .recommended {
            color: #242E35;
        }
    }

    ${(p) => p.theme.media.greaterThan("1140px")`
        display: none;
    `}
`;

const ArrowTip = styled.div`
    display: none;
    position: absolute;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.005em;
    color: #5b646b;

    .arrowTimImgHorizontal {
        margin-right: 16px;
    }

    .recommended {
        color: #242E35;
    }

    ${(p) => p.theme.media.greaterThan("1140px")`
        display: flex;
        align-items: center;
        transform: translate(100%, -50%);
        font-size: 14px;
        line-height: 21px;
        top: 35.38%;
        right: 14%;

        .arrowTimImgHorizontal {
            display: inline;
        }
    `}
`;

const WireBottomDescription = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;
    font-size: 16px;
    line-height: 26px;
    max-width: 456px;
    margin: 37px auto 0;
    text-align: center;

    a {
        margin-top: 21px;
        color: #a86d37;
        text-decoration: none;
    }
`;
