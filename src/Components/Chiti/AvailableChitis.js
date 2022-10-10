import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import AvailableItems from "../Items/AvailableItems";
import AvailableCandidates from "../Candidate/AvailableCandidates";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChiti } from "../../store/chiti-actions";

const AvailableChitis = (props) => {
  const dispatch = useDispatch();
  const [showCandidates , setShowCandidate] = useState(false);
  
  const candidateToggler = (event)=>{
    setShowCandidate(prevState=>!prevState);
    event.stopPropagation();
  }

  const deleteChitiHandler = (event,id)=>{
    console.log("received id to delete is : " + id);
    dispatch(deleteChiti(id));
    event.stopPropagation();
  }

  return (
    <Card className="flex-column ">
      {showCandidates && <Modal onClose={candidateToggler}><AvailableCandidates /></Modal>}
      <AvailableItems type='Chiti' items={props.items} onOpen={candidateToggler} onDelete={deleteChitiHandler}/>
    </Card>
  );
};

export default AvailableChitis;
