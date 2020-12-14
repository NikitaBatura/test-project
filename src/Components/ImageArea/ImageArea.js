import React from 'react'
import './ImageArea.css'
import ListNodes from '../ListNodes/ListNodes'

export default function ImageArea(props) {
return (
    <main>
       { props.imageArea.previewImage?<div className="imageArea">
            <img onClick={()=>props.modalWindowClose()} src={props.imageArea.previewImage} alt="изображения нету" className='imageArea__image' />
                            </div>:null}
         <ListNodes onPutListNode={props.onPutListNode} comentsPreview={props.imageArea.commentsPreview} />
    </main>
)
}