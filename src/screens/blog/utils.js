import i18n from "i18next";
import { parseISO, differenceInYears, differenceInMonths } from "date-fns";
import { formatDatePP } from "#utils/shared";

export const showDateAgo = (date, full) => {
    const yearsAgo = differenceInYears(new Date(), parseISO(date));
    const monthsAgo = differenceInMonths(new Date(), parseISO(date));

    if (yearsAgo > 0 && !full) {
        return `${yearsAgo} ${yearsAgo > 1 ? i18n.t("blog:years") : i18n.t("blog:year")} ago`;
    }

    if (monthsAgo > 0 && !full) {
        return `${monthsAgo} ${monthsAgo > 1 ? i18n.t("blog:months") : i18n.t("blog:month")}} ago`;
    }

    return formatDatePP(date);
};

export const getAnchors = function getFlat(sections) {
    const anchorsList = [];

    try {
        // eslint-disable-next-line no-inner-declarations
        function recursion({ nodeType, content, value, marks, parentNodeType }) {
            let typeOfParent = parentNodeType;

            if (!typeOfParent || typeOfParent === "document") {
                typeOfParent = nodeType;
            }

            if (
                nodeType === "text" &&
                marks &&
                marks.some(({ type }) => type === "code" && value.startsWith("anchor:"))
            ) {
                anchorsList.push({ id: value, text: value.slice(7), parentNodeType: typeOfParent });
            } else if (content) {
                content.forEach((data) => recursion({ ...data, parentNodeType: typeOfParent }));
            }
        }

        sections.forEach((e) => recursion(e[1]));
    // eslint-disable-next-line no-empty
    } catch (err) {}

    return anchorsList;
};

export function makeProgressive(uri, options) {
    const widthAndHeight =
        (options && options.width && options.height && `&w=${options.width}&h=${options.height}`) || "";
    return `${uri}?fm=jpg&fl=progressive${widthAndHeight}`;
}