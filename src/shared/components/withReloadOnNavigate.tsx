import React from "react";
import ReactDOM from "react-dom";
import { PageRedirect } from "./PageRedirect/PageRedirect";

export const withReloadOnNavigate =
    (Component) =>
    (...props) => {
        React.useEffect(() => {
            ReactDOM.render(<PageRedirect />, document.getElementById("root"), () => {
                window.location.reload();
            });
        }, []);
        return (
            <>
                <Component {...props} />
            </>
        );
    };
