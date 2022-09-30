import React from "react";
import styled from "styled-components";

const DropdownMobile = ({ options, selected, selectedLabel, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = (e) => e.currentTarget === e.target && setIsOpen((o) => !o);
    return (
        <DropdownMobileWrapper>
            <Selected onClick={toggleMenu}>
                <span>{selectedLabel || selected}</span>{" "}
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 1L7 7L13 1"
                        stroke="#242E35"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Selected>
            {isOpen && (
                <Menu onClick={toggleMenu}>
                    <OptionsWrapper>
                        <Options>
                            {options.map((option, i) => (
                                <Option
                                    key={option.label}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange(option);
                                        setIsOpen((o) => !o);
                                    }}
                                    style={i === options.length - 1 ? { border: 0 } : {}}
                                >
                                    <span>{option.label}</span>
                                    {selected === option.value && (
                                        <svg
                                            width="12"
                                            height="10"
                                            viewBox="0 0 12 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 5.23529L4.80952 9L11 1"
                                                stroke="#242E35"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Option>
                            ))}
                        </Options>
                    </OptionsWrapper>
                </Menu>
            )}
        </DropdownMobileWrapper>
    );
};

export const DropdownMobileWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const Selected = styled.div`
    padding: 0 15px;
    height: 40px;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    color: #242e35;
    border: 1px solid #a8abad;
`;

export const Menu = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const OptionsWrapper = styled.div`
    padding-bottom: 85px;
    background: #fff;
`;

export const Options = styled.div`
    padding: 19px 29px 14px;
    border-bottom: 1px solid #eeeeee;
`;

export const Option = styled.div`
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 5px;
`;

export default DropdownMobile;
