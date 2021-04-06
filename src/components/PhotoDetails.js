import React from "react";

export function PhotoDetails(props) {
  const { src } = props;

  const onClose = () => {};
  return (
    <>
      <img className="photo-details" src={src} alt="alt text" />
      <button onClick={onClose}>X</button>
    </>
  );
}
