import React from "react";

export function Upload() {

  const onFilesDrop = (e) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    console.log("files:", files);
    // if (files.length) {
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
    // }
  };
  return (
    <main>
      <h1>hi</h1>
      <div
        className="drop-container"
        onDragOver={(e) => {e.preventDefault()}}
        onDragEnter={(e) => {e.preventDefault()}}
        onDragLeave={(e) => {e.preventDefault()}}
        onDrop={onFilesDrop}
        // onClick={fileInputClicked}
        style={{ background: "red" }}
      >
        <div className="drop-message">
          <div className="upload-icon"></div>
          Drag & Drop files here or click to select file(s)
        </div>
        <input
          // ref={fileInputRef}
          className="file-input"
          type="file"
          multiple
        />
        {/* onChange={filesSelected} */}
      </div>
    </main>
  )
}

