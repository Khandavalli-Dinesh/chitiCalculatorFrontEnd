import {useRef} from 'react';   
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addMonth } from '../../store/month-actions';
import Button from "../UI/Button/Button";
import classes from "../Chiti/Chiti.module.css";

const MonthForm = (props) => {
  const params = useParams();
  const dispatch = useDispatch();

  const availableCandidates = useSelector((state)=>state.chiti.chiti.candidateList);
  const months = useSelector((state)=>state.month.months);
  const availableCandidateNames = availableCandidates.map((candidate)=>candidate.name);
  const usedCandidateNames = months.map((month)=>month.candidateName);
  const names = availableCandidateNames.filter((name)=>usedCandidateNames.indexOf(name) === -1);

  const nameInputRef = useRef("");
  const bidInputRef = useRef("");

  const defaultFormData = {
      "amountGiven": 0,
      "amountPaid": 0,
      "bid": 0,
      "bonus": 0,
      "candidateName": "string",
      "chitiId": {
        "amount": 0,
        "candidateList": [
          {
            "id": 0,
            "name": "string",
            "phoneNumber": "string"
          }
        ],
        "date": "2022-08-18",
        "id": 0,
        "name": "string",
        "noOfMonths": 0
      },
      "id": 0
    
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const bid = bidInputRef.current.value;
    const chiti = {...defaultFormData.chitiId, id: params.chitiId};

    const formData = {...defaultFormData, candidateName: name, bid: bid, chitiId: chiti};
    dispatch(addMonth(formData));
    //validation to be done
    console.log(formData);
    props.onClose();
  };

  return (
    <form
      className={`${classes["control-group"]}`}
      onSubmit={submitHandler}
    >
      <div className={`row ${classes["show-details"]} `}>
         <div className="col-md-6"> 
          <label htmlFor="candidate-name">Candidate Name</label>
          <input name="candidate-name" id="candidate-name" ref={nameInputRef} />
          {names.map((name)=><p>{name}</p>)}
         </div>
         <div className="col-md-6">
          <label htmlFor="bid">Bid</label>
          <input name="bid" id="bid" ref={bidInputRef} />
         </div>
        {/* <div className="col-md-6">
           <label htmlFor="bonus">Bonus</label>
          <input name="bonus" id="bonus" ref={bonusInputRef} />
          <label htmlFor="amount-given">Amount Given</label>
          <input name="amount-given" id="amount-given" ref={amountGivenInputRef} /> 
        </div>
      </div>         */}
      <div className={classes.showMonths + " container"}>
        {/* <label htmlFor="amount-paid">Amount Paid</label>
        <input name='amount-paid' id='amount-paid' ref={amountPaidInputRef} /> */}
        {/* <div className= " container"> */}
        <Button className="cancel" text="Cancel" onClick={props.onClose} />
        <Button className="save" text="Save" type="submit" />
      </div>
      </div>
    </form>
  );
};

export default MonthForm;
