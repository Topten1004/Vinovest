import React from "react";
import styled from "styled-components";
import { TopTitle, PDescription, SmallSubtitle } from "#shared/ui/Typography/styled";
import downloadIconSvg from "./assets/downloadIcon.svg";
import readingMan from "./assets/readingMan.svg";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const BlankLink = ({ children, href }) => (
    <a target="_blank" rel="noopener noreferrer" href={href}>
        <img src={downloadIconSvg} alt="download icon" className="downloadSvg" />
        {children}
    </a>
);

const PressMaterials = () => (
    <LinksSection>
        <div className="sectionDivider">
            <MetaTagsReplacer
                title="Press | Vinovest"
                description="Get in touch with Vinovest to explore press opportunities. Also access press materials and media coverage."
            />

            <div className="contactCont">
                <TopTitle as="h1">Press</TopTitle>
                <PDescription>
                    For press opportunities please email <a href="mailto:press@vinovest.co">press@vinovest.co</a>
                </PDescription>
            </div>
            <div className="press__materials">
                <SmallSubtitle>Press materials</SmallSubtitle>
                <div className="imageWrapper">
                    <img src={readingMan} alt="read icon" />
                </div>
                <div className="gridContainer">
                    <BlankLink href="https://drive.google.com/file/d/1DnAMu9YdbnZeRl8I4ce9HDKqEfQtNkD_/view">
                        Press Images
                    </BlankLink>
                    <BlankLink href="https://drive.google.com/file/d/1nayIfQRZ4tpE0cOVRQBbYkw7sAsKSC6Q/view">
                        Logos
                    </BlankLink>
                    <BlankLink href="https://drive.google.com/drive/folders/1Gv-qSEiQ2QpB21n0uHX-sRDLZqfo1b-w?usp=sharing">
                        Brand Playbook
                    </BlankLink>
                    <BlankLink href="https://docs.google.com/document/d/1TJnu_BbRogpmQVlZXJazQZiKtBszlGbj0bJJKvVVN-A/edit#heading=h.fgvl02i1i48d">
                        Fact sheet
                    </BlankLink>
                </div>
            </div>
        </div>
    </LinksSection>
);

const LinksSection = styled.section`
    width: 1440px;
    max-width: 100%;
    padding: 110px 8.888% 0;
    margin: 0 auto;
    overflow: hidden;

    .sectionDivider {
        width: 100%;
        display: grid;
        grid-column-gap: 100px;
        border-bottom: 1px solid #d8d8d8;
        padding-bottom: 80px;
        grid-auto-columns: 1fr;
        grid-template-columns: 1fr minmax(200px, 654px);
        grid-template-rows: auto;
        grid-row-gap: 16px;
    }
    a {
        color: #242e35;
    }

    ${TopTitle} {
        line-height: 84px;
        margin-bottom: 20px;
    }
    ${PDescription} {
        text-align: start;
        line-height: 36px;
        font-weight: 500;
    }
    ${SmallSubtitle} {
        text-align: start;
        margin-bottom: 38px;
    }
    .press__materials {
        position: relative;
        padding: 33px 29px 29px;
        border: 2px solid #c5d5e4;
        .imageWrapper {
            position: absolute;
            top: -54px;
            right: -54px;
        }
    }
    .gridContainer {
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 21px;
        grid-row-gap: 16px;
        grid-template-rows: auto;
        a {
            text-decoration: none;
            border: 1px solid #eee;
            background-color: transparent;
            transition: border-color 350ms;
            font-family: Favoritmonostd, sans-serif;
            font-size: 11px;
            padding: 9px 15px;
            font-weight: 500;
            text-transform: uppercase;
            font-size: 11px;
            min-height: 53px;
            display: flex;
            justify-content: center;
            align-items: center;

            .downloadSvg {
                margin-right: 10px;
                width: 14px;
                object-fit: contain;
                transform: translateY(-4px);
            }
        }
    }
    @media screen and (max-width: 991px) {
        .sectionDivider {
            grid-row-gap: 80px;
            grid-template-columns: 1fr;
        }
    }
    @media screen and (max-width: 768px) {
        padding: 40px 8.888% 0;
    }
    @media screen and (max-width: 767px) {
        .gridContainer {
            margin-top: 20px;
            grid-row-gap: 21px;
            grid-template-columns: 1fr;
        }
        ${SmallSubtitle} {
            margin-bottom: 20px;
        }
        .press__materials {
            .imageWrapper {
                right: -44px;
            }
        }
    }

    @media screen and (max-width: 450px) {
        ${SmallSubtitle} {
            margin-top: 40px;
        }
    }
`;
export default PressMaterials;
