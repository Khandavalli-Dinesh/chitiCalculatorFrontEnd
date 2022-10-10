import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import classes from "./Chiti.module.css";
import { addChiti } from '../../store/chiti-actions';
import AvailableCandidates from "../Candidate/AvailableCandidates";


let candidateIds = [];

const ChitiForm = (props) => {const dispatch = useDispatch();

  const nameInputRef = useRef("");
  const amountInputRef = useRef("");
  const startDateInputRef = useRef("");
  const monthsInputRef = useRef("");
  const selectInputRef = useRef("");
  const [showCandidates, setShowCandidates] = useState(false);
  const [candidateList, setCandidateList] = useState([]);
  
  const availableCandidates = useSelector((state)=>state.candidate.candidates);

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const amount = amountInputRef.current.value;
    const startDate = startDateInputRef.current.value;
    const noOfMonths = monthsInputRef.current.value;

    const formData = {
      "id": 0,
      "name": name,
      "noOfMonths": noOfMonths,
      "amount": amount,
      "candidateList": [...candidateList],
      "date": startDate
    };
    //validation to be done
    
    dispatch(addChiti(formData));
    candidateIds = [];
    props.onClose(event);
  };

  const addCandidateHandler = () => {
    const addingData = {
      id: parseInt(selectInputRef.current.value),
      name: "string",
      phoneNumber: "string"
    }
    setCandidateList([...candidateList,addingData]);
    candidateIds.push(parseInt(selectInputRef.current.value));
  };

  const showCandidatesHandler = (event) => {
    setShowCandidates((prevState) => !prevState);
    event.stopPropagation();
  };

  const cancelHandler = (event)=>{
    candidateIds = [];
    props.onClose(event);
  }

  const candidatesLeft = candidateList.map((candidate) => (availableCandidates.filter((cand)=>cand.id === candidate.id)[0]));
  return (
    <>
    {showCandidates &&( <Modal onClose={showCandidatesHandler}><AvailableCandidates candidates = {candidatesLeft}/></Modal> )}
    <div className={`${showCandidates ? classes['back-drop']: ""}`}>
    <form className={`${classes["control-group"]}`} onSubmit={submitHandler}>
      <div className={`row ${classes["show-details"]} `}>
        <div className="col-md-6">
          <label htmlFor="name">Name</label>
          <input name="name" id="name" ref={nameInputRef} />
          <label htmlFor="amount">Amount</label>
          <input name="amount" id="amount" ref={amountInputRef} />
        </div>
        <div className="col-md-6">
          <label htmlFor="date">Start Date</label>
          <input type="date" name="date" id="date" ref={startDateInputRef} />
          <label htmlFor="months">No of Months</label>
          <input name="months" id="months" ref={monthsInputRef} />
        </div>
      </div>
      <div className={`container d-flex justify-content-center`}>
        <select
          id="candidate-select"
          placeholder="select a candidate"
          ref={selectInputRef}
        >
          <option key={''} value="">Select candidate</option>
          {availableCandidates.filter((candidate)=>candidateIds.indexOf(candidate.id) === -1).map((candidate)=><option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
        </select>
        <Button
          text="add"
          onClick={addCandidateHandler}
          className="candidateAdd"
        />
      </div>
      <div className="container d-flex justify-content-center">
        <Button
          text="show selected candidates"
          className=""
          onClick={showCandidatesHandler}
        />
      </div>

      <div className={classes.showMonths + " container"}>
        <Button className="cancel" text="Cancel" onClick={cancelHandler} />
        <Button className="save" text="Save" type="submit" />
      </div>
    </form>
    </div>
    </>
  );
};

export default ChitiForm;
