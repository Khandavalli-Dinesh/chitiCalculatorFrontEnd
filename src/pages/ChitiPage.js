import AvailableChitis from "../Components/Chiti/AvailableChitis";
import { getAllChitis, getAllChitisByCandidate } from "../store/chiti-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingSpinner from '../Components/UI/LoadingSpinner/LoadingSpinner';


const ChitiPage = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.loading.isLoading);
  const chitis = useSelector((state) => state.chiti.chitis);
  const activeUser = useSelector((state)=> state.users.activeUser);
  
  useEffect(() => {
    if(activeUser.role){
      if(activeUser.role === 'ADMIN'){
        dispatch(getAllChitis());
      }else{
        dispatch(getAllChitisByCandidate(activeUser.candidateId.id));
      }
    }
  }, [dispatch, activeUser]);

  if(isLoading){
    return (
      <div className="d-flex justify-content-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="d-flex justify-content-center ">
      {chitis.length !== 0 && <AvailableChitis items={chitis} />}
      {chitis.length === 0 && <h2>No chitis to display</h2>}
    </div>
  );
};

export default ChitiPage;
