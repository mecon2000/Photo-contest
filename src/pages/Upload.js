import React, { useEffect, useState } from "react";
import { FileList } from "../components/FileList";
import { readFileFromHd } from "../services/photoService";

export function Upload() {
  const [photoFiles, setPhotoFiles] = useState([]);
  useEffect(
    (prev) => {
      console.log({ prevPhotoFiles: prev, photoFiles: photoFiles });
    },
    [photoFiles]
  );

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
  const onSelectedFilesChanged = ({ target }) => {
    if (target.files.length) {
      handleFiles(target.files);
    }
  };

  const uniquify = (files) => {
    return files.filter(
      (file, index, arr) =>
        index ===
        arr.findIndex((v) => v.name === file.name && v.size === file.size)
    );
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const validateFiles = (files) => {
    return files.filter((file) => validateFile(file));
  };

  const handleFiles = async (newFiles) => {
    const newFilesArr = Array.from(newFiles);
    const uniqueFiles = uniquify([
      ...photoFiles,
      ...validateFiles(newFilesArr),
    ]);

    await Promise.all(uniqueFiles.map(async (file) => {
      if (!file.photoDataUrl) {
        file.photoDataUrl = await readFileFromHd (file);
    }}));

    setPhotoFiles(uniqueFiles);
  };

  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const uploadPhotos = (e) => {
    // const userId = 1
    // const contestId = 1
    uploadPhotos({ files: photoFiles, contestId: 1, userId: 1 });
  };

  return (
    <main className="main-container">
      <h1>Upload your photos here</h1>
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
          onChange={onSelectedFilesChanged}
        />
      </label>
      <FileList validFiles={photoFiles} />
      <button onClick={uploadPhotos}>Upload!</button>
    </main>
  );
}
