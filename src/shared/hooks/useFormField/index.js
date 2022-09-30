import { useState } from "react";

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (key, value) {
            setValues({
                ...fields,
                [key]: value,
            });
        },
    ];
}
