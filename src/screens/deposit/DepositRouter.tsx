import React from "react";
import { Route, Redirect } from "react-router-dom";
import { I18nSwitch } from "#localization/localizedRouter";
import { ROUTE_PATHS } from "#screens/route-paths";
import { AddFunds } from "./AddFunds";
import { ReviewTransfer } from "./ReviewTransfer";
import { SelectSource } from "./SelectSource";
import { WireTransferType } from "./WireTransferType";
import { EnterCreditCard } from "./EnterCreditCard";
import { DomesticWireTransfer } from "./DomesticWireTransfer";
import { InternationalWireTransfer } from "./InternationalWireTransfer";
import { MailACheck } from "./MailACheck";
import { Confirmation } from "./Confirmation";
import { Failed } from "./Failed";
import { WeChat } from "./PaymentSources/WeChat";
import { AliPayPaymentSource } from "./PaymentSources/AlipayPaymentSource";

interface DepositRouterProps {
    userCurrency: string;
    userRegion: string;
    isForiegnTransaction: boolean;
    portfolioCurrency: string;
}

export const DepositRouter = ({ userCurrency, isForiegnTransaction, userRegion, portfolioCurrency }: DepositRouterProps) => (
    <I18nSwitch>
        <Route
            path={`${ROUTE_PATHS.deposit}/add-funds`}
            render={(props) => <AddFunds {...props} userCurrency={userCurrency} />}
        />
        <Route
            path={`${ROUTE_PATHS.deposit}/select-source`}
            render={(props) => <SelectSource {...props} isForiegnTransaction={isForiegnTransaction} />}
        />
        <Route path={`${ROUTE_PATHS.deposit}/credit-card`} render={(props) => <EnterCreditCard {...props} userRegion={userRegion} />} />
        <Route
            path={`${ROUTE_PATHS.deposit}/wechat`}
            render={(props) => <WeChat {...props} isForiegnTransaction={isForiegnTransaction} userRegion={userRegion} />}
        />
        <Route path={`${ROUTE_PATHS.deposit}/wire-transfer-type`} render={(props) => <WireTransferType {...props} isForiegnTransaction={isForiegnTransaction} />} />
        <Route path={`${ROUTE_PATHS.deposit}/domestic-wire-transfer`} component={DomesticWireTransfer} />
        <Route path={`${ROUTE_PATHS.deposit}/international-wire-transfer`} component={InternationalWireTransfer} />
        <Route path={`${ROUTE_PATHS.deposit}/mail-a-check`} component={MailACheck} />
        <Route
            path={`${ROUTE_PATHS.deposit}/review-transfer`}
            render={(props) => <ReviewTransfer {...props} isForiegnTransaction={isForiegnTransaction} userRegion={userRegion} portfolioCurrency={portfolioCurrency} />}
        />
        <Route path={`${ROUTE_PATHS.deposit}/confirmation`} render={(props) => <Confirmation {...props} portfolioCurrency={portfolioCurrency} />} />
        <Route path={`${ROUTE_PATHS.deposit}/failed`} component={Failed} />
        <Route path={`${ROUTE_PATHS.deposit}/alipay`} render={(props) => <AliPayPaymentSource {...props} userRegion={userRegion} isForiegnTransaction={isForiegnTransaction} />} />
        <Redirect exact from="/deposit" to={`${ROUTE_PATHS.deposit}/add-funds`} />
        <Redirect to="/not-found" />
    </I18nSwitch>
);
