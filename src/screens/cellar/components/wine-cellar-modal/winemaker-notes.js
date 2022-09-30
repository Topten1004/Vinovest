/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import CriticsIcon from "../CriticsIcon";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

const WinemakerNotes = ({ critics = [] }) => {
    const { t } = useTranslation(["portfolio"]);
    return (
        <Container>
            <Title>{t("wine-maker-notes.title")}</Title>
            {critics.map(({ name, score, description }, i) => (
                <WinemakerNote key={uuid()} className={!i ? "noBorder" : ""}>
                    <div className="svgContainer">
                        <CriticsIcon name={name} score={score} index={i} />
                    </div>
                    <div className="description">
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                </WinemakerNote>
            ))}
        </Container>
    );
};

const Container = styled.div`
    padding: 40px 32px 0;

    @media screen and (max-width: 1023px) {
        padding: 30px 17px 0;
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
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 17px;

    @media screen and (max-width: 1023px) {
        min-height: 64px;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
        padding-bottom: 21px;
        margin-bottom: 10px;
    }
`;

const WinemakerNote = styled.div`
    border-top: 1px solid #eeeeee;
    min-height: 220px;
    display: flex;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;

    &.noBorder {
        border: 0;
    }

    .svgContainer {
        margin-top: 7px;
        width: 148.81px;
        height: 148.81px;
        flex-shrink: 0;
        margin: 27px 27px 27px 15px;
    }

    .description {
        padding: 27px 0 27px 20.18px;
        flex-grow: 1;
    }

    h2 {
        margin: 0;
        padding: 0;
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
    }

    p {
        margin-top: 15px;
    }

    @media screen and (max-width: 1023px) {
        font-size: 11px;
        line-height: 21px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
        min-height: fit-content;

        .description,
        .svgContainer {
            padding: 0;
            margin: 0;
        }
        .svgContainer {
            margin-top: 29px;
            width: 65px;
            height: 65px;
        }

        h2 {
            margin-top: 21px;
            font-size: 20px;
            line-height: 32px;
        }

        p {
            margin-top: 20px;
            margin-bottom: 31px;
        }
    }
`;

export default WinemakerNotes;
