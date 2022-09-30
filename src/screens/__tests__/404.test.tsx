import React from "react";
import { render } from "@testing-library/react";
import NotFoundScreen from "../404/NotFoundScreen";
import { withContexts } from "#shared/testing/wrappers";
import { title as t_title, subtitle as t_subtitle, back_link } from "#translations/en/404.json";

describe("NotFoundScreen component", () => {
    let component;
    beforeAll(() => {
        const { component: Comp } = withContexts(NotFoundScreen);
        component = Comp;
    });
    it("should properly render the default value state", () => {
        const { baseElement, getByTestId } = render(component());
        const title = getByTestId("title");
        const subtitle = getByTestId("subtitle");
        const link = getByTestId("back");

        expect(baseElement).toMatchSnapshot();
        expect(title.textContent).toEqual(t_title);
        expect(subtitle.textContent).toEqual(t_subtitle);
        expect(link.textContent).toEqual(back_link);
    });
});
