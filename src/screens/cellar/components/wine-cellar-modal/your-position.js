import React from "react";
import styled from "styled-components";
import { currencyFormatter } from "#utils/shared";
import WinesBottlesTotals from "../wines-bottles-totals";
import { useTranslation } from "react-i18next";

const RenderPercents = ({ profit, percents }) => (
    <Percentage negative={profit < 0}>
        {+profit < 0 ? `-${currencyFormatter((+profit / 100) * -1)}` : `+${currencyFormatter(+profit / 100)}`} (
        {percents >= 0 ? percents : percents * -1}%)
    </Percentage>
);

const YourPosition = ({ wineData }) => {
    const { t } = useTranslation(["portfolio"]);
    const { total, lwin18, sizeByML, holdDuration } = wineData;
    const winesInCase = lwin18 && +lwin18.slice(11, 13);
    const wineQuantity = winesInCase ? (total.bottleCount / winesInCase).toFixed(0) : total.bottleCount;
    const profit = total.positionTotal.amount - wineQuantity * total.averageCostBasis.amount;
    return (
        <Container>
            <Title>{t("wine-cellar-model.position")}</Title>
            <Grid>
                <Position>
                    <PositionTitle>{t("wine-cellar-model.quantity")}</PositionTitle>
                    <PositionAmount>{wineQuantity}</PositionAmount>
                    <PositionDescription>
                        <WinesBottlesTotals lwin18={lwin18} total={total} sizeByML={sizeByML} hideCount />
                    </PositionDescription>
                </Position>
                <Position>
                    <PositionTitle>{t("wine-cellar-model.cost")}</PositionTitle>
                    <PositionAmount>{currencyFormatter(total.averageCostBasis.amount / 100)}</PositionAmount>
                    <PositionDescription>
                        {winesInCase > 1 ? t("wine-cellar-model.case") : t("wine-cellar-model.bottle")}
                    </PositionDescription>
                </Position>
                <Position>
                    <PositionTitle>{t("wine-cellar-model.position-total")}</PositionTitle>
                    <PositionAmount>{currencyFormatter(total.positionTotal.amount / 100)}</PositionAmount>
                    <RenderPercents profit={profit} percents={total.positionTotalPercentage} />
                </Position>
                <Position>
                    <PositionTitle>{t("wine-cellar-model.average-hold")}</PositionTitle>
                    <PositionAmount>{holdDuration}</PositionAmount>
                </Position>
                <Position>
                    <PositionTitle>{t("wine-cellar-model.percentage-portfolio")}</PositionTitle>
                    <PositionAmount>{total.portfolioPercentage}%</PositionAmount>
                </Position>
                <Position>
                    <PositionTitle>{t("wine-cellar-model.storage")}</PositionTitle>
                    <PositionAmount>{wineData.storageLocation}</PositionAmount>
                </Position>
            </Grid>
            <ContactUs>
                {t("wine-cellar-model.contact")}{" "}
                <a href="mailto:ir@vinovest.co">{t("wine-cellar-model.contact-link")}</a>{" "}
                {t("wine-cellar-model.contact-contd")}
            </ContactUs>
        </Container>
    );
};

const Container = styled.div`
    padding: 40px 32px 43px;

    @media screen and (max-width: 1023px) {
        padding: 30px 17px 31px;
    }
`;

const Title = styled.div`
    min-height: 74px;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    color: #242e35;

    @media screen and (max-width: 1023px) {
        min-height: 43px;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
    }
`;

const Grid = styled.div`
    margin-top: 5px;
    border-top: 1px solid #eeeeee;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: ". . .";

    @media screen and (max-width: 1023px) {
        margin-top: 21px;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: ". .";
    }
`;
const Position = styled.div`
    min-height: 188px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    color: #242e35;

    @media screen and (min-width: 1024px) {
        :nth-of-type(3n) {
            border-right: 0;
        }
    }

    @media screen and (max-width: 1023px) {
        min-height: 140px;

        :nth-of-type(2n) {
            border-right: 0;
        }
    }
`;

const PositionTitle = styled.div`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;

    @media screen and (max-width: 1023px) {
        font-size: 11px;
        line-height: 16px;
    }
`;
const PositionAmount = styled.div`
    margin-top: 11px;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;

    @media screen and (max-width: 1023px) {
        font-size: 24px;
        line-height: 32px;
    }
`;
const PositionDescription = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #5b646b;

    @media screen and (max-width: 1023px) {
        font-size: 11px;
        line-height: 21px;
    }
`;

const Percentage = styled.div`
    margin-top: 5px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: right;
    letter-spacing: 0.005em;
    color: ${(p) => (p.negative ? p.theme.colors.darkRed : p.theme.colors.lighterGreen)};

    @media screen and (max-width: 1023px) {
        font-size: 11px;
        line-height: 21px;
    }
`;

const ContactUs = styled.div`
    max-width: 457px;
    width: 100%;
    margin: 29px auto 0;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.005em;
    color: #242e35;

    a {
        border: 0;
        outline: 0;
        background: transparent;
        color: ${(p) => p.theme.colors.burntOrange};
        text-decoration: none;

        &:hover {
            cursor: pointer;
        }
    }

    @media screen and (max-width: 1023px) {
        width: 100%;
        max-width: 276px;
        width: 100%;
        font-size: 11px;
        line-height: 21px;
        margin: 26px auto 0;
    }
`;

export default YourPosition;
