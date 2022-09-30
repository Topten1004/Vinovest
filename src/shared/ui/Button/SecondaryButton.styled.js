import styled from "styled-components";
import MainButton from "./MainButton.styled";

const SecondaryButton = styled(MainButton)`
    border: 1px solid ${(p) => p.theme.colors.lightGray};
    color: ${(p) => p.theme.colors.gray};
    background: ${(p) => p.theme.colors.white};
`;

export default SecondaryButton;
