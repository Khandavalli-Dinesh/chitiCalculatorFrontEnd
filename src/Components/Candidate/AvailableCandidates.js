import classes from './AvailableCandidates.module.css';
import {useSelector} from 'react-redux';

const AvailableCandidates = (props) => {
  const candidateState = useSelector((state)=>state.chiti.chiti.candidateList);
  const candidates = props.candidates ? props.candidates : candidateState;

  if(candidates.length === 0){
    return <h2>No candidates to display</h2>
  }
  return (
      <div className={classes.sizeDiv}>
      <table className={`table table-hover ${classes.customTable}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default AvailableCandidates;
