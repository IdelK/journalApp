import React, { useEffect, useRef } from "react";
import { NotesAppBar } from "./NotesAppBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { activeNote, startDeleting } from "../../R_actions/notes";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch= useDispatch();

  //#region sustituto del customHooks const [formValue, handleInputChanges, reset ] =  useForm(initialState)
  const [formValues, setValues] = useState(note);
  const handleInputChange = ({target}) => {
    setValues({ ...formValues, [target.name]: target.value });
  };
  //#endregion

  const { body, title,id } = formValues;
  const noteId = useRef(note.id);//y esto



  useEffect(() => {
    const reset = (newFormState = note) => {
      setValues(newFormState);
    };

    if (note.id !== noteId.current) {
      reset(note);
      noteId.current = note.id;
    }
  }, [note]);


  //se dispara actualizar la nota en el firestore cdo cambian los campos del formValues 
  useEffect(() => {
    dispatch(activeNote(formValues.id,{...formValues}));
  }, [formValues,dispatch]);

  const onDelete = () => {
    dispatch(startDeleting(id))//si pones noteId no elimina la nota activa de store ni del sidebar
  }  ;

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome text"
          className="notes__title-input"
          //**si no se pone name no deja escribir en el input**
          name="title"  
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="what happened today"
          className="notes__textarea"
         //**si no se pone name no deja escribir en el input**
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src={note.url}
              alt="imagen notescreen"
            />
          </div>
        )}
      </div>

      <button onClick={onDelete} className="btn btn-primary">delete</button>
    </div>
  );
};
