import styled from "styled-components";
import _ from "lodash";
import { MainButton } from "#shared/ui";

// TODO: move these into common dir
export const DepositMainButton = styled(MainButton)`
    margin-top: 32px;
    @media screen and (min-width: 768px) {
        margin-top: 40px;
        max-width: initial;
    }
`;

export const DepositSecondaryButton = styled(DepositMainButton)`
    background: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.mainAccentBlue};
    color: ${(p) => p.theme.colors.mainAccentBlue};
    transition: border 0.1s ease-in-out;
    :hover {
        box-shadow: none;
        border: 1px solid ${(p) => p.theme.colors.burntOrange};
    }
`;

export const ButtonPairContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
        width: 48%;
    }
`;

export const DepositPageFrameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
`;

export const AlertMessage = styled.div.attrs((props) => ({
    // or we can define dynamic ones
    marginTop: props.marginTop || "0px",
    padding: props.padding || "0 15px",
    paddingBottom: props.paddingBottom || "0px",
    position: props.position || "absolute",
}))`
    text-align: center;
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;

    color: ${(p) =>
        _.cond([
            [_.matches("warn"), _.constant(p.theme.colors.burntOrange)],
            [_.matches("error"), _.constant(p.theme.colors.red)],
            [_.stubTrue, _.constant(p.theme.colors.mainAccentBlue)],
        ])(p.level)};

    position:${(props) => props.position};
    display: flex;
    justify-content: center;
    padding: ${(props) => props.padding};
    padding-bottom: ${(props) => props.paddingBottom}
    font-size: 13px;
    margin-top: ${(props) => props.marginTop};
    width: 100%;
`;

export const OptionListContainer = styled.div`
    margin-top: 48px;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const PaymentSourceOptionContainer = styled.button`
    display: flex;
    align-items: center;
    border: 1px solid ${(p) => p.theme.colors.borderGray};
    text-align: center;
    cursor: pointer;
    transition: border 0.1s ease-in-out;
    padding: 28px;
    height: 100px;
    font-size: 18px;
    width: 100%;
    background: none;

    :hover {
        border: 1px solid ${(p) => p.theme.colors.burntOrange};
    }

    &:not([disabled]) {
        & + :not([disabled]) {
            border-top-color: transparent;

            &:hover {
                border-top-color: ${(p) => p.theme.colors.burntOrange};
            }
        }
    }

    ${(p) =>
        p.disabled
            ? `
        opacity: 0.3;
        cursor: not-allowed;
        :hover {
        border: 1px solid ${p.theme.colors.borderGray}
        };
    `
            : undefined}

    span {
        margin-left: 24px;
    }
    .icon-wrapper {
        width: 45px;
    }
    .payment-right-arrow-icon {
        margin-left: auto;
    }
`;

export const WireWrapper = styled.div`
    padding: 0 20px;

    ${(p) => p.theme.media.greaterThan("768px")`
        padding: 0;
  `}
`;

export const WireDescription = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;
    max-width: ${({ maxWidth }) => maxWidth || "754px"};
    width: 100%;
    margin: 0 auto;
    text-align: center;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 20px;
        line-height: 36px;
  `}
`;

export const DoneButton = styled(MainButton)`
    max-width: 393px !important;
    min-height: 70px;
    margin: 39px auto 0;

    ${(p) => p.theme.media.greaterThan("768px")`
        margin: 52px auto 0;
    `}
`;

export const WithToolTipContainer = styled.div`
    display: inline-block;
    height: 36px;
    margin-left: 6px;
`;
