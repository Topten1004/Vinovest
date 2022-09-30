declare global {
    interface Window {
        [key: string]: any;
    }
    interface Twttr {
        [key: string]: any;
    }
}
interface Twttr {
    [key: string]: any;
}
declare var twttr: any;
declare module "twttr" {
    const twt: Twttr;
    export = twt

}
interface Window {
    [key: string]: any;
}
declare module "*.svg" {
    import * as React from "react";

    const svgUrl: string;

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export = svgUrl;
}

declare module "*.otf" {
    import * as React from "react";

    const otfUrl: string;
    export = otfUrl;
}
declare module "*.jpg" {
    const jpgImage: string;
    export = jpgImage;
}

declare module "*.jpeg" {
    const jpgImage: string;
    export = jpgImage;
}

declare module "*.png" {
    const pngImage: string;
    export = pngImage;
}
declare global {
    interface Window {
        ServiceBell: any;
        google_optimize?: any;
        dataLayer: any;
    }
}

declare module "*.otf";
