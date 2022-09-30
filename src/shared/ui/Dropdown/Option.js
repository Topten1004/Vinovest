import PropTypes from "prop-types";
import React from "react";
import { ReactComponent as Union } from "./assets/union.svg";
import { MenuItem } from "./styled";

const Option = ({ selected, onClick, value, label, selectedBackground }) => {
    const handleClick = React.useCallback(
        (e) => {
            e.stopPropagation();
            onClick({ value, label });
        },
        [value, label, onClick],
    );

    return (
        <MenuItem selected={selected} onClick={handleClick} background={selectedBackground}>
            <span>{label}</span>
            <Union />
        </MenuItem>
    );
};

export const OptionPropTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};

Option.propTypes = {
    ...OptionPropTypes,
};

export default Option;
