import classes from './Button.module.css';
import TrashButton from '../Trash/TrashButton';

const Button = (props)=>{
  let className = classes[`${props.className}`];
  // if(props.className === 'edit'){
  //   className = classes.edit;
  // }
  // else if(props.className === 'save'){
  //   className = classes.save;
  // }else if(props.className === 'cancel'){
  //   className = classes.cancel;
  // }else if(props.className === 'add'){
  //   className = classes.add; 
  // }else if(props.className === 'candidateAdd'){
  //   className = classes.candidateAdd;
  // }else if(props.className === 'trash'){
  //   return <TrashButton onClick={props.onClick}/>
  // }else if(props.className === 'home'){
  //   className = classes.home;
  // }else if(props.className === 'homePage'){
  //   className = classes.homePage;
  // }else if(props.className === 'back'){
  //   className = classes.back;
  // }else if(props.className === 'monthPage'){
  //   className = classes.monthPage 
  // }else if(props.className === 'userHome'){
  //   className = classes.userHome;
  // }else if(props.className === 'profilePage'){
  //   className = classes.profilePage;
  // }else if(props.className === 'adminProfile'){
  //   className = classes.adminProfile;
  // }else 
  if(props.className === 'trash'){
      return <TrashButton onClick={props.onClick}/>
    }
  if(props.className){
    if(props.className.includes('logOut')){
      className = classes.logOut;
    }
    
    if(props.className.includes('user')){
      className = className + classes.user;
    }
  }
  else{
    className = classes['btn-custom'];
  }
  
    return(
        <button className={className} type={props.type? props.type : "button"} onClick={props.onClick}>
        <b>{props.text}</b>
      </button>
    )
};

export default Button;