import PropTypes from "prop-types";
import React from "react";
import { FormSpy, useForm } from "react-final-form";
import debounce from "lodash/debounce";
import Storage from "#services/Storage";

/**
 *
 * @type {debounced}
 */
const saveForm = debounce((form, values) => {
    Storage.setValue(form, values);
}, 300);

const FormPersist = ({ form }) => {
    const { initialize } = useForm();
    const onChange = React.useCallback(({ values }) => saveForm(form, values), [form]);

    React.useEffect(() => {
        const maybeState = Storage.getValue(form);

        if (maybeState) {
            initialize(maybeState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <FormSpy onChange={onChange} />;
};
FormPersist.propTypes = {
    form: PropTypes.string.isRequired,
};
export default FormPersist;
