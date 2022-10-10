import classes from './Header.module.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../store/user-actions';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import NewChiti from '../../Chiti/NewChiti';
import NewMonth from '../../Month/NewMonth';
import NewUser from '../../User/NewUser';

const Header = (props)=>{
    const isLoggedIn = useSelector(state=>state.users.isLoggedIn);
    const {role} = useSelector(state=>state.users.activeUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isNotHome,setIsNotHome] = useState(false);
    const [isChiti, setIsChiti] = useState(false);
    const [isMonth, setIsMonth] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isProfile, setIsProfile] = useState(false);

    let className = '';
    let homeClassName = 'home';

    const upadateIsNotHome = (location)=>{
        setIsNotHome(location[location.length - 1] !== '/');
        setIsChiti(location.includes('chiti'));
        setIsMonth(location.includes('months'));
        setIsUser(location.includes('users'));
        setIsProfile(location.includes('profile'));
    }

    useEffect(()=>{
        return history.listen((location)=>{
            upadateIsNotHome(location.pathname);
        })        
    },[history]);

    const logOutHandler = ()=>{
        localStorage.clear();
        dispatch(logOut()).then(()=>{
            history.push('/');
        });
        // history.push('/');
    }

    const goHome = ()=>{
        history.push('/');
    }

    const gOChiti = ()=>{
        history.push('/chiti');
    }

    if(isMonth ){
        className = 'monthPage';
    }
    if(!isNotHome ){
        className = 'homePage';
    }
    if(isProfile){
        className = 'profilePage';
    }
    if(isProfile && role === 'ADMIN'){
        className = 'adminProfile';
    }
    if(isNotHome && !isMonth && !isProfile){
        className = 'logOut';
    }

    if(role !== 'ADMIN'){
        homeClassName = 'notAdminHome';
    }

    return (
    <>
        <h2 className={`${classes.heading}`} onClick={props.onClick}>Chiti Calculator</h2>
        <div className='inline'>
            {isLoggedIn && isNotHome && <Button className={homeClassName} text="Home" onClick={goHome} />}
            {role === 'ADMIN' && isUser && <NewUser />}
            {role === 'ADMIN' && isChiti && <NewChiti />}
            {role === 'ADMIN' && isMonth && <NewMonth />}
            {isMonth && <Button className="back" text="Chitis" onClick={gOChiti} />}
            {isLoggedIn && <Button className={className} text="logout" onClick={logOutHandler} />}
            
        </div>
    </>
    
    )
}

export default Header;