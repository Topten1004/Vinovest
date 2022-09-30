import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";
import { useOktaAuth } from "@okta/okta-react";
import { useRootStore } from "#shared/hooks";
import { data } from "./data";
import { NavWrapper, NavigationColumnsWrapper, BasicDataWrapper, BottomWrapper } from "./styled";
import NavigationColumn from "./NavigationColumn";
import Social from "./Social";
import LocalSettingSelector from "../LocalSettingSelector";
import { currencyValueLabel } from "#localization/constants";

const NavigationColumns = observer(() => {
    const s = useRootStore();
    const { isAuthenticated } = s.auth;

    const nav = React.useMemo(() => data(isAuthenticated), [isAuthenticated]);

    return (
        <NavigationColumnsWrapper>
            {nav.map(({ title, navItems }) => (
                <NavigationColumn key={title} navItems={navItems} title={title} />
            ))}
        </NavigationColumnsWrapper>
    );
});

const Navigation = () => (
    <NavWrapper>
        <NavigationColumns />
        <Bottom />
    </NavWrapper>
);

const Bottom = () => {
    const s = useRootStore();
    const storedCurrency = currencyValueLabel.filter((currency) => currency.value === Cookies.get("localCurrency"));
    const defaultCurrency = Cookies.get("localCurrency") ? storedCurrency[0] : currencyValueLabel[0];
    const [openModal, setOpenModal] = useState(false);
    const [currency, setCurrency] = useState(defaultCurrency);
    const { isAuthenticated } = s.auth;
    const { oktaAuth } = useOktaAuth();

    const handleCurrencySelected = async (selected) => {
        setCurrency(selected);
        const newCurrency = selected.value;
        Cookies.set("localCurrency", newCurrency, { expires: 7 });
        setOpenModal(!openModal);
        s.user.setUserCurrency(newCurrency);
        await Promise.all([s.cellar.currencyReset(), s.transfer.resetState()]);
        await s.user.requestUserDetailsFromOkta(oktaAuth);

        Promise.all([
            s.cellar.fetchCellarWines(newCurrency),
            s.cellar.fetchPortfolioTotals("6m", newCurrency),
            s.transfer.fetchDeposits({ type: "", range: "" }, false, newCurrency),
            s.transfer.fetchPendingTransfers(newCurrency),
            s.transfer.fetchBidsActive(),
        ]);
    };

    return (
        <BottomWrapper>
            {isAuthenticated && (
                <>
                    <LocalSettingSelector
                        currency={currency}
                        currencyOptions={currencyValueLabel}
                        isOpen={openModal}
                        onClose={handleCurrencySelected}
                        onCancel={() => setOpenModal(!openModal)}
                    />

                    <BasicDataWrapper onClick={() => setOpenModal(!openModal)}>
                        <span>{currency.label}</span>
                    </BasicDataWrapper>
                </>
            )}
            <Social />
        </BottomWrapper>
    );
};

export default Navigation;
