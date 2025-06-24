import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accuracy: 0,
    mistypes: 0,
    wpmMeter: {},
    averageWpm: 0,
    finalScore: 0
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
            const averageWpm = Math.round(wpmMeterKeys.reduce((prev, elem) => {
                return prev += state.wpmMeter[elem];
            }, 0) / wpmMeterKeys.length);
            state.averageWpm = averageWpm;
        },
        resetScore: (state) => {
            state = initialState;
        },
        finalScoring: (state, action) => {
            const opp = action.payload.opp;
            const par = action.payload.par;
            const dif = opp.filter((e, i, arr) => {
                return par[i] !== e;
            })
            state.finalScore = (((par.length - dif.length) / par.length) * 100).toFixed(2);
        }
    }
})

export const {
    updateAccuracy,
    updateMistypes,
    updateScore,
    updateWpmMeter,
    updateAverageWpm,
    resetScore,
    finalScoring } = scoreSlice.actions;

export default scoreSlice.reducer;