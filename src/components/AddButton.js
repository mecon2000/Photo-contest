import React, { useState } from "react";
import addImg from "../images/add.png";

export function AddButton(props) {
  const { onAdd, submitButtonText } = props;
  const [showInput, setShowInput] = useState(false);

  const handleSubmitButton = (text) => {
    setShowInput(false);
    console.log(`${JSON.stringify(text)}`)
    if (onAdd) onAdd(text);
  };

  return (
    <>
      <img width="30px" className="add-button" src={addImg} alt="add" onClick={(e) => setShowInput(true)} />
      {showInput && (
        <form onSubmit={(e) =>handleSubmitButton(e.target.value)}>
          <input type="text" value="" />
          <input type="submit" value={submitButtonText} />
        </form>
      )}
    </>
  );
}
