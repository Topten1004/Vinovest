import { useSpring } from "react-spring";

function calcHoverPositions(x, y, ref) {
    if (ref.current) {
        const wrapperRect = ref.current.getBoundingClientRect();
        const { width, height } = wrapperRect;

        const a = x - wrapperRect.x;
        const b = y - wrapperRect.y;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const calcA = width / 2 > halfWidth - a * -1 ? a : -(width - a) + halfWidth;
        const calcB = height / 2 > halfHeight - b * -1 ? b : -(height - b) + halfHeight;

        return [calcA, calcB];
    }

    return [x - window.document.innerWidth, y - window.document.innerHeight];
}

const useHoverAnimation = ({ frequency = 0.05 }) => {
    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
    const translate1 = (x, y) => `translate3d(${-x * frequency}px,${-y * frequency}px,0)`;
    const translate2 = (x, y) => `translate3d(${x * frequency}px,${y * frequency}px,0)`;
    const translateCustom1 = (fr) => (x, y) => `translate3d(${-x * fr}px,${-y * fr}px,0)`;
    const translateCustom2 = (fr) => (x, y) => `translate3d(${x * fr}px,${y * fr}px,0)`;

    return {
        calcHoverPositions,
        translate1,
        translate2,
        translateCustom1,
        translateCustom2,
        xy,
        set,
    };
};

export default useHoverAnimation;
