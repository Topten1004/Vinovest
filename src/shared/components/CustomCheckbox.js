import React from "react";
import styled from "styled-components";
import CheckedSvg from "#assets/shared/checked";

const Checkbox = ({ id, value, checked, onChange, disabled }) => (
    <CheckboxLabel htmlFor={id}>
        <CheckedSvg checked={checked} />
        <input id={id} type="checkbox" onChange={onChange} value={value} checked={checked} disabled={disabled} />
    </CheckboxLabel>
);

const CheckboxLabel = styled.label`
    position: relative;
    display: flex;

    input[type="checkbox"] {
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Checkbox;
