import { monthActions } from "./month-slice";
import { url } from './base-url';

export const fetchMonths = (id)=>{
    return async (dispatch)=>{
        const fetchData = async ()=>{
            const response = await fetch(`${url}chiti/months/${id}`);
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            return responseData;
        }

        try{
            const months = await fetchData();
            dispatch(monthActions.replaceMonths(months));
        }catch(error){
            console.log(error.message);
        }
    }
}

export const addMonth = (data)=>{
    return async (dispatch)=>{
        const sendData = async ()=>{
            const response = await fetch(`${url}month`,{
                method: "post",
                headers:{
                    'content-type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            return responseData;
        }

        try{
            const addedMonth = await sendData();
            dispatch(monthActions.addMonth(addedMonth));
        }catch(error){
            console.log(error.message);
        }
        
    }
}

export const updateMonth = (data)=>{
    return async (dispatch)=>{
        const sendData = async()=>{
            const response = await fetch(`${url}month`,{
                method: 'put',
                body: JSON.stringify(data),
                headers:{
                    'content-type': 'application/json; charset= utf-8'
                }
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            return responseData;
        };

        try{
            const updatedMonth = await sendData();
            dispatch(monthActions.updateMonth(updatedMonth));
        }catch(error){
            console.log(error.message);
        }
    }
}