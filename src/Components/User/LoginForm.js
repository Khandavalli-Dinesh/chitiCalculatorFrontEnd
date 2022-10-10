import {useRef, useState} from 'react';
import { useDispatch} from 'react-redux';
import Button from '../UI/Button/Button';
import classes from '../Items/Login.module.css';
import { userActions } from '../../store/user-slice';
import { isLoggedIn, logIn} from '../../store/user-actions';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

let count = 0;
const LoginForm = (props)=>{
    const dispatch = useDispatch();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const [isValid, setIsValid] = useState({
        name: true,
        pass: true
    });
    //const dispatch = useDispatch();
    const prevUser = localStorage.getItem('prevUser');
    const history = useHistory();

    const initialState = {
        "candidateId": {
          "id": 0,
          "name": "string",
          "phoneNumber": "string"
        },
        "id": 0,
        "password": "string",
        "role": "ADMIN",
        "uname": "string"
    };
    
    useEffect(()=>{
        if(prevUser && count === 0){
            const prevLoggedIn = dispatch(isLoggedIn());
            if(prevLoggedIn){
                dispatch(userActions.stateUser({loggedIn: true,message:"logged in successfully!!!",user:JSON.parse(prevUser)}));
            }
            history.replace('/');
            count = 1;
        }
    }, [dispatch,history,prevUser]);
       

    const submitHandler = (event)=>{
        event.preventDefault();
        const name = nameInputRef.current.value;
        const password = passwordInputRef.current.value;
        //validate
        let isNameValid = name.length > 0;
        let isPassValid = password.length >4; 
        setIsValid({name: isNameValid, pass: isPassValid})       

        if(isNameValid && isPassValid){
            initialState.uname = name;
            initialState.password = password;
            dispatch(logIn(initialState));
        }
    }

    return (
    <div className={classes.content}>
    <form className={`${classes["control-group"]} `} onSubmit={submitHandler}>
        <div className={`${classes["show-details"]} `}>
            <label htmlFor="name">Userame</label>
            <input name="name" id="name" ref={nameInputRef} />
            {!isValid.name && <p>User name cannot be empty</p>}
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" ref={passwordInputRef} />
            {!isValid.pass && <p>Password must be atleast 5 characters</p>}
        <div className={classes.showMonths + " container"}>
            <Button text="Login" type="submit" />
        </div>
        </div>
    </form>
    </div>
    );

}

export default LoginForm;