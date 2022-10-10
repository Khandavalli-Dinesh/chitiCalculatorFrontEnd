import { Trash } from 'react-bootstrap-icons';
import classes from './TrashButton.module.css';

const TrashButton = (props)=>{
    return (
        <Trash className={classes.trash} onClick={props.onClick}/>
    )
}

export default TrashButton;