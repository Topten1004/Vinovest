import React from "react";
import { Fade } from "#shared/ui";
import { Wrapper, ListsWrapper, OptionsWrapper, NotesWrapper } from "../styled";
import NextButton from "../next-button";
import Option from "../option";
import { TFunction, useTranslation } from "react-i18next";

interface WithdrawOptionsProps {
    goNext: any;
    nextTitle: string;
    selectedSellOption: string | null;
    setSelectedSellOption: (event) => void;
}

const translateOptions = (t: TFunction<string[]>) => [
    { value: "reinvest", text: t("withdraw.reinvest"), id: "reinvestTheFunds" },
    { value: "withdraw", text: t("withdraw.withdraw"), id: "withdrawTheFunds" },
];

const WithdrawOptions = ({
    goNext,
    selectedWithdrawOption,
    setSelectedWithdrawOption,
    nextTitle,
    onRequestWithdrawalClick,
}) => {
    const { t } = useTranslation(["liquidation"]);
    const options = translateOptions(t);
    const goNextFunc = () => {
        if (selectedWithdrawOption === "withdraw") {
            onRequestWithdrawalClick(goNext);
        } else {
            goNext();
        }
    };
    return (
        <Fade in>
            <Wrapper>
                <ListsWrapper>
                    <OptionsWrapper>
                        {options &&
                            options.map(({ value, text, id }, i) => (
                                <Option
                                    key={id}
                                    value={value}
                                    text={text}
                                    setSelected={setSelectedWithdrawOption}
                                    selected={selectedWithdrawOption}
                                    border={options.length - 1 === i}
                                />
                            ))}
                    </OptionsWrapper>
                </ListsWrapper>
                <NextButton goNext={selectedWithdrawOption ? goNextFunc : null} nextTitle={nextTitle} />
            </Wrapper>
        </Fade>
    );
};

export default WithdrawOptions;
