import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const BackDrop = props=>{
    return <div className={classes.backdrop} onClick={props.onClose}/>
};

const ModalOverlay = props=>{
    return (
        <div className={classes.modal}>
            {props.children}     
        </div>

    );
};


const Modal = props=>{
    const elementId = props.divName ? props.divName : 'overlays';
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>,document.getElementById(elementId))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById(elementId))}
        </React.Fragment>
    )
}

export default Modal;