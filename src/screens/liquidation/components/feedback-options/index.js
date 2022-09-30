import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import posthog from "posthog-js";
import { useTranslation } from "react-i18next";
import { Fade, BottleAnimationLoader } from "#shared/ui";
import { useHistory } from "#shared/hooks/useHistory";
import CustomCheckbox from "#shared/components/CustomCheckbox";
import { useMobile, useRootStore } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import { ListsWrapper, OptionsWrapper } from "../styled";
import NextButton from "../next-button";
import StepWrapper from "../step-wrapper";
import Option from "../option";

const getOptions = (t) => [
    t("before_you_request.feedback_options.option1"),
    t("before_you_request.feedback_options.option2"),
    t("before_you_request.feedback_options.option3"),
    t("before_you_request.feedback_options.option4"),
    t("before_you_request.feedback_options.option5"),
];

const SellOptions = () => {
    const { t } = useTranslation(["liquidation"]);
    const history = useHistory();
    const s = useRootStore();
    const { confirmWinesLiquidationStatus } = s.liquidation;

    const isFailed = getStatus(s.liquidation.confirmWinesLiquidationStatusEntity).isFailed();

    const options = React.useMemo(() => getOptions(t), [t]);

    React.useEffect(() => {
        if (s.auth.isAuthenticated && s.user.oktaUserInfo && s.user.oktaUserInfo.sub) {
            s.liquidation.confirmWinesLiquidation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s.auth.isAuthenticated, s.user.oktaUserInfo.sub]);

    const [selectedFeedBackOption, setSelectedFeedBackOption] = React.useState(null);
    const [feedBackOptional, setFeedBackOptional] = React.useState("");
    const [subscribe, setSubscribe] = React.useState(true);
    const isMobile = useMobile();

    const submit = () => {
        const responded = selectedFeedBackOption !== "I choose not to respond";
        if (responded) {
            s.tracking.gtm.liquidationFeedback({ selectedFeedBackOption });
        } else {
            s.tracking.gtm.liquidationNoFeedback();
        }

        if (feedBackOptional) {
            s.tracking.gtm.liquidationNewsletterOptIn({ feedBackOptional });
        }

        if (subscribe) {
            s.tracking.gtm.trackLiquidationFlowNewsletter();
        }
        posthog.capture("liquidation_survey", {
            feedback: selectedFeedBackOption,
            responded,
            feedBackOptional,
            subscribe,
        });

        history.replace("/");
    };

    return (
        <Fade in>
            {confirmWinesLiquidationStatus.completed ? (
                <div>
                    {!isFailed ? (
                        <StepWrapper
                            title={t("Your wines are scheduled to be sold")}
                            description={
                                // eslint-disable-next-line react/jsx-wrap-multilines
                                <>
                                    {t("before_you_request.feedback_options.completed.description")} <br />
                                    <br /> {t("before_you_request.feedback_options.completed.feedback")}
                                </>
                            }
                        >
                            <FeedBackWrapper>
                                <ListsWrapperModified>
                                    <OptionsWrapper>
                                        {options.map((value, i) => (
                                            <Option
                                                key={value}
                                                value={value}
                                                text={value}
                                                setSelected={setSelectedFeedBackOption}
                                                selected={selectedFeedBackOption}
                                                border={options.length - 1 === i}
                                            />
                                        ))}
                                    </OptionsWrapper>
                                </ListsWrapperModified>
                                <OptionalMessage
                                    placeholder={t("optional_feedback")}
                                    value={feedBackOptional}
                                    onChange={({ target }) => setFeedBackOptional(target.value)}
                                />

                                <SubscribeWrapper>
                                    <CustomCheckbox
                                        id="scheduledToBeSold"
                                        checked={subscribe}
                                        onChange={() => setSubscribe((bool) => !bool)}
                                    />{" "}
                                    <label htmlFor="scheduledToBeSold">{t("feedback-options.subscribe.label")}</label>
                                </SubscribeWrapper>
                                <NextButton goNext={selectedFeedBackOption ? submit : null} nextTitle="Done" />

                                <Support>
                                    {isMobile ? (
                                        <>
                                            {t("before_you_request.feedback_options.support.mobile_email")}{" "}
                                            <a href="mailto:support@vinovest.co">support@vinovest.co</a>{" "}
                                            {t("before_you_request.feedback_options.support.mobile_questions")}
                                        </>
                                    ) : (
                                        <>
                                            {t("before_you_request.feedback_options.support.email")}{" "}
                                            <a href="mailto:support@vinovest.co">
                                                {t("before_you_request.feedback_options.support.support")}
                                            </a>{" "}
                                            {t("before_you_request.feedback_options.support.mobile_questions")}
                                        </>
                                    )}
                                </Support>
                            </FeedBackWrapper>
                        </StepWrapper>
                    ) : (
                        <ErrorWrapper>
                            <Support>
                                {isMobile ? (
                                    <>
                                        {t("feedback_options.support.mobile_email")}{" "}
                                        <a href="mailto:support@vinovest.co">support@vinovest.co</a>{" "}
                                        {t("before_you_request.feedback_options.support.mobile_questions")}
                                    </>
                                ) : (
                                    <>
                                        {t("before_you_request.feedback_options.support.email")}{" "}
                                        <a href="mailto:support@vinovest.co">
                                            {t("before_you_request.feedback_options.support.support")}
                                        </a>{" "}
                                        {t("before_you_request.feedback_options.support.mobile_questions")}
                                    </>
                                )}
                            </Support>
                        </ErrorWrapper>
                    )}
                </div>
            ) : (
                <BottleAnimationLoader />
            )}
        </Fade>
    );
};

const FeedBackWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorWrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ListsWrapperModified = styled(ListsWrapper)`
    margin: 0;
    @media screen and (max-width: 1024px) {
        margin: 0;
    }
`;

const OptionalMessage = styled.textarea`
    margin: 6px auto 75px;
    padding: 17px 30px;
    width: 100%;
    max-width: 620px;
    min-height: 100px;
    background: #ffffff;
    border: 1px solid #a8abad;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);

    @media screen and (max-width: 1024px) {
        padding: 14px 15px;
        min-height: 141px;
        margin: 16px auto 36px;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        display: flex;
        align-items: center;
        letter-spacing: 0.005em;
        color: #242e35;
    }
`;

export const SubscribeWrapper = styled.div`
    display: flex;
    margin-bottom: 52px;

    label {
        display: block;
        margin-left: 25px;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.005em;
        color: #242e35;

        @media screen and (max-width: 1024px) {
            margin-left: 17px;
            font-size: 14px;
            line-height: 21px;
        }
    }

    svg {
        @media screen and (max-width: 1024px) {
            width: 22px;
        }
    }
`;

const Support = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.005em;
    color: #242e35;
    text-align: center;
    margin-top: 55px;

    a {
        color: #a86d37;
        text-decoration: none;
    }

    @media screen and (max-width: 1024px) {
        margin-top: 37px;
    }
`;

export default observer(SellOptions);
