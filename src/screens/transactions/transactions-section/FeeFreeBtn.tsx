import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useRootStore } from "#shared/hooks";
import feeFreeSvg from "#assets/shared/feeFree.svg";

interface FeeFreeBtnProps {
    withAnimation?: string;
    maxWidth: string;
    empty: boolean;
}

const FeeFreeBtn = observer(({ withAnimation, maxWidth, empty }: FeeFreeBtnProps) => {
    const { t } = useTranslation(["transactions"]);
    const s = useRootStore();
    return (
        <GetFeeFreeBtn
            disabled={empty}
            className={withAnimation ? "withAnimation" : ""}
            maxWidth={maxWidth}
            onClick={s.referral.toggleReferralInviteModalWindowOpen}
        >
            {!empty && (
                <>
                    <span>{t("buttons.fee_free")} </span> <img src={feeFreeSvg} alt="fee free icon" />
                </>
            )}
        </GetFeeFreeBtn>
    );
});

const GetFeeFreeBtn = styled.button`
    padding: 11px 0;
    max-width: ${({ maxWidth }) => maxWidth || "334px"};
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #242e35;
    outline: 0;
    border: 0;
    padding: 5px;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #fae8d1;
    transition: 0.3s;

    img {
        margin-left: 10px;
    }

    span {
        display: block;
        margin-bottom: -2.5px;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }

    &.withAnimation {
        animation: GetFeeFreeBtnAnimation 300ms;

        @media screen and (min-width: 1024px) {
            position: absolute;
            right: 25px;

            @keyframes GetFeeFreeBtnAnimation {
                0% {
                    opacity: 0;
                }
                99% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        }
    }
`;

export default FeeFreeBtn;
