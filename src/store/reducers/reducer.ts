import { Action } from "@reduxjs/toolkit";

const initialState = {};

export default function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case "test":
            return state;
        default:
            return state;
    }
}
