import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ScreenSpinner from "#shared/components/ScreenSpinner";
import { Fade } from "#shared/ui";
import SupportMainWrapper from "./SupportMainWrapper";
import { ROUTE_PATHS } from "../../route-paths";
import useFetchSupportData from "../hooks/useFetchSupportData";

const SupportCategoryWrapper = observer(({ children }) => {
    const { supportCategories, isSupportCategoriesFirstRenderPending } = useFetchSupportData();

    if (isSupportCategoriesFirstRenderPending) return <ScreenSpinner loading />;

    return (
        <Fade in>
            <SupportMainWrapper>
                <Wrapper>
                    <RightList>
                        {supportCategories.map(({ supportCategoryName = "", slugSupport }) => (
                            <Link key={supportCategoryName} to={`${ROUTE_PATHS.helpCategory}/${slugSupport}`}>
                                {supportCategoryName}
                            </Link>
                        ))}
                    </RightList>
                    <div>{children}</div>
                </Wrapper>
            </SupportMainWrapper>
        </Fade>
    );
});

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;

    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 100px;
    grid-row-gap: 16px;
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: auto;

    @media screen and (max-width: 991px) {
        display: block;
    }
`;

const RightList = styled.div`
    @media screen and (max-width: 991px) {
        display: none;
    }

    a {
        display: block;
        margin-bottom: 30px;
        color: inherit;
        text-decoration: none;
        font-family: Favoritmonostd, sans-serif;
        font-size: 14px;
        line-height: 32px;
        text-transform: uppercase;
    }
`;

export default SupportCategoryWrapper;
