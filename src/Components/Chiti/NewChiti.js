import { useState,useEffect } from "react";
import ChitiForm from "./ChitiForm";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux/es/exports";
import {fetchCandidates} from '../../store/candidate-actions';

const NewChiti = (props) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = (event)=>{
    setShowForm(prevState=>!prevState);
    event.stopPropagation();
  }

  useEffect(()=>{
    dispatch(fetchCandidates());
  },[dispatch]);

  return (
    <>
      {showForm && (
        <Modal onClose={showFormHandler}>
            <div className='d-flex justify-content-center'>
            <ChitiForm onClose={showFormHandler} />
            </div>
        </Modal>
      )}
      {!showForm && <Button className='add' text='add Chiti' onClick={showFormHandler}/>}
    </>
  );
};

export default NewChiti;
