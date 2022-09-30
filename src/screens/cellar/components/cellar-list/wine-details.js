import React from "react";

import { WineDetailsContainer, WineImg, WineDetailsText, WineDetailsMl, WineDetailsFunds } from "./styled";

const WineDetails = ({ sizeByML, wine, src, addFunds, addFundsHandler }) => (
    <WineDetailsContainer>
        <WineImg src={src} alt="bottle" addFunds={!!addFunds} />
        <WineDetailsText>
            {wine}
            {sizeByML && <WineDetailsMl>{sizeByML}</WineDetailsMl>}
            {addFunds && <WineDetailsFunds onClick={addFundsHandler}>{addFunds}</WineDetailsFunds>}
        </WineDetailsText>
    </WineDetailsContainer>
);

export default WineDetails;
