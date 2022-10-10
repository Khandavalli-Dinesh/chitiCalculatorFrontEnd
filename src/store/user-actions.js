import { userActions } from "./user-slice";
import { loadingActions } from "./loading-slice";
import { url } from "./base-url";

export const logIn = (data) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(`${url}logIn`, {
        method: "POST",
        headers: {
          "content-type": "application/json; charset= utf-8",
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      return responseData;
    };

    try {
      dispatch(loadingActions.changeState(true));
      const logInUser = await sendData();
      dispatch(userActions.stateUser(logInUser));
      dispatch(loadingActions.changeState(false));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logOut = ()=>{
  return async (dispatch)=>{
    const sendRequest = async()=>{
      const response = await fetch(`${url}logOut`);
      
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      return responseData;
    }

    try{
      const response = await sendRequest();
      dispatch(userActions.stateUser(response));
    }catch(error){
      console.log(error.message);
    }
  }
}

export const addUser = (data) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(`${url}user`, {
        method: "POST",
        headers: {
          "content-type": "application/json; charset= utf-8",
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      return responseData;
    };

    try {
      const newUser = await sendData();
      dispatch(userActions.addUser(newUser));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(`${url}user`, {
        method: "PUT",
        headers: {
          "content-type": "application/json; charset= utf-8",
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      return responseData;
    };

    try {
      const updatedUser = await sendData();
      dispatch(userActions.updateUser(updatedUser));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteUser = (id)=>{
  return async (dispatch)=>{
    const sendRequest = async()=>{
      const response = await fetch(`${url}user/${id}`,{
        method: 'DELETE'
      });
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      return responseData;
    }

    try{
      const deletedUser = await sendRequest();
      dispatch(userActions.deleteUser(deletedUser));
    }catch(error){
      console.log(error.message);
    }
  }
}

export const getAllUsers = ()=>{
  return async (dispatch)=>{
    const sendRequest = async()=>{
      const response = await fetch(`${url}users`);
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      return responseData;
    }

    try{
      dispatch(loadingActions.changeState(true));
      const response = await sendRequest();
      dispatch(userActions.getAllUsers(response));
      dispatch(loadingActions.changeState(false));
    }catch(error){
      console.log(error.message);
    }
  }
}

export const getUser = (id)=>{
  return async (dispatch)=>{
    const sendRequest = async()=>{
      const response = await fetch(`${url}user/${id}`);
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      return responseData;
    }

    try{
      const response = await sendRequest();
      dispatch(userActions.getUser(response));
    }catch(error){
      console.log(error.message);
    }
  }
}

export const isLoggedIn = ()=>{
  return async (dispatch)=>{
    const sendRequest = async ()=>{
      const response = await fetch(`${url}loginStatus`);
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      return responseData;
    }

    try{
      const response = await sendRequest();
      dispatch(userActions.prevLoggedIn(response));
      return response;
    }catch(error){
      console.log(error.message);
    }
  }
}