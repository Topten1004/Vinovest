import styled from "styled-components";

export const BaseModuleContainer = styled.div`
    background: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.lighterGray};
    border-radius: ${(p) => p.theme.modules.borderRadius};
    box-shadow: ${(p) => p.theme.modules.boxShadow};
    color: ${(p) => p.theme.colors.mainAccentBlue};
    position: relative;
    width: 100%;
    margin: 15px 0;
    height: ${(p) => (p.isRow ? "initial" : "300px")};
    padding: 22px;

    ${(p) => p.theme.media.greaterThan("768px")`
        height: 375px;
        padding: 30px;
    `}
    ${(p) => p.theme.media.greaterThan("1020px")`
        max-width: ${p.isRow ? "initial" : "calc(50% - 25px)"};
        height: 490px;
        padding: 52px 43px 30px 59px;
    `}
    ${(p) => p.theme.media.greaterThan("1441px")`
       margin-bottom: 50px;
    `}

    .title-text {
        font-family: ${(p) => p.theme.fonts.title};
        font-size: 32px;
        font-weight: 500;
        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 48px;
        `}
        ${(p) => p.theme.media.greaterThan("1441px")`
            font-size: 64px;
            line-height: 65px; 
        `}
    }

    .title-text_small {
        font-family: ${(p) => p.theme.fonts.title};
        font-size: 32px;
        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 48px;
        `}
        ${(p) => p.theme.media.greaterThan("1441px")`
            font-size: 45px;
            line-height: 60px; 
        `}
    }

    .subtitle-text {
        font-family: ${(p) => p.theme.fonts.title};
        font-size: 24px;
        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 28px;
        `}
    }
`;

export const TopBannerContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: ${(p) => p.theme.fonts.title};
    font-weight: 500;
    background: rgba(197, 213, 228, 0.4); /** #C5D5E4 @ 40% opacity */
    border-radius: 10px;
    padding: 0 70px;
    margin: 30px 0 15px 0;
    padding: 20px;
    line-height: 24px;
    font-size: 21px;
    flex-direction: column;
    text-align: center;
    #plan-banner-label-container {
        margin-bottom: 21px;
    }

    width: 100%;

    max-width: 476px;
    ${(p) => p.theme.media.greaterThan("768px")`
    max-width: initial;
    padding: 37px 70px;
    line-height: 60px;
    font-size: 45px;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 50px;

    #plan-banner-label-container { margin-bottom: 0 }
`}

    #investing-plan-label {
        color: ${(p) => p.theme.colors.burntOrange};
    }
`;
