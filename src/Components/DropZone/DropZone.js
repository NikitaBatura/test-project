import React from 'react'
import './DropZone.css'
import Dropzone from "react-dropzone";

export default function DropZone(props){
    return (
        
            <Dropzone
              onDrop={files => {
                props.addFilesToDropzone(files, "dropzone");
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropZone">
                  <input {...getInputProps()} />
                  <div className="dropZone__container">
                    <p>Нажмите на область или перетащите изображения чтобы добавить</p>
                  </div>
                </div>
              )}
            </Dropzone>
    )
}