import bytes from "bytes";
import React from "react";

export function FilePreview(props) {
  const { file: data } = props;
  console.log({ data: data });
  const openImageModal = (x) => {};
  const removeFile = (x) => {};
  const errorMessage = "Error";
  console.log(data);
  return (
    <div
      className="file-preview"
      onClick={
        !data.invalid ? () => openImageModal(data) : () => removeFile(data.name)
      }
    >
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
      <button className="file-remove" onClick={() => removeFile(data.name)}>
        remove
      </button>
    </div>
  );
}
