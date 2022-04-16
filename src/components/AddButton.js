import React, { useState } from "react";
import addImg from "../images/add.png";

export function AddButton(props) {
  const { onAdd, submitButtonText, placeholder } = props;
  const [showInput, setShowInput] = useState(false);

  const handleSubmitButton = (e) => {
    e.preventDefault();
    setShowInput(false);
    if (onAdd) onAdd(e.target.inputFieldText.value);
  };

  return (
    <>
      <img className="add-button" src={addImg} alt="add" onClick={(e) => setShowInput(true)} />
      {showInput && (
        <form onSubmit={(e) => handleSubmitButton(e)}>
          <input type="text" name="inputFieldText" placeholder={placeholder} defaultValue={""} />
          <button type="submit">{submitButtonText}</button>
        </form>
      )}
    </>
  );
}
