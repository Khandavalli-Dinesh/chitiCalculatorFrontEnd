import { createSlice } from "@reduxjs/toolkit";

const chitiSlice = createSlice({
    name: "chiti", 
    initialState: {
        chitis: [],
        chiti: {}
    },
    reducers:{
        replaceChitis(state,action){
            state.chitis = action.payload;
        },
        addChiti(state,action){
            state.chitis.push(action.payload);
        },
        updateChiti(state,action){
            const updatedChiti = action.payload;
            state.chitis = state.chitis.filter((chiti)=> chiti.id !== updatedChiti.id);
            state.chitis.push(updatedChiti);
        },
        removeChiti(state,action){
            const id = action.payload.id;
            state.chitis = state.chitis.filter((chiti)=>chiti.id !== id);
        },
        selectedChtii(state,action){
            state.chiti = action.payload;
        }
    }
});

export const chitiActions = chitiSlice.actions;

export default chitiSlice.reducer;