import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from "./journalSlice";


// Se despacha cuando se oprima el botónm del más
export const startNewNote = () => {
    return async (dispatch, getState)=>{
        dispatch(savingNewNote()) 
        
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }


        //NOTA EN EL BACKEND Firebase
        //Referencia ID a fireBase y crea nota
        ///ID_usuario/journal/notes/id_nota
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)

        //Asignamos la propiedad ID en front generada por el back
        newNote.id=newDoc.id;

        dispatch(addNewEmptyNote(newNote)); 
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe')
        const notes= await loadNotes(uid)
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState)=>{
        dispatch(setSaving);
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        const noteToFireStore={...activeNote};
        delete noteToFireStore.id;
        const docRef=doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await setDoc(docRef, noteToFireStore, {merge:true}) //Merge: Mantener los campos en el back que aquí no mantengo
        dispatch(updateNote(activeNote))        
    }
}

