
import React from "react";
import { FileList } from "../components/FileList";
import { readAndUploadFiles } from "../services/photoService";

export function Upload() {
  const onFilesDrop = (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
      //   for (const file of files) {
      //     // if (validateFile(file)) {
      //     //     setSelectedFiles(prevArray => [...prevArray, file]);
      //     // } else {
      //     //     file['invalid'] = true;
      //     //     setSelectedFiles(prevArray => [...prevArray, file]);
      //     //     setErrorMessage('File type not permitted');
      //     //     setUnsupportedFiles(prevArray => [...prevArray, file]);
      //     // }
      //   }
    }
  };
  const filesSelected = ({ target }) => {
    if (target.files.length) {
      handleFiles(target.files);
    }
  };

  const handleFiles = async (files) => {
    try {
      await readAndUploadFiles(files,1,2);
      //show success
    } catch (error) {
      //show an error
    }
  };

  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <main className="main-container">
      <h1>upload your photos here</h1>
      <h1>NEW COMPONENT GOOODDDD!!!!!</h1>
      <label
        className="drop-container"
        onDragOver={noop}
        onDragEnter={noop}
        onDragLeave={noop}
        onDrop={onFilesDrop}
      >
        <div className="drop-message">
          <div className="upload-icon"></div>
          Drag & Drop files here or click to select file(s)
        </div>
        <input
          className="file-input"
          type="file"
          multiple
          onChange={filesSelected}
        />
      </label>
      <FileList/>
    </main>
  );
}
