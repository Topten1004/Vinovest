import React from "react";
import styled from "styled-components";
import { Fade } from "#shared/ui";
import { InviteHero } from "./InviteHero";
import { RedemptionDisplay } from "./RedemptionDisplay";
import { ShareModule } from "./ShareModule";

const InvitePage = () => (
    <Fade in>
        <InvitePageBody>
            <InviteHero />
            <ManageContainer>
                <RedemptionDisplay />
                <ShareModule />
            </ManageContainer>
        </InvitePageBody>
    </Fade>
);
export default InvitePage;

export const InvitePageBody = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 48px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ManageContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    max-width: 1000px;
    margin-top: 20px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
    flex-direction: row;
    margin-top: 60px;
  `}
`;
