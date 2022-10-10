import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AvailableMonths from '../Components/Month/AvailableMonths';
import { fetchMonths } from '../store/month-actions';

const MonthPage = ()=>{
    const params = useParams();
    const { chitiId } = params;
    const months = useSelector((state)=>state.month.months);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchMonths(chitiId));
    },[dispatch, chitiId]);

    return (
        <div className="d-flex justify-content-center ">
            {  months.length !==0 && <AvailableMonths items={months} />  }
            {  months.length ===0 && <h2>No months to display</h2>}
        </div> 
    )
}

export default MonthPage;