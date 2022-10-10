import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCandidate } from "../../store/candidate-actions";
import Modal from '../UI/Modal/Modal';
import  Button  from '../UI/Button/Button';
import classes from "../Chiti/Chiti.module.css";

const NewCandidate = (props)=>{
    const nameInputRef = useRef("");
    const phoneNumberInputRef = useRef("");
    const [showForm , setShowForm] = useState(false);
    const dispatch = useDispatch();
    
    const showFormHandler = (event)=>{
        setShowForm(prevState=>!prevState);
        event.stopPropagation();
    }

    const candidateAddHandler = (event)=>{
        event.preventDefault();
        const name = nameInputRef.current.value;
        const phoneNumber = phoneNumberInputRef.current.value;

        const data = {
            id: 0,
            name,
            phoneNumber
        };
        dispatch(addCandidate(data));
        showFormHandler(event);
    }

    if(!showForm){
        return <Button text="add candidate" className="add" onClick = {showFormHandler}/>;
    }
    return (
        <Modal onClose={showFormHandler}>
          <div className="d-flex justify-content-center">
            <form className={`${classes['control-group']}`} onSubmit={candidateAddHandler}>
                <div className={`${classes['show-details']}`}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' ref={nameInputRef} />
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input type="text" name='phoneNumber' id='phoneNumber' ref={phoneNumberInputRef} />
                </div>
                <div className={classes.showMonths + " container"}>
                    <Button className="cancel" text="Cancel" onClick={showFormHandler} />
                    <Button className="save" text="Save" type="submit" />
                </div>
            </form>
          </div>
        </Modal>
    )
}

export default NewCandidate;