export const reflow = (node) => node.scrollTop;

export function getTransitionProps(props, options) {
    const { timeout, style = {} } = props;

    return {
        duration: style.transitionDuration || typeof timeout === "number" ? timeout : timeout[options.mode] || 0,
        delay: style.transitionDelay,
    };
}

export const duration = {
    standard: 300,
    enteringScreen: 225,
    leavingScreen: 195,
};

export const styles = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
};

export const defaultTimeout = {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
};
export const formatMs = (milliseconds) => `${Math.round(milliseconds)}ms`;
export const createTransition = (props = ["all"], options = {}) => {
    const {
        duration: durationOption = duration.standard,
        easing: easingOption = easing.easeInOut,
        delay = 0,
    } = options;

    return (Array.isArray(props) ? props : [props])
        .map(
            (animatedProp) =>
                `${animatedProp} ${
                    typeof durationOption === "string" ? durationOption : formatMs(durationOption)
                } ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`,
        )
        .join(",");
};

export const easing = {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
};
