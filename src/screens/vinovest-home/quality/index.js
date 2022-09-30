import React from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "#shared/hooks/useHistory";
import { Quality, CustomModuleContainer, PropContainer, Container, TopTitle } from "#shared/ui/QualityValueList";

import WithLayersButton from "#shared/ui/WithLayersButton";
import curatedPortfolio from "../assets/curatedPortfolio.svg";
import diversity from "../assets/diversity.svg";
import returns from "../assets/returns.svg";

import investmentWineSvg from "../assets/investmentWine.svg";
import insuredSafeSvg from "../assets/insuredSafe.svg";
import priceTagSvg from "../assets/priceTag.svg";

const valueProps = [
    {
        header: i18n.t("vinovest-home:quality.curated.header"),
        description: i18n.t("vinovest-home:quality.curated.description"),
        svg: curatedPortfolio,
        imgClassName: "img1",
    },
    {
        header: i18n.t("vinovest-home:quality.diversity.header"),
        description: i18n.t("vinovest-home:quality.diversity.description"),
        svg: diversity,
        imgClassName: "img2",
    },
    {
        header: i18n.t("vinovest-home:quality.returns.header"),
        description: i18n.t("vinovest-home:quality.returns.description"),
        svg: returns,
        imgClassName: "img3",
    },
    {
        header: i18n.t("vinovest-home:quality.insider.header"),
        description: i18n.t("vinovest-home:quality.insider.description"),
        svg: priceTagSvg,
        imgClassName: "img4",
    },
    {
        header: i18n.t("vinovest-home:quality.insights.header"),
        description: i18n.t("vinovest-home:quality.insights.description"),
        svg: investmentWineSvg,
        imgClassName: "img5",
    },
    {
        header: i18n.t("vinovest-home:quality.hassle-free.header"),
        description: i18n.t("vinovest-home:quality.hassle-free.description"),
        svg: insuredSafeSvg,
        imgClassName: "img6",
    }
];

const QualityWrapper = () => {
    const history = useHistory();
    const { t } = useTranslation("vinovest-home");

    return (
        <QualityContainer>
            <Quality
                valueProps={valueProps}
                title={t("quality.title")}
                description={t("quality.topSmallTitle")}
                double
            />
            <WithLayersButton
                onClick={() => history.push("/why-wine")}
                width="176px"
                colors={["#fff", "rgb(36, 46, 53)", "rgb(36, 46, 53)"]}
            >
                {t("quality.learnMore")}
            </WithLayersButton>
        </QualityContainer>
    );
};

const QualityContainer = styled("div")`
    ${CustomModuleContainer} {
        ${(p) => p.theme.media.greaterThan("767px")`
            display: grid;
            max-width: 895px;
            margin: 64px auto;
            grid-auto-columns: 1fr;
            grid-column-gap: 125px;
            grid-row-gap: 21px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
        `}
    }

    ${Container} {
        padding-top: 100px;
        padding-bottom: 40px;
        @media screen and (max-width: 767px) {
            padding-bottom: 80px;
        }
    }

    ${PropContainer} {
        max-width: 385px;
        min-height: 329px;

        .prop-img {
            height: 122px;
        }

        .img1 {
            max-width: 162px;
        }
        .img2 {
            max-width: 96px;
        }
        .img3 {
            max-width: 150px;
        }
        .img4 {
            max-width: 170px;
        }
        .img5 {
            max-width: 61px;
        }
        .img6 {
            max-width: 136px;
        }

        .prop-desc {
            font-size: 16px;
            line-height: 175%;
            font-family: Favoritstd, sans-serif;
            color: #242e35;
        }

        @media screen and (max-width: 991px) {
            min-height: 229px;
            padding-bottom: 0px;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 991px) {
        ${TopTitle} {
            font-size: 64px;
            line-height: 137%;
            font-weight: 700;
        }
    }

    ${WithLayersButton.styled.WithLayers} {
        margin: 0 auto;
        display: block;
    }
`;

export default QualityWrapper;
