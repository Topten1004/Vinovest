import React from "react";
import OrangeRightArrowSVG from "#assets/shared/orange-right-arrow.svg";
import { PaymentSourceOptionContainer } from "../styles";

const PaymentSourceOption = ({ label, icon, ...rest }) => (
    <PaymentSourceOptionContainer {...rest}>
        <div className="icon-wrapper">{icon}</div>
        <span>{label}</span>
        <img className="payment-right-arrow-icon" alt="right-arrow" src={OrangeRightArrowSVG} />
    </PaymentSourceOptionContainer>
);

export default PaymentSourceOption;
