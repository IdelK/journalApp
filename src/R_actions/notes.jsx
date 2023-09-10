import { types } from "../R_types/types";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";


/************************ */
//metodo 1 asincrona se nombra star,usan el async awiat para el manejo de promesas,y tienen return
export const startNewNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote); //en Cloud Firestore/reglas/editar reglas/(allow read, write: if true;)
    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));

  };
};

//metodo 2
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {id, ...note, },
});

//metodo 3
export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {id,...note,},
});

/************************ */
/************************ */
//metodo 4 asincrona se nombra star,usan el async awiat para el manejo de promesas,y tienen return
export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

//metodo 5
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});
/************************ */
/************************ */
//metodo 6 asincrona se nombra star,usan el async awiat para el manejo de promesas,y tienen return
export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire("Saved", note.title, "success");
  };
};

//metodo 7 sincrona modifica el estado memoria
export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: { id,...note},
  },
});
/************************ */
/************************ */
//metodo 8 asincrona se nombra star,usan el async awiat para el manejo de promesas,y tienen return
export const startUpLoadingFile = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Loading",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    console.log(fileUrl);
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};
/************************ */
/************************ */
//metodo 9 asincrona se nombra star,usan el async awiat para el manejo de promesas,y tienen return
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
  };
};

//metodo 10 
const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});
/************************ */
/************************ */
//metodo 12
export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
/************************ */
