import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadCleanNotes } from "../../helpers/loadCleanNotes";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById, deleteImageByURL } from "./journalSlice";


// Se despacha cuando se oprima el botónm del más (Crear una nueva nota)
export const startNewNote = () => {
    return async (dispatch, getState)=>{
        dispatch(savingNewNote())         
        const {uid} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageURL: [],
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
        const notes= await loadCleanNotes(uid)
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState)=>{
        const {messageSaved} = getState().journal;
        
        dispatch(setSaving());
        
        
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        const noteToFireStore={...activeNote};
        delete noteToFireStore.id;
        console.log('despues',messageSaved)
        //console.log('startSaveNote ',`${uid}/journal/notes/${activeNote.id}`)
        const docRef=doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await setDoc(docRef, noteToFireStore, {merge:true}) //Merge: Mantener los campos en el back que aquí no mantengo
        dispatch(updateNote(activeNote))    
        console.log('despues de base de datos',messageSaved)    
    }
}


export const startUploadingFiles = (files=[]) => {
    return async(dispatch, getState)=>{
        dispatch(setSaving());
        const {activeNote} = getState().journal;
        //await fileUpload(files[0])  // Si fuera solo un archivo

        const fileUploadPromises=[];
        for(const file of files){
            
            //fileUploadPromises.push(fileUpload(file))
            const response=fileUpload(file)
            if(!response.error)fileUploadPromises.push(response)
        }
        const photosUrls=await Promise.all(fileUploadPromises);
        console.log('imagen creada en cloudinary')
        dispatch(setPhotosToActiveNote(photosUrls)); 
    }
}

export const startDeletingImage = (imageURL='') => {
    return async (dispatch) => {
        // todo : borrar imagen cloudinary
        dispatch(deleteImageByURL(imageURL)); 
    }     
 }

 export const startDeletingNote = () => {
    return async (dispatch,getState) => {
        const {uid} = getState().auth;
        const {activeNote}=getState().journal;

        const docRef=doc(FirebaseDB,`${uid}/journal/notes/${activeNote.id}`)
        await deleteDoc(docRef);
        dispatch(deleteNoteById (activeNote.id))
    }     
 }