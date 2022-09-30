import React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import { createTransition, defaultTimeout, reflow, styles, getTransitionProps } from "./utils";

const Fade = (props) => {
    const { children, in: inProp, onEnter, onExit, style, timeout = defaultTimeout, ...other } = props;

    const handleEnter = (node, isAppearing) => {
        reflow(node); // So the animation always start from the start.

        const transitionProps = getTransitionProps(
            { style, timeout },
            {
                mode: "enter",
            },
        );
        node.style.webkitTransition = createTransition("opacity", transitionProps);
        node.style.transition = createTransition("opacity", transitionProps);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    };

    const handleExit = (node) => {
        const transitionProps = getTransitionProps(
            { style, timeout },
            {
                mode: "exit",
            },
        );
        node.style.webkitTransition = createTransition("opacity", transitionProps);
        node.style.transition = createTransition("opacity", transitionProps);

        if (onExit) {
            onExit(node);
        }
    };

    return (
        <Transition appear in={inProp} onEnter={handleEnter} onExit={handleExit} timeout={timeout} {...other}>
            {(state, childProps) => {
                return React.cloneElement(children, {
                    style: {
                        opacity: 0,
                        visibility: state === "exited" && !inProp ? "hidden" : undefined,
                        ...styles[state],
                        ...style,
                        ...children.props.style,
                    },
                    ...childProps,
                });
            }}
        </Transition>
    );
};

Fade.defaultProps = {
    in: false,
    timeout: 500,
};

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    style: PropTypes.object,
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    ]),
};

export default Fade;
