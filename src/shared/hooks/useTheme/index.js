import { useContext } from "react";
import { ThemeContext } from "styled-components";
import identity from "lodash/fp/identity";
import get from "lodash/fp/get";

const useTheme = (path) => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error(`useTheme must be used within a ThemeProvider`);
    }

    return (path ? get(path) : identity)(context);
};

export default useTheme;
