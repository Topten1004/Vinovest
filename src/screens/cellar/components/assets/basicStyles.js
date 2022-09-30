import styled, { keyframes, css } from "styled-components";

export const ListBasis = styled.div`
    display: grid;
    grid-template-columns: 40% 18% 21% 21%;
    text-align: right;
    grid-template-areas: ". . . .";
`;

export const ListOfTitles = styled(ListBasis)`
    color: ${(p) => p.theme.colors.mainAccentBlue};
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    padding-bottom: 16px;
    border-bottom: 1px solid #caccce;
    margin-bottom: 38px;
    transition: 0.5s;

    .conditionalOpacity {
      transition: 0.5s;
    }

    ${(p) => p.pale && `
      border-bottom: 1px solid #caccce61;
      
      .conditionalOpacity {
        opacity: 0.3;
      }    
    `};
`;

export const CellBasis = styled.div`
    margin-right: 30px;
`;

export const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const FadeAnimation = css`
    animation: ${fade} 1.5s ease-in-out;
`;
