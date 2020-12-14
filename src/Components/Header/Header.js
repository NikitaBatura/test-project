import React from 'react'
import './Header.css'
import DropZone from '../DropZone/DropZone'
import SeachInput from '../UI/SeachInput/SeachInput'
import LoginButton from '../UI/LoginButton/LoginButton'
export default function Header(props){
    return (
      <div className="header">
        <header>
          < DropZone addFilesToDropzone={props.addFilesToDropzone}/ >
            <div className="heder__ui">
              <SeachInput />
              <LoginButton />
            </div>
        </header>
        </div>
    )
}