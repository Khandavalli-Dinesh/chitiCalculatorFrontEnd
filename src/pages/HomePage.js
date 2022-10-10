import { useSelector} from "react-redux"
import LoginForm from "../Components/User/LoginForm";
import Card from '../Components/UI/Card/Card';
import Button from '../Components/UI/Button/Button';
import LoadingSpinner from "../Components/UI/LoadingSpinner/LoadingSpinner";
// import Modal from '../Components/UI/Modal/Modal';
import { useHistory } from "react-router";

const HomePage = ()=>{
    const isLoading = useSelector(state=>state.loading.isLoading);
    const storeIsLoggedIn = useSelector(state=>state.users.isLoggedIn);
    const user = useSelector(state=>state.users.activeUser);
    const { role } = user;
    const history = useHistory();

    const chitiOnClick = ()=>{
        history.push('/chiti');
    }

    const usersOnClick = ()=>{
        history.push('/users');
    }

    const profileOnClick = ()=>{
        history.push('/profile');
    }

    if(storeIsLoggedIn){
        localStorage.setItem("prevUser",JSON.stringify(user));
        localStorage.setItem("isLoggedIn",true);
        return (
        <div className="d-flex justify-content-center">
            <Card className='flex-column'>
                <Button text = 'Chitis' onClick = {chitiOnClick} />
                { role === 'ADMIN' && <Button text = 'Users' onClick = {usersOnClick} />}
                <Button text = 'MyProfile' onClick={profileOnClick}/>
            </Card>
        </div>
         )
    }
    else{
        return (
            <>
                {isLoading && <div className='d-flex justify-content-center'><LoadingSpinner /></div>}
                {!isLoading && <LoginForm />}
            </>
        )
    }
}

export default HomePage;