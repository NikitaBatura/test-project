import React from 'react'
import './ListNodes.css'

export default function ListNodes(props){
    return (
       props.comentsPreview.length?<div className="listNodes">
            <h2>Заметки:</h2>
            {props.comentsPreview.map((comment,i)=>{
                return (
               <div onClick={()=>props.onPutListNode(i)} key = {i} className = {comment.marker === true ? "listNodes__marker":"listNodes__block"}>
                {comment.node}
                </div>
                )
            })}
        </div>:null
    ) 
}