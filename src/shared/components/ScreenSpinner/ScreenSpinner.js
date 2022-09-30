import PropTypes from "prop-types";
import React from "react";
import { ClipLoader } from "react-spinners";
import { Fade } from "#shared/ui";
import Container from "./Container.styled";
import ConditionalRender from "#shared/components/ConditionalRender";
import { useToggle } from "#shared/hooks";

const withDelay = (fn, ms = 300) => () => setTimeout(fn, ms);

const ScreenSpinner = ({ loading }) => {
    const [render, onToggle] = useToggle(true);
    return (
        <ConditionalRender shouldRender={render}>
            {() => (
                <Fade timeout={1200} in={loading} onExit={withDelay(onToggle)}>
                    <Container hidden={!loading}>
                        <ClipLoader size={100} />
                    </Container>
                </Fade>
            )}
        </ConditionalRender>
    );
};

ScreenSpinner.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default ScreenSpinner;
