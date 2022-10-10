import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from '../../store/user-actions';
import { updateUser } from "../../store/user-actions";
// import { userActions } from "../../store/user-slice";
import Button from '../UI/Button/Button';
import classes from './AvailableUsers.module.css';
import UserForm from "./UserForm";
import Modal from '../UI/Modal/Modal';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

let user ={};
const AvailableUsers = (props)=>{
    const dispatch = useDispatch();

    const isLoading = useSelector(state=>state.loading.isLoading);
    const isLoggedIn = useSelector(state=>state.users.isLoggedIn);
    const role = useSelector(state=>state.users.activeUser.role);
    const users = useSelector(state=>state.users.users);
    const [editUser, setEditUser] = useState(false);
    

    const toggleUserEdit = (event,editingUser)=>{
        setEditUser(prevState => !prevState);
        user = editingUser ? editingUser : {};
    }

    const formSubmitHandler= (user)=>{
        dispatch(updateUser(user));
        toggleUserEdit();
    }

    const deleteUserHandler = (event, id)=>{
        dispatch(deleteUser(id));
    }

    useEffect(()=>{
        if(isLoggedIn && role === 'ADMIN'){
            dispatch(getAllUsers());
        }
    },[isLoggedIn,role,dispatch]);
    

    if(editUser){
        return (
            <Modal onClose = {toggleUserEdit}>
            <UserForm onClose={toggleUserEdit} user={user} submitHandler={formSubmitHandler}/>
            </Modal>
        )
    }
    
    if(isLoading){
        return (
            <div className="d-flex justify-content-center">
                <LoadingSpinner />
            </div>
        )
    }

    if(users.length === 1){
        return <h2>No users to display</h2>
    }

    return (
        <div className={classes.sizeDiv}>
            <table className={`table table-hover ${classes.customTable}`}>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) =>{ if(user.candidateId){
                    return (
                    <tr key={user.id}>
                    <td>{user.uname}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                    <td>{user.candidateId.name}</td>
                    <td>{user.candidateId.phoneNumber}</td>
                    <td><Button className="editUser" text="edit" onClick = {(event)=>toggleUserEdit(event,user)}/></td>
                    <td><Button className="trash" onClick= {(event)=>deleteUserHandler(event,user.id)} /></td>
                    </tr>
                )}else{
                    return(
                    null
                    )
                }
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AvailableUsers;