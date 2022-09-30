import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "#shared/hooks";
import { checkHasToken } from "#utils/shared";
import { useCreateRoutingCallback } from "#shared/hooks";

const Vinovest = React.lazy(() => import("./vinovest-home"));

const Home = observer(() => {
    const store = useRootStore();
    const authenticated = React.useMemo(() => store.auth.isAuthenticated, [store]);
    const redirect = useCreateRoutingCallback("/portfolio", { refresh: true });

    React.useEffect(() => {
        const hasToken = checkHasToken();
        if (hasToken || authenticated) {
            return redirect();
        }
    }, [authenticated]);

    return <Vinovest />;
});

export default Home;
