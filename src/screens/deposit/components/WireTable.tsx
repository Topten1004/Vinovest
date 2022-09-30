import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { v3 as uuid } from "uuid";
import Skeleton from "react-loading-skeleton";
import { WithToolTipContainer } from "../styles";
import WithToolTipWrapper from "#shared/components/with-tool-tip";
import infoSvg from "./assets/info.svg";


interface WireTableProps {
    data: Array<{ title: string | JSX.Element; value: any }>;
    referenceKey?: number | null;
    tip?: string;
}

export const WireTable = ({ data, referenceKey, tip }: WireTableProps) => {
    const { t } = useTranslation(["deposit"]);
    return (
        <ContentContainer>
            {data ? (
                data.map(({ title, value }) => (
                    <React.Fragment key={uuid(JSON.stringify(value), uuid.URL)}>
                        <Title>{title}</Title>
                        <Text>
                            {value.map((val) => (
                                <React.Fragment key={uuid(JSON.stringify(val), uuid.URL)}>
                                    {val}
                                    <br />
                                </React.Fragment>
                            ))}
                        </Text>
                    </React.Fragment>
                ))
            ) : (
                <>
                    <Skeleton style={{ height: "50px", width: "100%", marginBottom: "2rem" }} count={5} />
                    <Skeleton
                        style={{ height: "50px", width: "100%", marginBottom: "2rem", marginLeft: "1rem" }}
                        count={5}
                    />
                </>
            )}
            {referenceKey && (
                <>
                    <Title>
                        {t("wire_transfer.field")}{" "}
                        <WithToolTipContainer>
                            <WithToolTipWrapper text={tip}>
                                <img src={infoSvg} alt="info" />
                            </WithToolTipWrapper>
                        </WithToolTipContainer>
                    </Title>
                    <Text>
                        {referenceKey}
                        <br />
                    </Text>
                </>
            )}
        </ContentContainer>
    );
};

export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 42fr 58fr;
    gap: 0px 0px;
    grid-template-areas: ". .";
    margin: 0 auto;

    ${(p) => p.theme.media.greaterThan("768px")`
        max-width: 666px;
        grid-template-columns: 1fr 1fr;
    `}
`;

export const TextGeneral = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.005em;
    color: #5b646b;
    border-bottom: 1px solid #caccce;
    padding: 19px 0;
    height: 100%;
    display: flex;
    align-items: center;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 16px;
        line-height: 26px;
    `}
`;

export const Title = styled(TextGeneral)`
    padding-right: 16px;
`;

export const Text = styled(TextGeneral)`
    color: #242e35;
    font-size: 16px;
    line-height: 26px;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 20px;
        line-height: 36px;
    `}
`;

const Reference = styled.div`
    background: #fae8d1;
    padding: 0 14px 0 7px;
`;
