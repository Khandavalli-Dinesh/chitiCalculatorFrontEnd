import candidateReducer from './candidate-slice';
import chitiReducer from './chiti-slice';
import monthReducer from './month-slice';
import userReducer from './user-slice';
import loadingReducer from './loading-slice';
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        candidate: candidateReducer,
        chiti: chitiReducer,
        month: monthReducer,
        users: userReducer,
        loading: loadingReducer
    }
});

export default store;