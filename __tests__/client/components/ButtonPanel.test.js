import React from "react";
import { Provider } from "react-redux";
import { render, configure, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import ButtonPanel from "../../../client/components/ButtonPanel/components/ButtonPanel";
import * as selectors from "../../../client/components/ButtonPanel/selectors";

jest.mock("../../../client/components/ButtonPanel/selectors");
const middlewares = [];
const mockStore = configureMockStore(middlewares);

configure({ testIdAttribute: "data-test-component" });

function setup() {
    const initialState = {};
    const store = mockStore(initialState);
    const { getByTestId, queryAllByTestId } = render(
        <Provider store={store}>
            <ButtonPanel />
        </Provider>
    );

    return {
        getByTestId,
        queryAllByTestId
    };
}

describe("ButtonPanel conditional rendering", () => {
    it('should render if authorized', () => {
        selectors.isAuthorized.mockReturnValue(true);
        const { queryAllByTestId } = setup();

        const ButtonPanelDiv = queryAllByTestId("ButtonPanel");
        expect(ButtonPanelDiv).toHaveLength(1);
    });

    it('should not render if not authorized', () => {
        selectors.isAuthorized.mockReturnValue(false);
        const { queryAllByTestId } = setup();

        const ButtonPanelDiv = queryAllByTestId("ButtonPanel");
        expect(ButtonPanelDiv).toHaveLength(0);
    });
});