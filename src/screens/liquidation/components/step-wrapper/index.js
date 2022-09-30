import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { PageHeader } from "#shared/components/PageHeader";
import { BackButton } from "#shared/ui";
import { Description } from "../styled";

const StepWrapper = ({ children, title, goBack, description, subPage }) => (
    <Wrapper>
        <Title>{title}</Title>
        <Description subPage={subPage}>{description}</Description>
        <ChildWrapper>{children}</ChildWrapper>
        {goBack && <BackButton goBack={goBack} />}
    </Wrapper>
);

const ChildWrapper = styled.div`
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 91px 186px 78px;
    min-height: fit-content;
    position: relative;

    @media screen and (max-width: 1024px) {
        padding: 59px 20px 105px;
    }
`;

const Title = styled(PageHeader)`
    margin: 0;
    max-width: 712px;
    text-align: center;

    @media screen and (max-width: 767px) {
        max-width: 286px;
    }
`;

const Back = styled.button`
    position: fixed;
    width: 60px;
    height: 60px;
    left: 7.749vw;
    top: 40%;
    border: 2px solid #eeeeee;
    box-sizing: border-box;
    background: transparent;
    outline: 0;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        left: 2.749vw;
    }

    @media screen and (max-width: 1023px) {
        position: fixed;
        z-index: 999;
        top: 2px;
        left: 10px;
        background: white;
        border: 0;
    }
`;

export default StepWrapper;
