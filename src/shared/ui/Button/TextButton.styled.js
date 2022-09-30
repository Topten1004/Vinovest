import PropTypes from "prop-types";
import styled from "styled-components";

const TextButton = styled.button`
    text-transform: ${(p) => (p.uppercase ? "uppercase" : "none")};
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: ${(p) => p.theme.typography.size.sm}px;
    line-height: 25px;
    letter-spacing: 1px;
    cursor: pointer;
`;

TextButton.defaultProps = {
    uppercase: false,
};

TextButton.propTypes = {
    uppercase: PropTypes.bool,
};

export default TextButton;
