import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { startSaveNote, startUpLoadingFile } from "../../R_actions/notes";

export const NotesAppBar = () => {
const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const noteDate = moment(note.date);

const handleSave =()=>{
  dispatch(startSaveNote(note))
}


const handlePicture =()=>{
  //permite manipular el input oculto de tipo browser file desde esta instancia
  document.querySelector('#fileSelector').click()
};
const handleFileChange =(e)=>{
 const fileDir= e.target.files[0]; 
 if(fileDir){
  dispatch(startUpLoadingFile(fileDir))
 }
};

  
  return (
    <div className="notes__appbar">
      <span>{noteDate.format("MMM Do YYYY")}</span>

      <input
      id="fileSelector"
      name="file"
      type="file"
      style={{display:'none'}}
      onChange={handleFileChange}/>

      <div>
        <button className="btn" onClick={handlePicture} >picture</button>
        <button className="btn" onClick={handleSave}>save</button>
      </div>
    </div>
  ); 
};
