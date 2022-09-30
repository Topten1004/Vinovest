import React from 'react';
import ReactDOM from "react-dom";
import {PageRedirect} from '#shared/components/PageRedirect/PageRedirect'
import { Redirect } from "react-router-dom";

const useRedirect = ({ pathname, hard, title }: { pathname: string; hard: boolean; title?: string }) => {
    return () => {
   
        if (hard) {
            ReactDOM.render(<PageRedirect/>, document.getElementById("root"), () => {
                window.location.assign(pathname)
                return
            })

        }
        return <Redirect to={location} push={Boolean(hard)} />;
    };
};

export default useRedirect;
