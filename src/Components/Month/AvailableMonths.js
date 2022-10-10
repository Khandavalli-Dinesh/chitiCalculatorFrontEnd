import Card from "../UI/Card/Card";
import AvailableItems from "../Items/AvailableItems";

const AvailableMonths = (props) => {
    
    return (
      <Card className="flex-column ">
        <AvailableItems type='Month' items = {props.items} />
      </Card>
    );
  };
  
  export default AvailableMonths;