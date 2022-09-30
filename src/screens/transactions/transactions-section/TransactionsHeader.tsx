import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Dropdown } from "#shared/ui";
import DropdownMobile from "#shared/ui/Dropdown/DropdownMobile";
import { useMobile, useRootStore } from "#shared/hooks";
import { TransactionTypes } from "#utils/constants";
import DropDownContainer from "#shared/ui/Dropdown/styled/DropDownContainer";
import GetFeeFreeBtn from "./FeeFreeBtn";
import { TransactionsContext } from "../transactionsContext";

interface TransactionsHeaderProps {
    depositsPending: boolean;
}

const TransactionsHeader = observer(({ depositsPending }: TransactionsHeaderProps) => {
    const { t } = useTranslation(["transactions"]);

    const typeOptions = [
        { label: t("transactions-header.all_transactions"), value: "" },
        { label: t("transactions-header.buy"), value: TransactionTypes.wine_purchase },
        { label: t("transactions-header.sell"), value: TransactionTypes.wine_sold },
        { label: t("transactions-header.deposit"), value: TransactionTypes.funds_added },
        { label: t("transactions-header.withdraw"), value: TransactionTypes.funds_withdrew },
        { label: t("transactions-header.fee"), value: TransactionTypes.vinovest_monthly_fee },
    ];

    const rangeOptions = [
        { label: t("transactions-header.all_time"), value: "" },
        { label: t("transactions-header.month"), value: "month" },
        { label: t("transactions-header.last_month"), value: "last_month" },
        { label: t("transactions-header.last_90"), value: "last_90" },
        { label: t("transactions-header.current_year"), value: "current_year" },
        { label: t("transactions-header.previous_year"), value: "previous_year" },
    ];

    const s = useRootStore();
    const { range, type } = s.transfer.deposits;

    const { detailsId, setDetailsId } = React.useContext(TransactionsContext);
    const isMounted = React.useRef(null);
    const isMobile = useMobile(767);
    const isTablet = useMobile(1024);

    const resetSideMenu = () => {
        if (s.transfer.deposits.fees.some(({ id }) => id === detailsId)) {
            setDetailsId(null);
        }
    };

    const onFilterByTypeHandler = (option: { value: any }) => {
        resetSideMenu();
        s.transfer.fetchDeposits({ pageToken: 0, type: option.value, range });
    };

    const onFilterByDateHandler = (option: { value: any }) => {
        resetSideMenu();
        s.transfer.fetchDeposits({ pageToken: 0, type, range: option.value });
    };

    const currentRangeOption = rangeOptions.find(({ value }) => value === range);
    const currentTypeOption = typeOptions.find(({ value }) => value === type);
    useEffect(() => {
        isMounted.current = true;
    }, []);

    return (
        <HeadContainer>
            {!isMobile && (
                <>
                    {depositsPending ? (
                        <Skeleton
                            style={{
                                height: "40px",
                                width: "240px",
                                display: "block",
                                marginRight: "34px",
                            }}
                        />
                    ) : (
                        <DropDownContainer desktopWidth="240px">
                            <Dropdown
                                options={typeOptions}
                                selectedInParent={type}
                                selectedLabel={currentTypeOption.label}
                                onChange={onFilterByTypeHandler}
                                selectedBackground="#EEF2F7"
                            />
                        </DropDownContainer>
                    )}
                    <div className="TransactionsDropDownWide">
                        {depositsPending ? (
                            <Skeleton
                                style={{
                                    height: "40px",
                                    width: "173px",
                                    display: "block",
                                }}
                            />
                        ) : (
                            <DropDownContainer desktopWidth="173px">
                                <Dropdown
                                    options={rangeOptions}
                                    selectedInParent={range}
                                    selectedLabel={currentRangeOption.label}
                                    onChange={onFilterByDateHandler}
                                    selectedBackground="#EEF2F7"
                                />
                            </DropDownContainer>
                        )}
                    </div>
                </>
            )}

            {isMobile && (
                <>
                    {depositsPending ? (
                        <MobileSkeletonWrapper>
                            <Skeleton
                                style={{
                                    position: "static",
                                    height: "39px",
                                    width: "100%",
                                    display: "block",
                                }}
                            />
                        </MobileSkeletonWrapper>
                    ) : (
                        <DropdownMobileWrapper>
                            <DropdownMobile
                                options={typeOptions}
                                selected={type}
                                selectedLabel={currentTypeOption.label}
                                onChange={onFilterByTypeHandler}
                            />
                        </DropdownMobileWrapper>
                    )}
                    {depositsPending ? (
                        <MobileSkeletonWrapper>
                            <Skeleton
                                style={{
                                    position: "static",
                                    height: "39px",
                                    width: "100%",
                                    display: "block",
                                }}
                            />
                        </MobileSkeletonWrapper>
                    ) : (
                        <DropdownMobileWrapper>
                            <DropdownMobile
                                options={rangeOptions}
                                selected={range}
                                selectedLabel={currentRangeOption.label}
                                onChange={onFilterByDateHandler}
                            />
                        </DropdownMobileWrapper>
                    )}
                </>
            )}

            {(!detailsId || isMobile) && (!isTablet || isMobile) && (
                <GetFeeFreeBtn
                    withAnimation={isMounted.current ? "withAnimation" : ""}
                    maxWidth={isMobile ? "100%" : "334px"}
                    empty={depositsPending}
                />
            )}
        </HeadContainer>
    );
});

const filtersPadding = "padding: 11px 0;";

const HeadContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    padding: 0 25px;
    position: relative;
    z-index: 1;

    .TransactionsDropDownWide {
        flex-grow: 1;
    }

    ${DropDownContainer} {
        ${filtersPadding};
        margin: 0 30px 0 0 !important;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 0 30px;
        margin-bottom: 0;
    }

    @media screen and (max-width: 767px) {
        margin: 14px 0 0;
        margin-top: 30px;
        padding: 0 20px;
    }
`;

const DropdownMobileWrapper = styled.div`
    width: 100%;
    padding: 0 0 30px;
`;

const MobileSkeletonWrapper = styled.div`
    width: 100%;
    height: 39px;
    margin: 0 0 30px;
`;

export default TransactionsHeader;
