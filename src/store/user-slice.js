import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isLoggedIn: false,
        message: '',
        user:{},
        users: [],
        activeUser: {},
        prevCheck: false
    },
    reducers:{
        stateUser(state,action){
            state.isLoggedIn= action.payload.loggedIn;
            state.message = action.payload.message;
            state.activeUser= action.payload.user;
            if(!action.payload.loggedIn){
                state.user = {};
                state.users = [];
                state.activeUser = {};
            }
        },
        addUser(state,action){
            state.message = "User added successfully";
            state.users.push(action.payload);
        },
        updateUser(state,action){
            const user = action.payload.user; 
            state.users = state.users.filter(existingUser => existingUser.id !== user.id);
            state.users.push(user);
            state.message = action.payload.message;
            if(state.activeUser.id === user.id){
                state.activeUser = state.user;
            }
        },
        deleteUser(state, action){
            const deleteId = action.payload.user.id;
            state.users = state.users.filter(user=> user.id !== deleteId);
            state.message = action.payload.message;
            state.isLoggedIn = action.payload.loggedIn;
        },
        getAllUsers(state,action){
            state.users = action.payload;
        },
        getUser(state,action){
            state.user = state.users.filter((user)=>user.id === action.payload.user.id)[0];
        },
        prevLoggedIn(state,action){
            state.prevCheck = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;