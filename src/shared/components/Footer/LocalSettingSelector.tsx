/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import * as React from "react";
import { Button, Modal, Typography, Select, Icons } from "@vinovest/components/index";
import { useTheme, Theme } from "@emotion/react";
import { useTranslation } from "react-i18next";

const { IconCheck, IconClose } = Icons;
const mobileMax = "767px";
interface VinoTheme extends Theme {
    foundation?: { [key: string]: any };
}

interface OneTimeCurrencySelectProps {
    isOpen: boolean;
    onClose(selectedValue: string): () => void;
    onCancel: (event) => void;
    currency: {
        label: string;
        value: string;
    };
    currencyOptions: any;
}

export const LocalSettingSelector = ({ isOpen, onClose, onCancel, currency, currencyOptions }: OneTimeCurrencySelectProps) => {
    const { t } = useTranslation("deposit");
    const [selectedValue, setSelectedValue] = React.useState(null);
    const emotionTheme: VinoTheme = useTheme();

    const handleCurrencySelected = (e: { key: string }) => {
        if (e.key) {
            if (e.key === "Entry") {
                onClose(selectedValue);
            }
        } else {
            onClose(selectedValue);
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            bindingElementSelector="#modal-root"
            contentLabel="Currency Select Dialog"
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={false}
            css={styles.modal}
        >
            <div css={styles.modalContainer}>
                <div css={styles.maxWidthContent}>
                    <button css={styles.closeModal} onClick={(event) => onCancel(event)}>
                        <IconClose width="14px" height="14px" fill={emotionTheme.foundation.primaryA} />
                    </button>
                    <Typography
                        large
                        heading
                        cssOverride={css`
                            ${styles.textAlign}${styles.marginTop}
                        `}
                    >
                        {t("deposit:local_select.modal_title")}
                    </Typography>
                    <Typography
                        xsmall
                        paragraph
                        font="VinovestMedium"
                        cssOverride={css`
                            ${styles.textAlign} margin-bottom: 3rem;
                        `}
                    >
                        {t("deposit:local_select.modal_description")}
                    </Typography>

                    <label css={styles.selectLabel}>{t("deposit:local_select.label_currency")}</label>
                    <Select
                        defaultValue={currency}
                        label="currency"
                        isMulti={false}
                        options={currencyOptions}
                        componentStyles={{ control: { marginBottom: "2rem", height: "50px", width: "100%", borderRadius: 0 }, valueContainer: { width: "100%", borderRadius: 0 } }}
                        placeholderComponent={({ children, ...props }) => (
                            <React.Fragment>
                                <Typography small paragraph css={styles.textAlign}>
                                    {children}
                                </Typography>
                                <div css={styles.asideCurrency}>{props?.data?.value}</div>
                            </React.Fragment>
                        )}
                        singleValueComponent={({ children, ...props }) => {
                            React.useEffect(() => {
                                setSelectedValue(props.data);
                            }, [children, props])
                            return (
                                <div css={styles.singleValueContainer}>
                                        {children}

                                </div>
                            );
                        }}
                        optionComponent={({ children, ...props }) => (
                            <div css={styles.optionContainer}>
                                <div css={styles.optionFlex}>
                                    <Typography small paragraph cssOverride={styles.listOption}>
                                        {children}
                                    </Typography>
                                </div>
                                {props.isSelected && (
                                    <IconCheck width="13px" height="9px" fill={emotionTheme.foundation.primaryA} />
                                )}
                            </div>
                        )}
                    />
                    <div css={styles.buttonWrap}>
                        <Button
                            secondary
                            label={t("local_select.button_cancel")}
                            onClick={(event) => onCancel(event)}
                        />
                        <Button
                            primary
                            label={t("local_select.button_confirm")}
                            onClick={handleCurrencySelected}
                        />
                    </div>

                </div>
            </div>
        </Modal>

    );
};

const styles = {
    modal: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex 1;
    z-index: 1002;
    position: fixed !important;
`,
    modalContainer: css`
        background: white;
        max-width: 375px;
        width: 100%;
        border-radius: 10px;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1000;
        justify-content: space-around;
        padding: 2rem;

        @media only screen and (max-width: ${mobileMax}) {
            max-width: 354px;
        }
    `,
    textMargin: css`
        margin-left: 17px;
    `,
    textAlign: css`
        text-align: center;
        margin-bottom: 0px;
    `,
    marginTop: css`
        margin-top: 59px
        @media only screen and (max-width: ${mobileMax}) {
            margin-top: 26px;
        }
    `,
    maxWidthContent: css`
        width: 100%;
    `,
    asideCurrency: css`
        margin-left: 1rem;
        display: flex;
        align-self: center;
        color: #b7b7b7;
    `,
    singleValueContainer: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    `,
    optionContainer: css`
        border-radius: 0;
        align-items: center;
        width: inherit;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    `,
    optionFlex: css`
        align-items: center;
        display: flex;
        flex-direction: row;
    `,
    buttonWrap: css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        button {
            cursor: pointer;
            font-size: 12px;
            height: 50px;
            width: 100%;

            @media only screen and (min-width: ${mobileMax}) {
                width: 48%;
            }

            &:first-child {
                margin-bottom: 1rem;

                @media only screen and (min-width: ${mobileMax}) {
                    margin-bottom: 0;
                }
            }
        }
    `,
    listOption: css`
        font-size: 12px;
        margin: 0;
        padding: 0;
        width: 100%,
        display: block,
    `,
    selectLabel: css`
        display: block;
        font-size: 12px;
        margin-bottom: .5rem;
        text-transform: uppercase
    `,
    closeModal: css`
        border: 0;
        background: transparent;
        cursor: pointer;
        float: right;
        padding: 1rem;
        margin: -1rem;
    `
};
export default LocalSettingSelector;