import { keyframes } from "styled-components";

export const FadeFromBottomWithDelay = keyframes`  
  0% {
    opacity: 0;
    transform: translateY(50%);
  }

  50% {
    opacity: 0;
    transform: translateY(50%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;
