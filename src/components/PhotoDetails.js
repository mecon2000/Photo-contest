import React from "react";

export function PhotoDetails(props) {
  const { src,closePhoto} = props;

  return (
    <div className="photo-details" onClick={props.onClick}>
      <img src={src} alt="alt text" />
      <button className="close-button" onClick={closePhoto}>X</button>
    </div>
  );
}
