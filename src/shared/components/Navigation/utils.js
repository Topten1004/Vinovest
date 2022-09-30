import { routeMapping } from "#localization/constants";

export const chooseClassName = ({ authenticated, isMobile, pathname, isSticky }) => {
    let classNameHeader = "";
    let logoType = "standard";

    if (!authenticated && ["/home", "/"].includes(pathname)) {
        classNameHeader = isMobile ? "light" : "transparent";
        if (!isSticky && !isMobile) logoType = "light";
    }

    if (["/home"].includes(pathname)) {
        classNameHeader = isMobile ? "light" : "transparent";
        if (!isSticky && !isMobile) logoType = "light";
    }

    if (["/about-us"].includes(pathname)) {
        classNameHeader = "light";
    }

    if (pathname.includes("/how-it-works")) {
        logoType = "standard";
    }

    if (pathname.includes("/sustainability")) {
        classNameHeader = "blue";
        logoType = "green";
    }

    if (["/vinovest-100-index", "/why-wine", "/advisors", "/wine-futures"].includes(pathname)) {
        classNameHeader = "darkBlue";
        logoType = "light";
    }

    return { classNameHeader, logoType };
};

// const makeConditionalString = `((\\/${Object.values(routeMapping).filter(Boolean).join("|")})\\/)?`;
const paths = ["/login", "/reset_password", "/signup", "/implicit/callback"];

export const hideForLogin = (pathname, authenticated = false) => {
    const hidePaths = authenticated ? paths.concat(["/"]) : paths;
    const unauthenticatedPaths = new RegExp(`^(${paths.join("|")})$`);
    const authenticatedPaths = /^\/$/; 
    return unauthenticatedPaths.test(pathname)  || (authenticatedPaths.test(pathname) &&  authenticated)
    // return new RegExp(`^(${hidePaths.join("|")})$`).test(pathname);
};


export const ACCOUNT_LINK = {
    to: "/account",
    label: "Account",
    exact: true,
    isActive: (_, location) => location.pathname === "/account",
};
