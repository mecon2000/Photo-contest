import React from 'react'
import { FilePreview } from './FilePreview'

export function FileList(props) {
    const  {validFiles} = props;

    //TODO: key should be the file name, and filename must be unique! have to check that when validating the files

    // let validFiles = [{invalid:false,name:'baba',size:1024}]

    return (
        <div className="file-display-container">
        {
          validFiles.map((file, i) => <FilePreview file={file} key={file.name + file.size}/>
          )
        }
      </div>
    )
}


