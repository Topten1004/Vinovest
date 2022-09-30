import styled from "styled-components";

export const Wrapper = styled.div`
    a {
        text-decoration: none;
        color: #0066cc;
    }

    p,
    ul,
    ol {
        font-family: Helvetica;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        padding: 0 52px 35px 52px;
        color: #242e35;
        margin: 0;

        @media screen and (max-width: 767px) {
            padding: 0 0 30px;
            font-size: 16px;
            line-height: 30px;
        }
    }

    .isWholeLineAlink li {
        &::marker {
            color: #0066cc;
        }
    }

    ul,
    ol {
        margin-left: 26px;

        li {
            &:not(:first-child) {
                padding: 15px 0 0;
            }
        }
    }
    li ul,
    li ol {
        @media screen and (max-width: 0px) {
            padding-bottom: 0;
        }
    }

    ul > li {
        list-style-type: disc;
    }

    ul ul {
        padding-left: 23px;
        margin: 0;
    }

    li p {
        padding: 0;
    }

    h2 {
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 54px;
        color: #242e35;
        padding: 35px 50px 15px;
        margin: 0;

        @media screen and (max-width: 767px) {
            font-size: 24px;
            line-height: 34px;
            padding: 0 0 30px;
        }
    }

    h3 {
        font-family: Helvetica;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        color: #242e35;
        padding: 15px 50px 5px;
        margin: 0;

        @media screen and (max-width: 767px) {
            font-size: 20px;
            line-height: 30px;
            padding: 0 0 30px;
        }
    }

    h4,
    h5,
    h6 {
        font-family: Helvetica;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;
        color: #242e35;
        padding: 10px 50px 10px;
        margin: 0;

        @media screen and (max-width: 767px) {
            font-size: 18px;
            line-height: 30px;
            padding: 0 0 20px;
        }
    }

    img {
        margin: 0 0 30px;
        display: block;
        max-width: 780px;
        width: 100%;
    }

    strong {
        font-weight: 700;
    }

    ${({ withMobileGup }) =>
        withMobileGup
            ? `
                @media screen and (max-width: 768px) {
                    & > *:not(img) {
                        padding-right: 20px;
                        padding-left: 20px;
                    }
                }
            `
            : ""}
`;

export const FurtherReadingWrapper = styled.div`
    width: 780px;
    border: 2px solid #242e35;
    padding: 40px 50px;
    margin-top: 15px;
    margin-bottom: 15px;

    h3,
    ul,
    ol,
    p {
        padding: 0;
    }

    ul li,
    ol li {
        padding: 0 !important;
    }

    @media screen and (max-width: 991px) {
        padding: 30px 20px;
        width: auto;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 30px;
    }
`;
