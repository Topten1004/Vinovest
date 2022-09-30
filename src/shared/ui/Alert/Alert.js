import PropTypes from "prop-types";
import React from "react";
import Fade from "#shared/ui/Fade";
import * as Styled from "./Alert.styled";

const Alert = ({ title, description, variant }) => {
    return (
        <Fade in>
            <Styled.Container variant={variant}>
                <Styled.Title>{title}</Styled.Title>
                <Styled.Description>{description}</Styled.Description>
            </Styled.Container>
        </Fade>
    );
};

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["success", "warning", "danger"]).isRequired,
};

export default Alert;
