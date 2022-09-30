import React from "react";
import styled from "styled-components";
import BookingBtn from "./BookBtn";

const BannerSection = () => (
    <BannerSect>
        <BookingBtn />
    </BannerSect>
);

const BannerSect = styled.section`
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 0 0 100px;
    overflow: hidden;
`;
export default BannerSection;
