import { useHistory } from "react-router";
import Button from "../UI/Button/Button";

const GoBack = ()=>{

    const history = useHistory();

    const goBackHandler = ()=>{
        history.replace(`/chiti`);
    }

    // const showFormHandler = ()=>{
    //     history.replace(`/1/month/new-month`)
    // }
    return (
        <>
        <div className = 'd-flex justify-content-start'>
                <Button text='Go To Chitis' className='add' onClick={goBackHandler}/> 
        </div>
        {/* <div className='d-flex justify-content-end '>
            <Button className="add" text="add Month" onClick={showFormHandler} />
        </div> */}
        </>
    );
}

export default GoBack;