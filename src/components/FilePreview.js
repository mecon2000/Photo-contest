import bytes from "bytes";
import React, { useContext } from "react";
import { CallbackContext } from "../pages/Upload";
export function FilePreview(props) {
  const { file: data } = props;

  const removePhoto = useContext(CallbackContext);

  console.log({ data: data });
  const openImageModal = (x) => {};
  const errorMessage = "Error";
  console.log(data);
  return (
    <div className="file-preview" onClick={() => openImageModal(data)}>
      <img className="thumbnail" src={data.photoDataUrl} alt={data.name} />
      <span className={`file-name ${data.invalid ? "file-error" : ""}`}>
        {data.name}
      </span>
      <span className="file-size">
        ({bytes(data.size, { decimalPlaces: 2 })})
      </span>{" "}
      {data.invalid && (
        <span className="file-error-message">({errorMessage})</span>
      )}
      <button className="file-remove" onClick={() => removePhoto(data.name)}>
        remove
      </button>
    </div>
  );
}
