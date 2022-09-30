import React from "react";
import posthog from "posthog-js";
import { Fade } from "#shared/ui";
import { I18nLink } from "#localization/localizedRouter";
import { Wrapper, ListsWrapper, OptionsWrapper, NotesWrapper } from "../styled";
import { ROUTE_PATHS } from "../../../route-paths";
import NextButton from "../next-button";
import Option from "../option";
import Note from "../note";
import { useHistory } from "#shared/hooks/useHistory";
import { TFunction, useTranslation } from "react-i18next";

interface SellOptionsProps {
    goNext: any;
    nextTitle: string;
    selectedSellOption: string | null;
    setSelectedSellOption:(event) => void;
}

const translateOptions = (t: TFunction<string[]>) => [
    { value: "keep", text: t("keep_portfolio"), id: "KeepPortfolio" },
    { value: "part", text: t("before_you_request.sell_options.some"), id: "sellPartOffYouWine" },
    { value: "all", text: t("before_you_request.sell_options.all"), id: "sellAllYouWine" },    
];

const SellOptions = ({ goNext, nextTitle, selectedSellOption, setSelectedSellOption }: SellOptionsProps) => {
    const { t } = useTranslation(["liquidation"]);
    const history = useHistory();
    const goNextFunc = () => {
        if (selectedSellOption === "keep") {
            history.push(ROUTE_PATHS.home);
            try {
                posthog.capture("click_next_describe_goal", { goal: "keep portfolio" });
            } catch (err) {}
        } else {
            goNext();
        }
    };
    const notes = [
        {
            id: "1",
            text: (
                <>
                    {t("before_you_request.sell_options.note")}{" "}
                    <I18nLink to={ROUTE_PATHS.transactions} target="_blank">
                        {t("sell-options.transactionTab")}
                    </I18nLink>
                </>
            ),
        },
        {
            id: "2",
            text: <> {t("general_note")} </>,
        },
    ];

    const options = translateOptions(t);
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
                                    setSelected={setSelectedSellOption}
                                    selected={selectedSellOption}
                                    border={options.length - 1 === i}
                                />
                            ))}
                    </OptionsWrapper>
                    {(!selectedSellOption || selectedSellOption === "part") && (
                        <NotesWrapper>
                            {notes.slice(1, 2).map((item) => (
                                <Note key={item.id}>{item.text}</Note>
                            ))}
                        </NotesWrapper>
                    )}
                    {selectedSellOption === "all" && (
                        <NotesWrapper>
                            {notes.map((item) => (
                                <Note key={item.id}>{item.text}</Note>
                            ))}
                        </NotesWrapper>
                    )}
                </ListsWrapper>
                <NextButton goNext={selectedSellOption ? goNextFunc : null} nextTitle={nextTitle} />
            </Wrapper>
        </Fade>
    );
};

export default SellOptions;
