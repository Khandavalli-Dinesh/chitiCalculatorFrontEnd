import {useRef} from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateChiti } from '../../store/chiti-actions';
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Chiti.module.css";

const Chiti = (props) => {
  const dispatch = useDispatch();
  const { role } = useSelector(state=>state.users.activeUser);
  const nameInputRef = useRef(props.name);
  const amountInputRef = useRef(props.amount);
  const startDateInputRef = useRef(props.date);
  const monthsInputRef = useRef(props.noOfMonths);

  const history = useHistory();

  const showCandidates = (event)=>{
    props.onOpen(event);
  }

  const showMonths = ()=>{
    history.push(`/${props.id}/months`);
  }

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
    const name = nameInputRef.current.value;
    const amount = amountInputRef.current.value;
    const noOfMonths = monthsInputRef.current.value;
    const date = startDateInputRef.current.value;

    const formData = {
      "id": props.id,
      "name": name,
      "noOfMonths": noOfMonths,
      "amount": amount,
      "candidateList": props.candidateList,
      "date": date
    };
    //validation to be done
    dispatch(updateChiti(formData));
    props.onEdit();
    console.log("form submitted");
  }

  return (
    
    <Card className={`${classes["control-group"]} form`} onClick={props.onClick} onSubmit={submitHandler}>
      <div className={`row ${classes["show-details"]} `}>
        <div className="col-md-6">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            defaultValue={props.name}
            ref={nameInputRef}
            disabled={props.disabled}
          />
          <label htmlFor="amount">Amount</label>
          <input name="amount" id="amount" defaultValue={props.amount} ref={amountInputRef} disabled={props.disabled} />
        </div>
        <div className="col-md-6">
          <label htmlFor="date">Start Date</label>
          <input type="date" name="date" id="date" defaultValue={props.date} ref={startDateInputRef} disabled={props.disabled} />
          <label htmlFor="months">No of Months</label>
          <input name="months" id="months" defaultValue={props.noOfMonths} ref={monthsInputRef} disabled={props.disabled} />
        </div>
      </div>
      <div className={classes.showMonths + " container"}>
        <Button text="Show candidates" onClick={showCandidates} />
        <Button text="Show months" onClick={showMonths}/>
        {role === 'ADMIN' && (<div className='container'>
          {props.disabled && <Button text="Edit" className='edit' onClick={editHandler} />}
          {!props.disabled && <Button text="Cancel" className='cancel' onClick={cancelHandler} />}
          {!props.disabled && <Button text="Save" className='save' type="submit" />}
        </div>)}
        
      </div>
    </Card>
    
  );
};

export default Chiti;
