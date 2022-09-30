import PropTypes from "prop-types";

/** TODO: GET RID OF THIS  */
const ConditionalRender = ({ children, fallback, shouldRender }) => (shouldRender ? children() : fallback);

ConditionalRender.propTypes = {
    children: PropTypes.func.isRequired,
    shouldRender: PropTypes.bool.isRequired,
    fallback: PropTypes.node,
};

ConditionalRender.defaultProps = {
    fallback: null,
};

export default ConditionalRender;
