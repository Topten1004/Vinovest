import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCreateRoutingCallback } from "#shared/hooks";
import Accordion from "#shared/components/Accordion";

const FAQ = () => {
    const {
        t,
        i18n: { locale },
    } = useTranslation(["trading"]);

    const data = React.useMemo(
        () => [
            {
                src: "",
                ...getFields(t, 0),
            },
            {
                src: "",
                ...getFields(t, 1),
            },
            {
                src: "",
                ...getFields(t, 2),
            },
            {
                src: "",
                ...getFields(t, 3),
            },
            {
                src: "",
                ...getFields(t, 4),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [t, locale],
    );

    return (
        <ModuleContainer>
          <Title>{t("faq")}</Title>
            <Wrapper>
                {data.map(({ title, paragraph }) => (
                    <Accordion key={title} title={title} trading={1}>
                        <AccordionChild>
                            <div className="contentWrapper">
                                <div className="paragraph">
                                    {paragraph.map((p) => (
                                        <div key={p}>{p}</div>
                                    ))}
                                </div>
                            </div>
                        </AccordionChild>
                    </Accordion>
                ))}
            </Wrapper>
            <FAQLink to="/help">{t("view-all")}</FAQLink>
        </ModuleContainer>
    );
};

const ModuleContainer = styled.div`
    max-width: 1056px;
    margin: 0 auto;

    ${Accordion.AccordionWrapper} {
        border: 0;
        border-radius: 0;
        margin-bottom: 0;
        border-top: 1px solid #caccce;

        &:last-child {
            border-bottom: 1px solid #caccce;
        }
    }
`;


const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 60px;
    @media screen and (max-width: 767px) {
        padding-left: 16px;
        padding-right: 16px;
        margin-bottom: 40px;
    }
`;

const Title = styled.h2`
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 45px;
    line-height: 60px;
    color: #242e35;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 84px;
    @media screen and (max-width: 767px) {
        font-size: 32px;
        margin-bottom: 32px;
        max-width: 250px;
        line-height: 41px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const AccordionChild = styled.div`
    display: block;
    padding: 0 24px 32px;

    @media (max-width: 767px) {
        padding: 0 17px 31px;
    }

    &:before {
        content: "";
        display: block;
        border-top: 1px solid #d8d8d8;
    }

    .contentWrapper {
        display: flex;
        align-items: center;

        .paragraph {
            width: 100%;
            padding: 30px 14px 0;
            font-family: VinovestMedium;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 31px;
            color: #242e35;

            @media (max-width: 767px) {
                width: 100%;
                padding: 21px 0 0;
            }
        }
    }
`;

const FAQLink = styled(Link)`
    font-family: VinovestMono;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: none;
    color: #a86d37;
    display: block;
    width: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 80px;
    @media screen and (max-width: 767px) {
        margin-bottom: 0;
    }
`;

function getFields(t, index) {
    return {
        title: t(`fag-overview-options.${index}.title`),
        paragraph: t(`fag-overview-options.${index}.paragraph`),
    };
}

export default FAQ;
