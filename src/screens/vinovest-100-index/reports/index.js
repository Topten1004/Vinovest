import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useMobile } from "#shared/hooks";
import { MainButton } from "#shared/ui";
import { Title } from "../styled";
import { data } from "./data";

const openFile = (data, isDesktop = true) => {
    const htmlA = document.createElement("a");
    document.body.appendChild(htmlA);
    htmlA.style = "display: none";
    htmlA.href = data;
    if (isDesktop) {
        htmlA.target = "_blank";
    }
    htmlA.click();
    document.body.removeChild(htmlA);
};

const Report = ({ src, name, title, handleClick }) => {
    const { t } = useTranslation("vinovest-hundred-index");

    return (
        <ReportWrapper>
            <img src={src} alt={name} />
            <Button name={name} onClick={handleClick}>
                {t(`reports.${title}`)}
            </Button>
        </ReportWrapper>
    );
};

const Reports = () => {
    const isDesktop = !useMobile(1024);
    const { t } = useTranslation("vinovest-hundred-index");

    const handleClick = ({ target }) => {
        const { pdf } = data.find(({ name }) => name === target.name);
        openFile(pdf, isDesktop);
    };

    return (
        <Wrapper>
            <Title>{t("reports.title")}</Title>
            <ReportsWrapper>
                {data.map((props) => (
                    <Report key={props.name} {...props} handleClick={handleClick} />
                ))}
            </ReportsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 1020px;
    margin: 0 auto;

    ${Title} {
        margin-bottom: 60px;
    }

    @media screen and (max-width: 991px) {
        padding-right: 5px;
        padding-left: 5px;
    }
`;

const ReportsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ReportWrapper = styled.div`
    margin-bottom: 15px;
    width: 50%;
    padding-left: 10px;
    padding-right: 10px;

    img {
        display: block;
        width: 100%;
        flex-shrink: 0;
        height: 80%;
    }

    @media screen and (max-width: 767px) {
        width: 100%;
        padding-left: 20px;
        margin-bottom: 40px;
        padding-right: 20px;
    }

    @media screen and (max-width: 479px) {
        padding-left: 5px;
        padding-right: 5px;
    }
`;

const Button = styled(MainButton)`
    width: 100%;
    max-width: 100% !important;
    margin-top: 20px !important;
`;

export default Reports;
