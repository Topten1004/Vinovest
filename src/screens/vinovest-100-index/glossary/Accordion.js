import React from "react";
import styled from "styled-components";
import { range } from "lodash";
import { useMobile } from "#shared/hooks";
import dropdownArrowSvg from "../assets/dropdownArrow.svg";

const fillEmptyGup = (length, rowLength) => {
    if (+length % +rowLength === 0) return 0;
    const integer = Math.floor(+length / +rowLength);

    return integer * rowLength + rowLength - length;
};

const Accordion = ({ data = [], title, borderBottom }) => {
    const [isOpen, setIsOPen] = React.useState(false);
    const [height, setHeight] = React.useState(0);

    const isSmall = useMobile(991);
    const isSmallest = useMobile(570);

    let rowLength = 3;

    if (isSmall) rowLength = 2;
    if (isSmallest) rowLength = 1;

    const toggle = () => {
        setHeight(isOpen ? 0 : ref.current.scrollHeight);
        setIsOPen((bool) => !bool);
    };

    const ref = React.useRef(null);

    const content = React.useMemo(() => [...data, ...range(fillEmptyGup(data.length, rowLength))], [data, rowLength]);

    return (
        <AccordionWrapper onClick={toggle} className={borderBottom ? "borderBottom" : ""}>
            <AccordionHead className={isOpen ? "isOpen" : ""}>
                <AccTitle>{title}</AccTitle>
                <AccRightSide className={isOpen ? "isOpen" : ""}>
                    <div className="countRightSide">({data.length})</div>
                    <img src={dropdownArrowSvg} alt="^" />
                </AccRightSide>
            </AccordionHead>

            <HideOverflow height={height}>
                <AccordionContentWrapper className={isOpen ? "isOpen" : ""} ref={ref}>
                    {content.map(({ src, title }, i) => (
                        <AccordionItem key={i}>
                            {src && <img className="accordionItemImg" src={src} alt={title} />}
                            <div className="accordionItemTitle">{title}</div>
                        </AccordionItem>
                    ))}
                </AccordionContentWrapper>{" "}
            </HideOverflow>
        </AccordionWrapper>
    );
};

const AccordionWrapper = styled.div`
    &.borderBottom {
        border-bottom: solid 0.3px #caccce;
    }
`;

const AccordionHead = styled.div`
    display: flex;
    padding: 20px 40px 0;
    justify-content: space-between;
    align-items: baseline;
    border-style: solid none none;
    border-width: 0.3px;
    border-color: #caccce;
    transition: 0.5s;
    margin-bottom: 20px;

    &.isOpen {
        background-color: rgb(238, 238, 238);
    }

    &:hover {
        cursor: pointer;
    }
`;

const AccTitle = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 32px;
    line-height: 150%;
    font-weight: 500;

    @media screen and (min-width: 1440px) {
        font-size: 36px;
    }

    @media screen and (max-width: 991px) {
        font-size: 24px;
    }
`;

const AccRightSide = styled.div`
    display: flex;
    align-items: baseline;

    img {
        transition: 0.5s;
    }

    &.isOpen {
        img {
            transform: rotate(180deg);
        }
    }

    .countRightSide {
        padding-right: 20px;
        font-family: Favoritstd, sans-serif;
        color: #242e35;
        font-size: 20px;
        line-height: 160%;
        font-weight: 500;
    }
`;

const HideOverflow = styled.div`
    overflow: hidden;
    height: ${({ height }) => height}px;
    transition: 0.5s;
`;

const AccordionContentWrapper = styled.div`
    position: relative;
    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: minmax(auto, 1fr);
    transition: 0.5s;
    opacity: 0;
    margin-top: -100%;
    height: 0;
    border: solid 1px #caccce;

    &.isOpen {
        margin-top: 0;
        opacity: 1;
        height: fit-content;
    }

    &:before {
        content: " ";
        display: block;
        background-color: #caccce;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    @media screen and (max-width: 991px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 570px) {
        grid-template-columns: 1fr;
    }
`;

const AccordionItem = styled.div`
    padding-top: 40px;
    padding-bottom: 20px;
    position: relative;
    z-index: 1;
    text-align: center;
    font-family: Favoritstd, sans-serif;
    color: #242e35;
    font-size: 20px;
    line-height: 160%;
    font-weight: 500;
    background-color: #fff;

    .accordionItemImg {
        height: 248px;
        max-width: 250px;
        width: 100%;
        display: block;
        margin: 0 auto;
    }

    .accordionItemTitle {
        margin-top: 30px;
        padding-right: 20px;
        padding-left: 20px;
        font-size: 16px;
        line-height: 26px;
        font-weight: 500;
    }
`;

export default Accordion;
