import React from "react";
import ReactSelect from "react-select";

const customStyles = {
    container: () => ({}),
    menu: () => ({}),
    control: (provided) => ({
        ...provided,
        border: "1px solid #F0F0F0;",
        borderBox: "border-box",
        height: 64,
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            border: "1px solid #F0F0F0;",
            boxShadow: "none",
        },
    }),
    noOptionsMessage: () => ({
        display: "none",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),

    // option: ( provided, state ) => ({
    // }),
};

const Select = (props) => <ReactSelect {...props} styles={customStyles} />;

Select.propTypes = ReactSelect.propTypes;
export default Select;
