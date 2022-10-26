import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    hourValue: 1,
    currentprice: 0,
    radioValue: 'low',
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
    },
};

export const setHourValue = createAction("setHourValue");
export const setcurrentPrice = createAction("setcurrentPrice");
export const setRadioValue = createAction('setRadioValue');
export const setSelectedCountry = createAction('setSelectedCountry');
export const setBestTimeRange = createAction('setBestTimeRange');
export const setWorstTimeRange = createAction('setWorstTimeRange');

const reducer = createReducer(initialState, {
    [setHourValue]: (state, action) => {
        state.hourValue = action.payload;
        console.log('setHourValue', state, action);
    },
    [setcurrentPrice]: (state, action) => {
        state.currentPrice = action.payload;
    },
    [setRadioValue]: (state, action) => {
        state.setRadioValue = action.payload;
    },
    [setSelectedCountry]: (state, action) => {
        state.setSelectedCountry = action.payload;
    },
    [setBestTimeRange]: (state, action) => {
        state.setBestTimeRange = action.payload;
    },
    [setWorstTimeRange]: (state, action) => {
        state.setWorstTimeRange = action.payload;
    },
});

export const store = configureStore({ reducer });