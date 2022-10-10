import { useDispatch,useSelector } from "react-redux"
import { updateUser } from "../../store/user-actions";
import UserForm from "./UserForm";
import Card from '../UI/Card/Card';
import classes from './Profile.module.css';

const Profile = (props)=>{

    const dispatch = useDispatch();
    const user = useSelector(state=>state.users.activeUser);

    const updateUserHandler = (user)=>{
        dispatch(updateUser(user));    
    }
    return (
        <div className={classes.center}>
            <Card>
                <UserForm user={user} submitHandler={updateUserHandler} isProfile={true} />
            </Card> 
        </div>
        )
}

export default Profile;