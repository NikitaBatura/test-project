import React from 'react'
import './LeftMenu.css'
import { AiFillCheckCircle} from 'react-icons/ai'
export default function LeftMenu(props){
    // Лучше исаользовать было тэг iframe чтобы левое еню прокручивалось отдельно от основного
    return (
       props.dropzone.length !== 0?<aside className="leftMenu">
            {
             props.dropzone.map((file,i)=>{
                 return (
            <div key={i} className="leftMenu__areaImage">
            <div my={props.my} className="leftMenu__numberImage">{i+1}</div>
            <div className="leftMenu_image">{file.imageLabel ? <div className="leftMenu_image__icon"><AiFillCheckCircle size="25px" color="#ffb703" /></div>:null}< img  onClick={()=>props.onPutMark(i,file.preview)} src={file.preview} alt="приносим извинения"/ ></div>
            </div>
                 )
             })

            }
        </aside>:null 
    )
}