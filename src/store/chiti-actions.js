import { chitiActions } from "./chiti-slice";
import { loadingActions } from "./loading-slice";
import { url } from './base-url';



export const getAllChitis =  ()=>{
    const fetchData = async ()=>{
        const response  =await fetch(`${url}chitis`);
        if(!response.ok){
            throw new Error(response.message);
        }
        const responseData = await response.json();
        return responseData;
    }
    return async (dispatch)=>{
        try{
            dispatch(loadingActions.changeState(true));
            const chitisData = await fetchData();
            dispatch(chitiActions.replaceChitis(chitisData || []));
            dispatch(loadingActions.changeState(false));
        }catch(error){
            console.log(error.message);
        }
    }
}

export const getAllChitisByCandidate =  (id)=>{
    const fetchData = async ()=>{
        const response  =await fetch(`${url}chitis/candidate/${id}`);
        if(!response.ok){
            throw new Error(response.message);
        }
        const responseData = await response.json();
        return responseData;
    }
    return async (dispatch)=>{
        

        try{
            dispatch(loadingActions.changeState(true));
            const chitisData = await fetchData();
            dispatch(chitiActions.replaceChitis(chitisData || []));
            dispatch(loadingActions.changeState(false));
        }catch(error){
            console.log(error.message);
        }
    }
}

export const addChiti = (data)=>{
    return async(dispatch)=>{
        const sendData = async()=>{
            const response = await fetch(`${url}chiti`,{
                method:'POST',
                headers:{
                    'content-type': 'application/json; charset= utf-8'
                },
                body: JSON.stringify(data),
            });
            if(!response.ok){
                throw new Error(response.message);
            }
            const responseData = await response.json();
            return responseData;
        }
        try{
            const newChiti = await sendData();
            dispatch(chitiActions.addChiti(newChiti));
        }catch(error){
            console.log(error.message);
        }
    }
}

export const deleteChiti = (id)=>{
    return async(dispatch)=>{
        const deleteRequest = async ()=>{
            const response = await fetch(`${url}chiti/${id}`,{
                method:'delete'
            });
            if(!response.ok){
                throw new Error(response.message);
            }
            const responseBody = await response.json();
            return responseBody;
        }
        try{
            const deletedChiti = await deleteRequest();
            dispatch(chitiActions.removeChiti(deletedChiti));
        }catch(error){
            console.log(error.message);
        }
    }
}

export const updateChiti = (data)=>{
    return async (dispatch)=>{
        const sendData = async ()=>{
            const response = await fetch(`${url}chiti`,{
                method: 'put',
                body: JSON.stringify(data),
                headers:{
                    'content-type': 'application/json; charset= utf-8'
                }
            });

            if(!response.ok){
                throw new Error(response.message);
            }

            const responseBody = response.json();
            return responseBody;
        }
        try{
            const updatedChiti = await sendData();
            dispatch(chitiActions.updateChiti(updatedChiti));
        }catch(error){
            console.log(error.message);
        }
    }
}