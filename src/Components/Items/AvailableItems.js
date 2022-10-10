import { useState } from 'react';
import Chiti from '../Chiti/Chiti';
import Month from '../Month/Month';
import { useDispatch, useSelector } from 'react-redux';
import {chitiActions} from '../../store/chiti-slice';
import Button from '../UI/Button/Button';

const AvailableItems = (props) => {
    const dispatch = useDispatch();
    const { role } = useSelector(state=>state.users.activeUser);
    // const [showChiti, setShowChiti] = useState(true);
    const [showId, setShowId] = useState(null);
    const [editId, setEditId] = useState(null);
   
    const toggleShowId = (event,id) => {
      if(editId){
        return;
      }
      if(id){
        setShowId(id);
        return;
      }
      else{
        setShowId(null);
      }
    };
  
    const toggleEditId = (id) =>{
      if(id){
        setEditId(id);
        return;
      }else{
        setEditId(null);
      }
    }
  
    let itemsList;

    if(props.type === 'Chiti'){
        itemsList = props.items.map((chiti) => {
            if (showId && (showId === chiti.id)) {
              dispatch(chitiActions.selectedChtii(chiti));
              return (
                <Chiti
                  key={chiti.id}
                  id={chiti.id}
                  onClick={toggleShowId}
                  name={chiti.name}
                  amount={chiti.amount}
                  date={new Date(chiti.date).toISOString().split('T')[0] }
                  noOfMonths={chiti.noOfMonths}
                  disabled = {!(chiti.id === editId)}
                  candidateList = {chiti.candidateList}
                  onEdit= {toggleEditId}
                  onOpen= {props.onOpen}
                />
              );
            } else {
              return <div className = 'container inline d-flex justify-content-center' key={chiti.id}>
                <Button onClick={event=>toggleShowId(event,chiti.id)} text={chiti.name}  />
                {role === 'ADMIN' && <Button className='trash' onClick={(event)=>{props.onDelete(event,chiti.id)}}/>}
                </div>;
            }
          })
    }

    if(props.type === 'Month'){
        itemsList = props.items.map((month) => {
            if (showId && (showId === month.id)) {
              return (
                <Month
                  key={month.id}
                  id={month.id}
                  onClick={toggleShowId}
                  candidateName={month.candidateName}
                  bid={month.bid}
                  bonus={month.bonus}
                  amountGiven={month.amountGiven}
                  amountPaid={month.amountPaid}
                  disabled = {!(month.id === editId)}
                  onEdit= {toggleEditId}
                />
              );
            } else {
              return <Button onClick={event=>toggleShowId(event,month.id)} text={month.candidateName} key={month.id} />;
            }
          })
    }

    return (
        <>
        {itemsList}
        </>
        
    );
  };
  
  export default AvailableItems;