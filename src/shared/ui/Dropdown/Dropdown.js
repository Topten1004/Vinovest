import PropTypes from "prop-types";
import React from "react";
import noop from "lodash/noop";
import { useOnClickOutside } from "#shared/hooks";
import { ReactComponent as Check } from "./assets/check.svg";
import { Menu, DropdownButton, Container } from "./styled";
import Option, { OptionPropTypes } from "./Option";

const Dropdown = ({
    options,
    defaultValue,
    onChange,
    defaultOpen,
    selectedInParent,
    selectedLabel,
    selectedBackground,
}) => {
    const [selected, setSelected] = React.useState(defaultValue || options[0].label);
    const [open, setOpen] = React.useState(defaultOpen);
    const ref = React.useRef();

    useOnClickOutside(ref, () => setOpen(false));

    const handleClick = React.useCallback(
        (option) => {
            setSelected(option.label);
            onChange(option);
            setOpen(false);
        },
        [onChange],
    );

    return (
        <Container open={open} ref={ref}>
            <DropdownButton onClick={() => setOpen((o) => !o)}>
                <span>{selectedInParent !== undefined ? selectedLabel : selected}</span>
                <Check />
            </DropdownButton>
            <Menu open={open} onClick={() => setOpen((o) => !o)}>
                {options.map((option, index) => (
                    <Option
                        key={index}
                        {...option}
                        onClick={handleClick}
                        selected={
                            selectedInParent !== undefined
                                ? selectedInParent === option.value
                                : option.label === selected
                        }
                        selectedBackground={selectedBackground}
                    />
                ))}
            </Menu>
        </Container>
    );
};

Dropdown.defaultProps = {
    options: [],
    onChange: noop,
    defaultOpen: false,
};
Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape(OptionPropTypes)),
    onChange: PropTypes.func,
    defaultOpen: PropTypes.bool,
};
export default Dropdown;
