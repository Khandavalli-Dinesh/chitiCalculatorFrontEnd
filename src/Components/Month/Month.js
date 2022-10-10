import { useRef } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "../Chiti/Chiti.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateMonth } from '../../store/month-actions';

const Month = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { role } = useSelector(state=>state.users.activeUser);
  const nameInputHandler = useRef(props.candidateName);
  const bidInputHandler = useRef(props.bid);
  const bonusInputHandler = useRef(props.bonus);
  const amountInputHandler = useRef(props.amountGiven);
  const amountPaidInputHandler = useRef(props.amountPaid);
  
  const editHandler = (event)=>{
    props.onEdit(props.id);
    event.stopPropagation();
  }

  const cancelHandler = (event)=>{
    props.onEdit();
    event.stopPropagation();
  }

  const submitHandler = (event)=>{
    event.preventDefault();
    const amountGiven = amountInputHandler.current.value;
    const amountPaid = amountPaidInputHandler.current.value;
    const candidateName = nameInputHandler.current.value;
    const bid = bidInputHandler.current.value;
    const bonus = bonusInputHandler.current.value;

    const formData = {
      "amountGiven": amountGiven,
        "amountPaid": amountPaid,
        "bid": bid,
        "bonus": bonus,
        "candidateName": candidateName,
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
          "id": params.chitiId,
          "name": "string",
          "noOfMonths": 0
        },
        "id": props.id
      }
    //validation to be done
    dispatch(updateMonth(formData));
    props.onEdit();
    
  }
  return (
    <Card className={`${classes["control-group"]} form`} onClick={props.onClick} onSubmit={submitHandler}>
      <div className={`row ${classes["show-details"]} `}>
        <div className="col-md-6">
          <label htmlFor="candidate-name">Candidate Name</label>
          <input
            name="candidate-name"
            id="candidate-name"
            defaultValue={props.candidateName}
            ref={nameInputHandler}
            disabled={props.disabled}
          />
          <label htmlFor="bid">Bid</label>
          <input name="bid" id="bid" defaultValue={props.bid} ref={bidInputHandler} disabled={props.disabled} />
        </div>
        <div className="col-md-6">
          <label htmlFor="bonus">Bonus</label>
          <input name="bonus" id="bonus" defaultValue={props.bonus} ref={bonusInputHandler} disabled={props.disabled} />
          <label htmlFor="amount-given">Amount Given</label>
          <input name="amount-given" id="amount-given" defaultValue={props.amountGiven} ref={amountInputHandler} disabled={props.disabled} />
        </div>
      </div>
      <div className={`${classes['showMonths']} container`}>
        <label htmlFor="amount-paid">Amount Paid</label>
        <input name='amount-paid' id='amount-paid' defaultValue={props.amountPaid} ref={amountPaidInputHandler} disabled={props.disabled} />
        {role === 'ADMIN' && (<>{props.disabled && <Button className='edit' text="Edit" onClick={editHandler} />}
        {!props.disabled && <Button className='cancel' text='Cancel' onClick={cancelHandler} />}
        {!props.disabled && <Button className='save' text="Save" type="submit" />}</>)}
      </div>
    </Card>
  );
};

export default Month;