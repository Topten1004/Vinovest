import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { DepositButton } from "#shared/components/Deposit";
import balloonEnvelopeSvg from "#assets/shared/balloon-envelope.svg";
import { ModalBase } from "./ModalBase";

const t = {
    title: "You've Been Invited!",
    description:
        "When you deposit now, your 3 months of free wine storage + management will be applied as soon as your transfer clears!",
    buttonCTA: "Deposit And Claim Your Reward",
};

export const PendingReferralInviteModal = ({ showPendingInviteModal }) => {
    const [isOpen, setOpenState] = useState(false);

    useEffect(() => {
        if (showPendingInviteModal) {
            setOpenState(true);
        }
    }, [showPendingInviteModal]);

    const onCloseModal = useCallback(() => {
        setOpenState(false);
    }, []);

    const onCloseModalAndOpenDeposit = useCallback(() => {
        onCloseModal();
        document.getElementById("nav-deposit-button").click();
    }, [onCloseModal]);

    if (!isOpen) {
        return null;
    }
    return (
        <ModalBase isOpen={isOpen} onClose={onCloseModal}>
            <DialogContainer>
                <Title>{t.title}</Title>
                <Image src={balloonEnvelopeSvg} />
                <Description>{t.description}</Description>

                <DepositButton onClick={onCloseModalAndOpenDeposit}>{t.buttonCTA}</DepositButton>
            </DialogContainer>
        </ModalBase>
    );
};

const DialogContainer = styled.div`
    width: 100%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 36px;

    background: ${(p) => p.theme.colors.white};
`;

const Title = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-size: 29px;
    line-height: 36px;
    margin-bottom: 36px;
`;

const Image = styled.img`
    margin-bottom: 36px;
`;

const Description = styled.div`
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 36px;
`;
