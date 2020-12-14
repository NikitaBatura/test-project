import './App.css';
import React from 'react'
import Header from './Components/Header/Header'
import LeftMenu from './Components/LeftMenu/LeftMenu'
import ImageArea from './Components/ImageArea/ImageArea'
import ModalWindow from './Components/ModalWindow/ModalWindow'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzone: [],
      modalWindow: false,
      imageArea: {
        previewImage: "",
        commentsPreview: []
      }
    };
    this.textComments = React.createRef()
  }
  /*При передачи параметров в функции лучше всего было использовать метод bind(this, params) так оптимизированней
    в целях упрощения для самого себя я использовал стрелочные функции, также все параметры в функциональных
    компонентах можно было использовать деструктуризацию в данном тестовом проекте я использовал props
   */
  /* Данная тестовая задача усложнена тем, что пользователь может добавлять изображения но некоторые 
  изображения могут повторяться поэтому чтобы пользователя не затруднять ставить на одни и теже изображения
   одни и теже заметки при добавлении заметки на одно изображение эта же заметка будет добавляться на
   идентичные этому же изображению, это справедливо и для выделения заметки
  */
  //Закрытие/открытие модального окна
  modalWindowClose=()=>{
    let close = !this.state.modalWindow;
    this.setState({modalWindow: close})
  }
  // Добавление новых изображений
  addFilesToDropzone=(files,dropzone) => {
    let filesWithPreview = [];
    files.forEach(file => {
      //В случае если добавлена именно изображение
      if (file.name.endsWith('jpg') || file.name.endsWith('jpeg') || file.name.endsWith('.png') || file.name.endsWith('.gif') || file.name.endsWith('.bmp')) {
       file["preview"] = URL.createObjectURL(file);
       file['comments'] = [];
       file['imageLabel'] = false;
       filesWithPreview.push(file);
       
      }     
    });
    // Обнуление всех комментариев изображений
    let oldDropzoneFiles =[...this.state[dropzone]]
    oldDropzoneFiles.forEach(elem=>{
       elem.comments = [];
    })
    const newFiles = [...oldDropzoneFiles, ...filesWithPreview];
       this.setState({ dropzone: newFiles, imageArea:{commentsPreview: [], previewImage: this.state.imageArea.previewImage}});
  }
  // Добавление заметки к конкретноу изображению
  onAddNote = (elem)=> {
    // значение нашего окна в которое вводи коментарий
   let node = elem.current.value.replace(/ +/g, ' ').trim();
   if(node.length > 1) {
   let dropzone = [...this.state.dropzone];
   let previewImage = this.state.imageArea.previewImage;
   let currentElement = dropzone.find((elem)=>elem.preview === previewImage);
   let arrayIndexesIdenticalElements = [];
   dropzone.forEach((elem,i)=>{
     if (elem.name === currentElement.name) {
       arrayIndexesIdenticalElements.push(i)
     }
   })
   arrayIndexesIdenticalElements.forEach(index=>{
     if(dropzone[index].comments.length === 0){
           dropzone[index].comments.push({node: node, marker: true})
     }
     else{
       let elemTrueMarker = dropzone[index].comments.find(elem=>elem.marker === true);
       elemTrueMarker.marker = false;
       /* да да я знаю что в некоторых местах можно было использовать более новый синтаксис ES6
        и вместо того чтобы писать {node: node} можно это написать просто {node}, извините)) */
       dropzone[index].comments.push({node: node, marker: true})
     }
   })
     this.setState({ dropzone: dropzone, modalWindow: false,
       imageArea: { previewImage: previewImage,  commentsPreview: currentElement.comments }})
   }
   } 
 
  // Проставление метки на добавленные изображения
  onPutMark =(i,preview)=>{
  let arrayDropzone = [...this.state.dropzone]
  const indexTruth = arrayDropzone.findIndex(valueArray => valueArray.imageLabel === true)
  if(indexTruth===-1){
    arrayDropzone[i].imageLabel = true;
    this.setState({dropzone: arrayDropzone,
                   imageArea: {previewImage: preview,
                               commentsPreview: arrayDropzone[i].comments
                               }
                  })
  }
  else{
    arrayDropzone[indexTruth].imageLabel = false;
    arrayDropzone[i].imageLabel = true;
    this.setState({
          dropzone: arrayDropzone,
          imageArea: {
            previewImage: preview,
            commentsPreview: arrayDropzone[i].comments
          }
    
    })
  }
  }
  // Выделение заметки 
  onPutListNode=i=>{
    let dropzone = this.state.dropzone;
     let dropzoneElementPreview = dropzone.find(elem=>elem.preview === this.state.imageArea.previewImage);
     let identicalIndexesDropzoneElements = [];
          dropzone.forEach((elem,index)=>{
       if (dropzoneElementPreview.name === elem.name) {
         identicalIndexesDropzoneElements.push(index)
       }
     })
     identicalIndexesDropzoneElements.forEach((indexElement)=>{
      let trueMarkerDropzoneElement = dropzone[indexElement].comments.find(elem=>elem.marker===true)
      trueMarkerDropzoneElement.marker = false
      dropzone[indexElement].comments[i].marker =true;
     })
     this.setState({
       dropzone: dropzone,
       imageArea: {
         commentsPreview: dropzoneElementPreview.comments,
         previewImage: dropzoneElementPreview.preview
       }
     })
  }
  render() {
    return (
      <div className="App">
        < Header onGetElement={this.onGetElement} primer = {this.primer}  addFilesToDropzone={this.addFilesToDropzone}/ >
        <div className="main">
          <LeftMenu dropzone={this.state.dropzone} onPutMark={this.onPutMark}/>
          <ImageArea onPutListNode={this.onPutListNode} imageArea={this.state.imageArea} modalWindowClose={this.modalWindowClose}/>
         </div>
         <ModalWindow onAddNote={this.onAddNote} textComments={this.textComments} modalWindow={this.state.modalWindow} modalWindowClose={this.modalWindowClose}/>
      </div>
    );
  }
}

export default App;