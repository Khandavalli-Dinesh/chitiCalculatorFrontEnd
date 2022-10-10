import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Button from '../UI/Button/Button';
import classes from './AvailableUsers.module.css';

const UserForm = (props)=>{
    const activeUserRole = useSelector(state=>state.users.activeUser.role);
    const unameInputRef = useRef();
    const passwordInputRef = useRef();
    const roleInputRef = useRef();
    const nameInputRef = useRef();
    const phoneNumberInputRef = useRef();
    const [edit , setEdit] = useState(false);
    const [isValid , setIsValid] = useState({
        uname: true,
        pass: true,
        name: true,
        phoneNumber: true
    })

    const {user: editUser} = props;

    let disabled = false;

    if(props.isProfile && !edit){
        disabled = true;
    }

    let user = {
        "candidateId": {
          "id": 0,
          "name": "string",
          "phoneNumber": "string"
        },
        "id": 0,
        "password": "string",
        "role": "USERS",
        "uname": "string"
    };
    
    if(editUser){
        user = {...editUser};
    }
    
    const editHandler = ()=>{
        setEdit(prevState=>!prevState);
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        const uname = unameInputRef.current.value;
        const password = passwordInputRef.current.value;
        const role = props.user? props.user.role :roleInputRef.current.value;
        const name = nameInputRef.current.value;
        const phoneNumber = phoneNumberInputRef.current.value;

        let unameIsValid = uname.length > 0;
        let passwordIsValid = password.length > 4;
        let nameIsValid = name.length > 0;
        let phoneNumberIsValid = phoneNumber.length === 10;

        if(editUser){
            const candidateId = editUser.candidateId;
            user = {
                ...editUser,
                uname,password,
                candidateId:{
                    ...candidateId,
                    name,
                    phoneNumber
                },
                role
            }
        }else{
            user={
                ...user,
                uname,password,
                candidateId:{
                    id:0,
                    name,
                    phoneNumber
                }
            }
        }
        
        if(unameIsValid && passwordIsValid && nameIsValid && phoneNumberIsValid){
            props.submitHandler(user);
        }
        
        if(props.user){
            setEdit(false);
        }
        
        setIsValid({
            uname: unameIsValid,
            pass: passwordIsValid,
            name: nameIsValid,
            phoneNumber: phoneNumberIsValid
        });
    }
    return (
          <div className={classes['back-drop']}>
            <form className={`${classes['control-group']}`} onSubmit={submitHandler}>
                <div className={`row ${classes['show-details']}`}>
                    <div className="col-md-6">
                        <label htmlFor="uname">User Name</label>
                        <input type="text" name="uname" id="uname" ref={unameInputRef} defaultValue={user.uname} disabled={disabled}/>
                        {!isValid.uname && <p>Username cannot be empty</p>}
                        {user.candidateId && (
                        <>
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' id='name' ref={nameInputRef} defaultValue={user.candidateId.name} disabled={disabled}/>
                            {!isValid.name && <p>Name cannot be empty</p>}
                        </>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" ref={passwordInputRef} defaultValue={user.password} disabled={disabled}/>
                        {!isValid.pass && <p>Password must be atleast 5 characters</p>}
                        {user.candidateId &&(
                        <>
                            <label htmlFor="phoneNumber">Phone number</label>
                            <input type="text" name='phoneNumber' id='phoneNumber' ref={phoneNumberInputRef} defaultValue={user.candidateId.phoneNumber} disabled={disabled}/>
                            {!isValid.phoneNumber && <p>Phone number must be 10 digits</p>}
                        </>
                        )}
                    </div>                   
                </div>
                {activeUserRole === "ADMIN" && (<div className={`container d-flex justify-content-center`}>
                    <select
                    id="role"
                    placeholder="select role"
                    ref={roleInputRef}
                    defaultValue={user.role}
                    >
                        <option key={2} value="USERS">USER</option>
                        <option key={1} value="ADMIN">ADMIN</option>
                    </select>
                </div>)}
                {!props.isProfile && (
                <div className={classes.showMonths + " container"}>
                    <Button className="cancel" text="Cancel" onClick={props.onClose} />
                    <Button className="save" text="Save" type="submit" />
                </div>)}

                {props.isProfile && edit && (
                <div className={classes.showMonths + " container"}>
                    <Button className="cancel" text="Cancel" onClick={editHandler} />
                    <Button className="save" text="Save" type="submit" />
                </div>)}
                
                {props.isProfile && !edit && (
                <div className={classes.showMonths + " container"}>
                    <Button className="edit" text="Edit" onClick={editHandler} />
                </div>
                )}
            
            </form>
          </div>
    );
}

export default UserForm;