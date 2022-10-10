import {createSlice} from '@reduxjs/toolkit';

const monthSlice = createSlice({
    name:'month',
    initialState: {
        months: []
    },
    reducers: {
        replaceMonths(state,action){
            state.months = action.payload;
        },
        addMonth(state,action){
            state.months.push(action.payload);
        },
        updateMonth(state, action){
            const updatedMonth = action.payload;
            state.months = state.months.filter((month)=>month.id !== updatedMonth.id);
            state.months.push(updatedMonth);
        },
        removeMonth(state,action){
            const removingMonth = action.payload;
            state.months = state.months.filter((month)=>month.id !== removingMonth.id);
        }
    }
});

export const monthActions = monthSlice.actions;
export default monthSlice.reducer;