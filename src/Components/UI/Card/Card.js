import classes from './Card.module.css';

const Card = props=>{
    const noOnClick = (event)=>{
        event.stopPropagation();
    }
    
    return (
        <div className={`${classes.card} ${props.className? props.className : ''} justify-content-center`} onClick={props.onClick? props.onClick : noOnClick}>
            {props.className && props.className.includes("form") && <form onSubmit={props.onSubmit}>{props.children}</form>}
            {props.className &&!props.className.includes("form") && props.children}
            {!props.className && props.children}
        </div>
    )
};

export default Card;