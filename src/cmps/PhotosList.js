import React from 'react'

export function PhotosList(props) {
    const {files}=props;
    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    
    const fileSize = (size) => {
        if (size === 0) {
          return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const openImageModal=()=>{};
    const removeFile = openImageModal;
    const errorMessage=''
    return (
        <ul>
            {
                files.map((file, i) =>
                    <li className="file-status-bar" key={i}>
                        
                        <div onClick={!file.invalid ? () => openImageModal(file) : () => removeFile(file.name)}>
                            <div className="file-type-logo"></div>
                            <div className="file-type">{fileType(file.name)}</div>
                            <span className={`file-name ${file.invalid ? 'file-error' : ''}`}>{file.name}</span>
                            <span className="file-size">({fileSize(file.size)})</span> {file.invalid && <span className='file-error-message'>({errorMessage})</span>}
                        </div>
                        <div className="file-remove" onClick={() => removeFile(file.name)}>X</div>
                    </li>
                )
            }
        </ul>
    )
}

