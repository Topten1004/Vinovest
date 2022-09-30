import styled from "styled-components";

export const FooterContainer = styled.footer`
    font-family: VinovestMedium;
    width: 100%;
    margin-top: ${({ withbanner }) => (withbanner ? "0" : "48px")};
    padding: ${({ withbanner }) => (withbanner ? "98px 128px" : "50px 128px")};
    color: #fae8d1;
    background-color: #242e35;
    ${({ embed }) => embed || ""}

    @media screen and (max-width: 1300px) {
        padding: ${({ withbanner, advisors }) => (withbanner || advisors ? "60px 45px 52px" : "20px 45px 52px")};
    }

    @media screen and (max-width: 1024px) {
        padding-bottom: ${({ withbanner }) => (withbanner ? "52px" : "110px")};
    }

    @media screen and (max-width: 767px) {
        padding: ${({ withbanner }) => (withbanner ? "70px 24px 45px" : "38px 24px 110px")};
    }

    a {
        transition: 0.3s;
        &:hover {
            opacity: 0.5;
        }
    }
`;

export const GridContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    background-color: #fae8d1;
    display: grid;
    grid-template-columns: minmax(275px, 1fr) minmax(275px, 1fr) 1fr 1fr;
    grid-template-rows: max-content max-content max-content max-content;
    gap: 1px 1px;
    grid-template-areas:
        "a a c c"
        "a a d d"
        "b b d d"
        "b b d d";

    .a {
        grid-area: a;
        background-color: #242e35;
        border-top: ${({ advisors }) => (advisors ? "1px solid #fae8d1" : "none")};
    }
    .b {
        grid-area: b;
        background-color: #242e35;
    }
    .c {
        grid-area: c;
        background-color: #242e35;
        border-top: ${({ advisors }) => (advisors ? "1px solid #fae8d1" : "none")};
    }
    .d {
        grid-area: d;
        background-color: #242e35;
    }

    @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media screen and (max-width: 1024px) {
        .a, 
        .c {
            border-top: none;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "a a"
            "b c"
            "b d";
        gap: 0 0;
        background-color: transparent;

        .a {
            padding: 0 9px;
            padding: ${({ withbanner }) => (withbanner ? "border-top: 1px solid #fae8d1;" : "")};
            border-bottom: 1px solid #fae8d1;
        }

        .b {
            border-right: 1px solid #fae8d1;
        }
        .c {
            border-bottom: 1px solid #fae8d1;
        }
    }

    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "a"
            "b"
            "c"
            "d";
        background-color: transparent;
        gap: 0px 0px;
    }
`;

export const FooterTitle = styled.h3`
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    margin: 0;

    @media screen and (max-width: 1300px) {
        font-size: 28px;
        line-height: 44px;
    }

    @media screen and (max-width: 767px) {
        font-size: 24px;
        line-height: 34px;
    }
`;
