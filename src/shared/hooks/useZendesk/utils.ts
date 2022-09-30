const zendeskPagesMap = {
    "/account": 1,
    "/documents": 1,
    "/help": 1,
    "/contact-us": 1,
    "/portfolio": 1,
    "/transactions": 1,
}


const zendeskPagesMapAuthOnly = {
    '/': 1,
    ...zendeskPagesMap
}

export const isZendeskPage = (pathname: string, isAuthorized: boolean): boolean => {
    const isRoot = pathname.indexOf('/', 1) < 0;
    const rootPath = isRoot ? pathname : pathname.slice(0, pathname.indexOf('/', 1) + 1);
    return isAuthorized ? !!zendeskPagesMapAuthOnly[rootPath] : !!zendeskPagesMap[rootPath];
}

export const setZendeskSettings = () => {
    window.zESettings = {
        webWidget: {
            color: { theme: '#4f1c28' }
        }
    }
}