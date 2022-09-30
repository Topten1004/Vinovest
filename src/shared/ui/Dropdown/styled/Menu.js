import styled from "styled-components";

const Menu = styled.ul`
    list-style: none;
    margin: 0;
    padding: 14px 0;
    position: absolute;
    right: 0;
    display: ${(p) => (p.open ? "block" : "none")};
    background: white;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
    min-width: 183px;
`;

export default Menu;
