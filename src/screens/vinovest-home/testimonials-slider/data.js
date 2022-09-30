import React from "react";
import i18n from "i18next";
import manPhotoJpg from "../assets/manPhoto.jpg";
import mckennaJpg from "../assets/mckenna.jpg";
import janeLopesJpg from "../assets/janeLopes.jpg";

export const testimonialsSliderData = [
    {
        to: "/advisory-council",
        id: 0,
        src: manPhotoJpg,

        title: i18n.t("vinovest-home:partners-are-saying.DustinWilson.title"),
        description: i18n.t("vinovest-home:partners-are-saying.DustinWilson.description"),
        bottomText: (
            <>
                <span>DUSTIN WILSON,</span>{" "}
                <span>{i18n.t("vinovest-home:partners-are-saying.DustinWilson.bottomText")}</span>
            </>
        ),
    },
    {
        to: null,
        id: 1,
        src: mckennaJpg,
        title: i18n.t("vinovest-home:partners-are-saying.McKennaWeinstein.title"),
        description: i18n.t("vinovest-home:partners-are-saying.McKennaWeinstein.description"),
        bottomText: "McKenna weinstein",
    },
    {
        to: "/advisory-council",
        id: 2,
        src: janeLopesJpg,
        title: i18n.t("vinovest-home:partners-are-saying.JaneLopes.title"),
        description: i18n.t("vinovest-home:partners-are-saying.JaneLopes.description"),
        bottomText: (
            <>
                <span>Jane lopes,</span> <span>{i18n.t("vinovest-home:partners-are-saying.JaneLopes.bottomText")}</span>
            </>
        ),
    },
];
