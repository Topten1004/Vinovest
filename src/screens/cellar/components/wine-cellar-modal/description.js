import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Description = ({ text = "", length = 96, updateHeight = () => {} }) => {
    const { t } = useTranslation(["portfolio"]);
    const [showWholeText, setShowWholeText] = useState(false);
    const toggleTextView = () => setShowWholeText((t) => !t);

    const didMount = React.useRef(null);
    React.useEffect(() => {
        didMount && updateHeight();

        if (!didMount) didMount = true;
    }, [showWholeText]);

    return (
        <DescriptionContainer>
            {showWholeText ? text : text.slice(0, length)}
            {!showWholeText && text && text.length >= length && (
                <span>
                    ...{" "}
                    <button type="button" onClick={toggleTextView}>
                        {t("description.read")}
                    </button>
                </span>
            )}
        </DescriptionContainer>
    );
};

const DescriptionContainer = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
    letter-spacing: 0.005em;
    color: #384147;
    padding: 44px 182px 26px;

    button {
        background: transparent;
        border: 0;
        outline: 0;
        color: ${(p) => p.theme.colors.burntOrange};
        padding: 0;

        &:hover {
            cursor: pointer;
        }
    }

    @media screen and (max-width: 1023px) {
        padding: 18px 21px 0;
        font-size: 11px;
        line-height: 21px;
        max-width: 353px;
        margin: 0 auto;
    }
`;

export default Description;
