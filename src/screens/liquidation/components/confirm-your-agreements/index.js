import React from "react";
import { Fade } from "#shared/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CustomCheckbox from "#shared/components/CustomCheckbox";
import NextButton from "../next-button";

const agreements = [
    { checked: false, title: "confirm_agreements.owner" },
    { checked: false, title: "confirm_agreements.best_price" },
    { checked: false, title: "confirm_agreements.price_estimates" },
    { checked: false, title: "confirm_agreements.fees" },
    { checked: false, title: "confirm_agreements.taxes" },
    { checked: false, title: "confirm_agreements.tax_advice" },
];
const ConfirmYourAgreements = ({ goNext, nextTitle, onRequestWithdrawalClick, isPartial }) => {
    const { t } = useTranslation(["liquidation"]);

    const [state, setState] = React.useState(agreements);
    const checkedHandler = (i) => {
        setState((prevState) => prevState.map((item, idx) => (idx === i ? { ...item, checked: !item.checked } : item)));
    };

    const enabledButton = React.useMemo(() => state.every((item) => item.checked), [state]);

    const goNextHandler = () => {
        if (isPartial) {
            goNext();
        } else {
            onRequestWithdrawalClick(goNext);
        }
    };

    return (
        <Fade in>
            <div>
                <Table>
                    {state.map((item, i) => (
                        <Row key={item.title}>
                            <CellWithInput>
                                <CustomCheckbox
                                    id={item.title}
                                    checked={state[i].checked}
                                    onChange={() => checkedHandler(i)}
                                />
                            </CellWithInput>
                            <NameCell>{t(item.title)}</NameCell>
                        </Row>
                    ))}
                </Table>
                <NextButton
                    goNext={() => {
                        try {
                            posthog.capture("click_next_confirm_agreements", {});
                        } catch (err) {}
                        goNextHandler();
                    }}
                    nextTitle={nextTitle}
                    disabled={!enabledButton}
                />
            </div>
        </Fade>
    );
};

export default ConfirmYourAgreements;

const Table = styled.div`
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 45px;
`;
const Row = styled.div`
    display: flex;
`;
const Cell = styled.div`
    padding: 17px 0;
    padding-right: 10px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;
    background: #fff;
`;

const NameCell = styled(Cell)`
    min-width: 160px;
    width: 100%;
`;

const CellWithInput = styled(Cell)`
    padding-right: 20px;
`;
