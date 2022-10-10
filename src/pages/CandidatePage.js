import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvailableCandidates from "../Components/Candidate/AvailableCandidates";
import NewCandidate from '../Components/Candidate/NewCandidate';
import { fetchCandidates } from "../store/candidate-actions"

const CandidatePage = ()=>{
    const dispatch = useDispatch();
    const candidates = useSelector((state)=> state.candidate.candidates);

    useEffect(()=>{
        dispatch(fetchCandidates());
    },[dispatch]);

    return(
        <>
        <div className="d-flex justify-content-end ">
            <NewCandidate />
        </div>
        <div className="d-flex justify-content-center ">
            {candidates.length >  0 && <AvailableCandidates candidates={candidates}/>}
            {candidates.length === 0 && <p>No candidates to display</p>}
        </div>
        </>
    );

}

export default CandidatePage;