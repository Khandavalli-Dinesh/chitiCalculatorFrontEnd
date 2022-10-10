import { useDispatch } from "react-redux"
import { useState } from "react";
import { addUser } from "../../store/user-actions";
import UserForm from "./UserForm";
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

const NewUser = (props)=>{

    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);

    const showFormHandler = ()=>{
        setShowForm(prevState=>!prevState);
    }

    const addUserHandler = (user)=>{
        dispatch(addUser(user));
        showFormHandler();    
    }

    if(!showForm){
        return <Button text="addUser" className="add" onClick={showFormHandler} />
    }else{
        return (
            <Modal onClose = {showFormHandler}>
                <UserForm submitHandler={addUserHandler} onClose={showFormHandler} />
            </Modal>
        )
    }
}

export default NewUser;