import media, { defaultBreakpoints } from "styled-media-query";
import facepaint from "facepaint";
import _ from "lodash";

const medias = _.map(_.values(defaultBreakpoints).reverse(), (bp) => `@media (min-width: ${bp})`);

const mq = facepaint(medias);

const colors = {
    black: "#000",
    white: "#FFFFFF",
    gray: "#636363",
    green: "#27AE60",
    red: "#FF4D00",
    dark: "#242424", // FIND AND REPLACE THESE

    lighterGray: "#EEEEEE",
    lightGray: "#E5E5E5", // NEEDS DARK BG
    borderGray: "#CACCCE",
    disclaimerGray: "#A3A3A3",
    labelGray: "#767A7F",
    darkGray: "#707070",
    darkGrayNeutrals: "#A8ABAD",
    dark30: "#384147",
    gray50: "#5B646B",

    burntOrange: "#A86D37",
    mainAccentBlue: "#242E35",
    mainInnerTaupe: "#FAE8D1",
    lightBlue: "#C5D5E4",
    darkGreen: "#3C400C",
    darkBrown: "#513011",
    lightGreenBeige: "#E0E5CD",
    lighterGreen: "#448B47",
    lightPink: "#E6C9C9",
    lightRed: "#fceeee",
    darkRed: "#953536",

    lightGreen: "#f0f3e4",
};

const fonts = {
    title: "RoslindaleDisplayCondensed",
    body: "VinovestMedium",
    label: "VinovestMono",
};

const modules = {
    borderRadius: "10px",
    boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)",
};

const alerts = {
    success: "#f0f3e4",
    error: "#fceeee",
};

export const theme = {
    alerts,
    colors,
    fonts,
    shadow: {
        base: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        v2: "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08)",
    },
    typography: {
        size: {
            xs: 10,
            sm: 12,
            md: 14,
            lg: 16,
            xl: 18,
        },
    },
    borderRadius: 4,
    media,
    mq,
    modules,
};
