import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
    name: "candidate",
    initialState: {
        candidates: []
    },
    reducers: {
        replaceCandidates(state,action){
            state.candidates = action.payload;
        },
        addCandidate(state, action){
            const newCandidate = action.payload;
            state.candidates.push({
                id: newCandidate.id,
                name: newCandidate.name,
                phoneNumber: newCandidate.phoneNumber
            })
        },
        removeCandidate(state, action){
            const id = action.payload.id;
            state.candidates = state.candidates.filter((item)=> item.id !== id);
        }
    },
});

export const candidateActions  = candidateSlice.actions;
export default candidateSlice.reducer;