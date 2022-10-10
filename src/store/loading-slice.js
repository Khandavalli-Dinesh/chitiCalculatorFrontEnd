import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers:{
        changeState(state,action){
            state.isLoading = action.payload;
        }
    }
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;