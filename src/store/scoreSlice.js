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
            const wpmMeterKeys = Object.keys(action.payload.wpmMeter)
            // console.log(wpmMeterKeys, state.wpmMeter);
            const averageWpn = wpmMeterKeys.reduce((prev, elem, i, arr) => {
                return prev += action.payload.wpmMeter[elem];
            }, 0) / wpmMeterKeys.length;
            // console.log(averageWpn);
            state.averageWpn = averageWpn;

        },
        updateMistypes: (state, action) => {
            state.mistypes = action.payload.mistypes;
        },
        updateWpmMeter: (state, action) => {
            state.wpmMeter = action.payload.wpmMeter;  
            const wpmMeterKeys = Object.keys(action.payload.wpmMeter)
            // console.log(wpmMeterKeys, state.wpmMeter);
            const averageWpn = wpmMeterKeys.reduce((prev, elem, i, arr) => {
                return prev += action.payload.wpmMeter[elem];
            }, 0) / wpmMeterKeys.length;
            // console.log(averageWpn);
            state.averageWpn = averageWpn;
        }
    }
})

export const {
    updateAccuracy,
    updateMistypes,
    updateScore,
    updateWpmMeter } = scoreSlice.actions;

export default scoreSlice.reducer;