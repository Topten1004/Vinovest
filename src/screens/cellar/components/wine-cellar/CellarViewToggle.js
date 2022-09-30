import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CellarViewToggle = ({ selected = "grid", toggle }) => {
    const { t } = useTranslation("portfolio");
    return (
        <CellarViewContainer>
            <Highlight toRight={selected === "list"} />
            <Option selected={selected === "grid"} onClick={toggle}>
                <OptionGridIcon selected={selected === "grid"}>
                    <div />
                    <div />
                    <div />
                    <div />
                </OptionGridIcon>
                {t("wine-cellar.cellar-view-toggle.grid")}
            </Option>
            <Option selected={selected === "list"} onClick={toggle}>
                <OptionListIcon selected={selected === "list"}>
                    <div />
                    <div />
                    <div />
                </OptionListIcon>
                {t("wine-cellar.cellar-view-toggle.list")}
            </Option>
        </CellarViewContainer>
    );
};

const CellarViewContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 172px;
    height: 44px;
    padding: 5px;
    background: ${(p) => p.theme.colors.lighterGray};
    border-radius: 4px;

    @media screen and (min-width: 1024px) {
    }
`;

const Option = styled.div`
    position: relative;
    width: 81px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: ${(p) => (p.selected ? p.theme.colors.mainAccentBlue : p.theme.colors.darkGrayNeutrals)};

    &:hover {
        ${(p) => (p.selected ? "pointer-events: none;" : "cursor: pointer;")};
    }
`;

const Highlight = styled.div`
    position: absolute;
    background: ${(p) => p.theme.colors.white};
    width: 81px;
    height: 34px;
    transition: 0.5s;
    ${(p) => (p.toRight ? "left: 86px" : "left: 5px")};
    border-radius: 4px;
`;

const OptionIcon = styled.div`
    width: 16px;
    height: 16px;
    margin-right: 9px;

    div {
        background: ${(p) => (p.selected ? p.theme.colors.mainAccentBlue : p.theme.colors.darkGrayNeutrals)};
    }
`;

const OptionGridIcon = styled(OptionIcon)`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;

    div {
        flex-shrink: 0;
        width: 7px;
        height: 7px;
    }
`;

const OptionListIcon = styled(OptionIcon)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
        flex-shrink: 0;
        width: 100%;
        height: 3.2px;
    }
`;

export default CellarViewToggle;
