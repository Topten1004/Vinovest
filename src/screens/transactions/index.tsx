import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useOktaAuth } from "@okta/okta-react";
import { toJS } from "mobx";
import { useMobile, useRootStore } from "#shared/hooks";
import useIntersect from "#shared/hooks/useIntersect";
import { Fade } from "#shared/ui";
import TransactionsSection from "./transactions-section";
import { TransactionsContext } from "./transactionsContext";
import { DetailsOfTransaction, ModalWrapper } from "./details-of-transaction";
import useStatements from "../documents/statements/useStatements";

const TransactionsPage = observer(() => {
    const s = useRootStore();
    const [setNode, entry] = useIntersect({});
    const [detailsId, setDetailsId] = useState(null);
    const isMobile = useMobile(1024);
    const didMounted = React.useRef(false);
    const currencyCode = s.user.userCurrency;
    const { oktaAuth } = useOktaAuth();
    const providerData = { detailsId, setDetailsId };
    const initPageSize = 10;
    const { wineCertificateList } = useStatements({ initPageSize });

    useEffect(() => {
        const fetchCertificates = async () => {
            await s.user.requestUserDetailsFromOkta(oktaAuth);
            s.documents.fetchWineCertificates({ type: "", range: "" });
        };
        fetchCertificates();
    }, [oktaAuth, s.documents, s.user]);

    useEffect(() => {
        if (s.auth.isAuthenticated && s.user.oktaUserInfo && s.user.oktaUserInfo.sub) {
            if (entry.intersectionRatio && s.transfer.deposits.nextPageToken) {
                s.transfer.fetchDeposits({}, true, currencyCode);
            }
            if (entry.intersectionRatio && s.documents.wineCertificates.nextPageToken) {
                s.documents.fetchWineCertificates({}, true);
            }
        }
    }, [
        s.auth.isAuthenticated,
        s.documents,
        s.transfer,
        s.transfer.deposits.fees.length,
        s.user.oktaUserInfo,
        s.user.oktaUserInfo.sub,
        entry.intersectionRatio,
        currencyCode,
    ]);

    return (
        <Fade in>
            <TransactionsPageContainer>
                <TransactionsPageInnerContainer>
                    <TransactionsContext.Provider value={providerData}>
                        <TransactionsListContainer className={detailsId && !isMobile ? "narrow" : ""}>
                            <TransactionsSection />
                        </TransactionsListContainer>
                        <TransactionsDetailsContainer className={detailsId && !isMobile ? "open" : ""}>
                            <DetailsOfTransaction detailsId={detailsId} wineCertificateList={wineCertificateList} />
                        </TransactionsDetailsContainer>
                    </TransactionsContext.Provider>
                </TransactionsPageInnerContainer>
                <div ref={setNode} />
                {detailsId && isMobile && (
                    <ModalWrapper onClose={() => setDetailsId(null)}>
                        <TransactionsDetailsContainerModal>
                            <DetailsOfTransaction detailsId={detailsId} wineCertificateList={wineCertificateList} />
                        </TransactionsDetailsContainerModal>
                    </ModalWrapper>
                )}
            </TransactionsPageContainer>
        </Fade>
    );
});
export default TransactionsPage;

const TransactionsPageContainer = styled.div`
    width: 100%;
    max-width: 1260px;
    padding: 0;
    margin: 0 auto;
`;

const TransactionsPageInnerContainer = styled.div`
    margin: 58px 10px 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
`;

const box = `
    background: #ffffff;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const TransactionsListContainer = styled.div`
    ${box};
    width: 100%;
    transition: width 0.3s;
    padding: 48px 25px 138px;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 56px 0 58px;
    }

    @media screen and (max-width: 767px) {
        padding: 33px 0 58px;
    }

    &.narrow {
        width: 64.5%;
    }
`;

const TransactionsDetailsContainerModal = styled.div`
    ${box};
    max-width: 400px;
    padding: 11px;
    width: 100%;
    min-height: 400px;
    height: fit-content;
`;

const TransactionsDetailsContainer = styled.div`
    width: 0%;
    overflow: hidden;
    transition: width 0.3s;

    &.open {
        position: sticky;
        top: 100px;
        ${box};
        width: 32.25%;
        overflow: auto;
        transition: width 0.3s;
        min-height: 400px;
        height: fit-content;
    }
`;
