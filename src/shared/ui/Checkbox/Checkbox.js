import PropTypes from "prop-types";
import React from "react";
import { StyledCheckbox, CheckboxContainer, HiddenCheckbox } from "./Checkbox.styled";
import CheckIcon from "./CheckIcon";

const Checkbox = ({ className, checked, square, ...props }) => {
    const onChange = () => {
        const value = props.value || checked;
        props.onChange(!value);
    };

    const isChecked = checked || props.value;
    return (
        <CheckboxContainer className={className} onClick={onChange}>
            <HiddenCheckbox checked={isChecked} {...props} />
            <StyledCheckbox checked={isChecked} square={square}>
                <CheckIcon />
            </StyledCheckbox>
        </CheckboxContainer>
    );
};

Checkbox.defaultProps = {
    checked: false,
    square: false,
    onChange: () => {},
};

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    square: PropTypes.bool,
};

export default Checkbox;
