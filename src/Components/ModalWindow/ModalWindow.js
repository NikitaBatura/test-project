import React from 'react'
import './ModalWindow.css'

export default function ModalWindow (props){
    
  return(
              props.modalWindow?<div className="modal" onClick={props.modalWindowClose}>
              <div  className="modal__content" onClick={e => e.stopPropagation()}>
                  <div  className="modal__heading">
                     <h2>Оставьте заметку на данное изображение</h2>
                  </div>
                  <div className="modal__comments">
                  <textarea ref={props.textComments} placeholder="Введите заметку"></textarea>
                  </div>
                  <div className='modal__buttons'>
                     <input type="button" value="Ок" onClick={()=>props.onAddNote(props.textComments)} />
                     <input onClick={()=>props.modalWindowClose()} type="button" value="Отмена" />
                  </div>
               </div>
          </div>:null
      )
}
