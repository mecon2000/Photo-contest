import bytes from "bytes";
import React, { useContext } from "react";
import { CallbackContext } from "../pages/Upload";
export function FilePreview(props) {
  const { file: data } = props;

  const { removePhoto, openPhoto } = useContext(CallbackContext);

  console.log({ data: data });
  const openImageModal = (e) => {
    openPhoto(data.photoDataUrl);
  };

  const onRemovePhoto = (e) => {
    e.stopPropagation();
    removePhoto(data.name);
  };

  const errorMessage = "Error";
  console.log(data);
  return (
    <div className="file-preview" onClick={openImageModal}>
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
      <button className="file-remove" onClick={onRemovePhoto}>
        remove
      </button>
    </div>
  );
}
