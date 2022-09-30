import React from "react";
import { useTranslation } from "react-i18next";
import { bordeaux, burgundy, california, champagne, rhone, italy, restOfTheWorld } from "./data";
import { Wrapper, Title } from "../styled";

import Accordion from "./Accordion";

const Glossary = () => {
    const { t } = useTranslation("vinovest-hundred-index");
    
    return  (
    <Wrapper>
        <Title>{t("glossary.title")}</Title>
        <Accordion data={bordeaux} title={t("glossary.bordeaux")} />
        <Accordion data={burgundy} title={t("glossary.burgundy")} />
        <Accordion data={california} title={t("glossary.california")} />
        <Accordion data={champagne} title={t("glossary.champagne")} />
        <Accordion data={rhone} title={t("glossary.rhone")} />
        <Accordion data={italy} title={t("glossary.italy")} />
        <Accordion data={restOfTheWorld} title={t("glossary.restWorld")} borderBottom />
    </Wrapper>
)};

export default Glossary;
