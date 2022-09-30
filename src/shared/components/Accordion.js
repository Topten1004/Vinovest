import React from "react";
import styled from "styled-components";

const Accordion = ({ children, title, trading }) => {
    const [isOpen, setIsOPen] = React.useState(false);
    const [height, setHeight] = React.useState(0);

    const toggle = () => {
        setHeight(isOpen ? 0 : ref.current.scrollHeight);
        setIsOPen((bool) => !bool);
    };

    const ref = React.useRef(null);

    return (
        <AccordionWrapper onClick={toggle}>
            <AccordionHead>
                <AccTitle trading={trading}>{title}</AccTitle>
                <AccRightSide className={isOpen ? "isOpen" : ""}>
                    <svg
                        className="svgArrow"
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.5766 7.5L7.78829 1.49997L2 7.5"
                            stroke="#242E35"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                    </svg>
                </AccRightSide>
            </AccordionHead>

            <HideOverflow height={height}>
                <AccordionContentWrapper className={isOpen ? "isOpen" : ""} ref={ref}>
                    {children}
                </AccordionContentWrapper>
            </HideOverflow>
        </AccordionWrapper>
    );
};

const AccordionWrapper = styled.div`
    border: 1px solid #d8d8d8;
    border-radius: 10px;
`;

const AccordionHead = styled.div`
    display: flex;
    padding: 10px 44px 10px 21px;
    min-height: 91px;
    justify-content: space-between;
    align-items: center;
    transition: 0.5s;

    @media (max-width: 767px) {
        padding: 0px 18px 0px 17px;
        min-height: 67px;
    }

    &:hover {
        cursor: pointer;
    }
`;

const AccTitle = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: VinovestMedium, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #242e35;
    padding-right: 10px;

    @media (max-width: 767px) {
        font-size: ${(p) => (p.trading ? "18px" : "14px")};
        max-width: ${(p) => (p.trading ? "287px" : "auto")};
        margin-top: ${(p) => (p.trading ? "32px" : "10px")};
        margin-bottom: ${(p) => (p.trading ? "32px" : "10px")};
        line-height: 24px;
    }
`;

const AccRightSide = styled.div`
    display: flex;
    align-items: baseline;

    .svgArrow {
        transition: 0.5s;
        transform: rotate(180deg);
    }

    &.isOpen {
        .svgArrow {
            transform: rotate(0deg);
        }
    }
`;

const HideOverflow = styled.div`
    overflow: hidden;
    height: ${({ height }) => height}px;
    transition: 0.5s;
`;

const AccordionContentWrapper = styled.div`
    position: relative;
    transition: 0.5s;
    opacity: 0;
    margin-top: -100%;
    height: 0;

    &.isOpen {
        margin-top: 0;
        opacity: 1;
        height: fit-content;
    }
`;

Accordion.AccordionWrapper = AccordionWrapper;

export default Accordion;
