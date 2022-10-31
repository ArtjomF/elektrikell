//redux eto otdelnyj modul dlja upravlenija sostojanija prilozenija
// Eto globalnyj state prilozenija
// readux toolkit - vspomogatelnyj modul dlja raboty s Redux
// blogodorja Redux mozem lu4she kontrolirovat render componentov
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

// Kak i useState u Redux est initial state ili pervono4alnye zna4enija - oby4nyi objekt
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
 // creatAction - objavlenie sobytija kotoroe my budem ispolzovat dlja smeny Redux sostojanija/state
 // pohoze na setState React
export const setHourValue = createAction("setHourValue");
export const setcurrentPrice = createAction("setcurrentPrice");
export const setSelectedCountry = createAction("setSelectedCountry");
export const setBestTimeRange = createAction("setBestTimeRange");
export const setWorstTimeRange = createAction("setWorstTimeRange");

// Reduktor (reducer) - funkcija kotoraja ispolzuetsja dlja izmenenija/vy4eslenija sostojanija na osnove
// predyduwego initialState i preminjaemogo deistvija Action
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
// Store - storage - hranilwe v kotorom hranitsja vsja nasha informacija o globalnom sostojanii
export const store = configureStore({ reducer });