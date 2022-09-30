import React from "react";
import styled from "styled-components";
import standardLogoSvg from "./v3-logo.svg";
import v3logoGreenSvg from "./v3logoGreen.svg";
import v3logoBrownSvg from "./v3logoBrown.svg";
import v3logoLightSvg from "./v3logoLight.svg";

const data = {
    standard: standardLogoSvg,
    green: v3logoGreenSvg,
    brown: v3logoBrownSvg,
    light: v3logoLightSvg,
};

const LogoImage = styled.img`
    height: ${(p) => (p.authenticated ? "48px" : "100%")};
    width: 100%;
    display: block;
    object-fit: contain;
`;

export const V3Logo = ({ type = "standard", authenticated }) => <LogoImage src={data[type]} authenticated={authenticated} />;
