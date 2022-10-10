import { useState } from "react";
import MonthForm from "./MonthForm";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

const NewMonth = () => {
    const [showForm , setShowForm] = useState(false);

    const showFormHandler = ()=>{
        setShowForm(prevState => !prevState);
    }

  return (
    <>
      {showForm && (
        <Modal onClose={showFormHandler}>
          <div className="d-flex justify-content-center">
            <MonthForm onClose={showFormHandler} />
          </div>
        </Modal>
      )}
      {!showForm && (
        <Button className="add" text="add Month" onClick={showFormHandler} />
      )}
    </>
  );
};

export default NewMonth;
