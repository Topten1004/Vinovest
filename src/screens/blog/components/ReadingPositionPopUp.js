import React from "react";
import styled from "styled-components";
import QuickSignUpForm from "./QuickSignupForm";
import ShareArticle from "./ShareArticle";

const ReadingPositionPopUp = ({ showPopUp, forwardRefProp, mobile }) => {
    return (
        <ReadingPositionPopUpWrapper showPopUp={showPopUp ? 1 : 0} mobile={mobile ? 1 : 0}>
            <ReadingPopUp ref={forwardRefProp} mobile={mobile ? 1 : 0}>
                <ShareArticle />
                <QuickSignUpForm embed />
            </ReadingPopUp>
        </ReadingPositionPopUpWrapper>
    );
};

export const ReadingPositionStickyBar = () => {
    return (
        <StickyWrapper>
            <ReadingPositionPopUp showPopUp />
        </StickyWrapper>
    );
};

const hidePopUp = `
    overflow: hidden;
    width: 0;
    height: 0;
    opacity: 0;
`;

const mobilePopUp = `
    @media screen and (min-width: 0px) {
        position: static;
        height: fit-content;
        width: 100%; 
        max-width: 740px;
        margin: 0 auto;
    }    
`;

const mobilePopUpWrapper = `
    ${mobilePopUp};

    @media screen and (min-width: 0px) {
        max-width: 100%;
        padding: 0 20px;
        margin-top: 22px;
    }
`;

const StickyWrapper = styled.div`
    height: fit-content;
    width: 1px;
    position: sticky;
    top: 120px;
    padding-top: 16px;
`;

const ReadingPositionPopUpWrapper = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;

    ${({ showPopUp, mobile }) => !showPopUp && !mobile && hidePopUp}
    ${({ mobile }) => mobile && mobilePopUpWrapper}
`;

const ReadingPopUp = styled.div`
    position: relative;
    left: -304px;
    bottom: 0;
    max-width: 301px;
    width: 20.9vw;
    background-color: #fff;

    @media screen and (max-width: 1463px) {
        width: 20.9vw;
        left: -20.9vw;
    }

    @media screen and (max-width: 1410px) {
        width: 19.9vw;
        left: -19.9vw;
    }

    @media screen and (max-width: 1389px) {
        width: 18.9vw;
        left: -18.9vw;
    }

    @media screen and (max-width: 1303px) {
        width: 16.9vw;
        left: -16.9vw;
    }

    ${({ mobile }) => mobile && mobilePopUp}
`;

export default React.forwardRef((props, ref) => <ReadingPositionPopUp {...props} forwardRefProp={ref} />);
