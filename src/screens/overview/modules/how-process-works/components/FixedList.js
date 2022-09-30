import React from "react";
import styled from "styled-components";

const FixedList = ({ list, text, className }) => (
    <FixedListWrapper className={className}>
        {text && <p>{text}</p>}
        {list && (
            <ul>
                {list.map((t) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
        )}
    </FixedListWrapper>
);

export const FixedListWrapper = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    p,
    ul {
        margin: 0;
        padding: 0;
    }

    ul {
        margin-top: 7px;
        padding-left: 15px;
    }
`;

export default FixedList;
