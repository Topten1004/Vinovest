import React, { useContext } from "react";

const ConfigContext = React.createContext({});

const useConfig = () => {
    const context = useContext(ConfigContext);

    if (context === undefined) {
        throw new Error("useConfig must be used within a ConfigProvider");
    }

    return context;
};
export const ConfigProvider = ConfigContext.Provider;
export default useConfig;
