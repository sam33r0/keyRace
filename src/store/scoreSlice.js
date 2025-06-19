import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accuracy: 0,
    mistypes: 0,
    wpmMeter: {},
    averageWpn: 0
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        updateAccuracy: (state, action) => {
            state.accuracy = action.payload.accuracy;
        },
        updateScore: (state, action) => {
            state.accuracy = action.payload.accuracy;
            state.mistypes = action.payload.mistypes;
            state.wpmMeter = action.payload.wpmMeter;
        },
        updateMistypes: (state, action) => {
            state.mistypes = action.payload.mistypes;
        },
        updateWpmMeter: (state, action) => {
            state.wpmMeter = action.payload.wpmMeter;
        },
        updateAverageWpm: (state) => {
            const wpmMeterKeys = Object.keys(state.wpmMeter)
            const averageWpn = Math.round(wpmMeterKeys.reduce((prev, elem) => {
                return prev += state.wpmMeter[elem];
            }, 0) / wpmMeterKeys.length);
            state.averageWpn = averageWpn;
        },
        resetScore: (state) => {
            state = initialState;
        }
    }
})

export const {
    updateAccuracy,
    updateMistypes,
    updateScore,
    updateWpmMeter,
    updateAverageWpm,
    resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;