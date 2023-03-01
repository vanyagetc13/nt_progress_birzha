import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

describe("S", () => {
    it("renders learn react link", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
		expect(screen.getByText(/Торговый терминал/)).toBeInTheDocument()
    });
});
