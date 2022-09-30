export const sliderDots = (color) => `
    .slick-dots li button:before {
        font-size: 18px !important;
        opacity: 1;
        color: transparent;
        border: 2px solid ${color};
        border-radius: 50%;
        width: 12px;
        height: 12px;
        content: "";
    }

    .slick-dots li.slick-active button:before {
        background-color: ${color};
        color: ${color};
        opacity: 1;
    }
`;

export const removeOutline = `
    .slideWrap:focus,
    .slideWrap:active {
        outline: none;
    }

    .slick-slide div {
        outline: 0;
    }
`