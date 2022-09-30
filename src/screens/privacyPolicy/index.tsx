import React from "react";
import { getCurrentLng } from "#localization/i18n";
import { EnglishPrivacyPolicy } from "./englishPolicy";
import { ChinesePrivacyPolicy } from "./chinesePolicy";
import { languageCodeMainlandChina } from "#utils/constants";

const PrivacyPolicy = () => {
    const policy = languageCodeMainlandChina ? <ChinesePrivacyPolicy /> : <EnglishPrivacyPolicy />;
    return policy;
};

export default PrivacyPolicy;
