import React from 'react'

export function FilePreview(props) {
    const{file:data}=props
    const openImageModal = (x) => {}
    const removeFile = (x) => {}
    const fileType = (x) => 'jpg';
    const fileSize = (x) => 1024;
    const errorMessage = 'Error';
    console.log(data)
    return (
        <div className="file-status-bar">
            <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
                <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
            </div>
            <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
        </div>
    )
}


