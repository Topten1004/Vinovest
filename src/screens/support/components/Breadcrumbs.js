import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import styled from "styled-components";

const Breadcrumbs = ({ breadcrumbs = [] }) => (
    <Wrapper>
        {breadcrumbs.map(({ link, name }, i) => (
            <React.Fragment key={link}>
                <BreadcrumbsLink to={link}>{name}</BreadcrumbsLink>{" "}
                {breadcrumbs.length && i + 1 < breadcrumbs.length ? <div className="slash">/</div> : ""}
            </React.Fragment>
        ))}
    </Wrapper>
);

const BreadcrumbsLink = styled(Link)`
    color: ${(p) => (p.to === "/help" ? "#A86D37" : "#242e35")};
    font-size: 14px;
    line-height: 18px;
    text-decoration: none;
    text-transform: uppercase;
    font-family: Favoritmonostd, sans-serif;
    font-weight: 500;
    display: block;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .slash {
        margin: 0 7px;
        height: fit-content;
        ${BreadcrumbsLink};
    }

    img {
        margin-right: 7px;
    }
`;

export default Breadcrumbs;
