import {candidateActions} from './candidate-slice';
import {url} from './base-url';

export const fetchCandidates = ()=>{
    return async (dispatch)=>{
        const fetchData = async ()=>{
            const response = await fetch(`${url}candidates`);
            if(!response.ok){
                throw new Error('Could not fetch candidates');
            }
            const responseData = await response.json();
            return responseData;
        };
        try{
            const candidatesData =await fetchData();
            dispatch(candidateActions.replaceCandidates(candidatesData));
        }catch(error){
            console.log(error.message);
        }
    }
}

export const addCandidate = (data)=>{
    return async (dispatch)=>{
        const sendData = async()=>{
            const response = await fetch(`${url}candidate`,{
                method:'POST',
                headers:{
                    'content-type': 'application/json; charset= utf-8'
                },
                body: JSON.stringify(data),
            });
            if(!response.ok){
                throw new Error('cannot add candidate');
            }
            const responseData = await response.json();
            return responseData;
        }
        try{
            const addedCandidate = await sendData();
            dispatch(candidateActions.addCandidate(addedCandidate));
        }catch(error){
            console.log(error.message);
        }
    }
}