import { useMediaQuery } from "react-responsive";

const useMobile = (px) =>
    // isTabletOrMobile
    useMediaQuery({ query: `(max-width: ${px || 768}px)` });
export default useMobile;
