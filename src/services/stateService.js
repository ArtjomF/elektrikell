import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    hourValue: 1,
    currentPrice: 0,
    selectedCountry: {
        key: 'ee', title: 'Eesti',
    },
    bestTimeRange: {
        from: 0,
        until: 0,
        timestamp: null,
        bestPrice: 0,

    },
    worstTimeRange: {
        from: 0,
        until: 0,
        worstPrice: 0,
    }
};

export const setHourValue = createAction("setHourValue");
export const setcurrentPrice = createAction("setcurrentPrice");
export const setSelectedCountry = createAction("setSelectedCountry");
export const setBestTimeRange = createAction("setBestTimeRange");
export const setWorstTimeRange = createAction("setWorstTimeRange");

const reducer = createReducer(initialState, {
    [setHourValue]: (state, action) => {
        state.hourValue = action.payload;
    },
    [setcurrentPrice]: (state, action) => {
        state.currentPrice = action.payload;
    },
    [setSelectedCountry]: (state, action) => {
        state.selectedCountry = action.payload;
    },
    [setBestTimeRange]: (state, action) => {
        state.bestTimeRange = action.payload;
    },
    [setWorstTimeRange]: (state, action) => {
        state.worstTimeRange = action.payload;
    },
});

export const store = configureStore({ reducer });