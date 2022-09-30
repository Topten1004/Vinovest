import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopTitle, SmallSubtitle } from "#shared/ui/Typography/styled";
import { list } from "./images/vinoOffers/list";

const VinoOffers = () => {
    const { t } = useTranslation("advisors");

    return (
        <Section>
            <TopTitle>{t("vino-offers.title")}</TopTitle>
            <ul>
                {list.map((item) => (
                    <li key={item.img}>
                        <div className="imgWrapper">
                            <img src={item.img} width="146" height="136" alt="offer icon" />
                        </div>
                        <div className="contentWrapper">
                            <img className="done" src={item.done} height="22" width="22" alt="checkmark" />
                            <SmallSubtitle>{item.title}</SmallSubtitle>
                        </div>
                    </li>
                ))}
            </ul>
        </Section>
    );
};
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 104px 0 130px;
    color: #242e35;
    padding-left: 6.666%;
    padding-right: 6.666%;
    @media screen and (max-width: 576px) {
        padding-top: 85px;
    }
    ul {
        padding: 0;
        display: grid;
        grid-column-gap: 76px;
        grid-row-gap: 16px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        max-width: 900px;
    }
    @media (max-width: 767px) {
        ul {
            grid-template-columns: 1fr;
            grid-row-gap: 70px;
        }
    }
    li {
        display: flex;
        flex-direction: column;
        list-style: none;
        align-items: center;
        max-width: 250px;
        justify-content: space-between;
    }
    .contentWrapper {
        display: flex;
        align-items: center;
    }
    .done {
        object-fit: contain;
        margin-right: 8px;
    }
    .imgWrapper {
        margin-bottom: 24px;
        margin-right: 7px;
    }
    ${TopTitle} {
        max-width: 750px;
        text-align: center;
        margin-bottom: 80px;
        @media screen and (max-width: 576px) {
            font-size: 36px;
            margin-bottom: 36px;
        }
    }
    ${SmallSubtitle} {
        /* white-space: nowrap; */
    }
`;

export default VinoOffers;
