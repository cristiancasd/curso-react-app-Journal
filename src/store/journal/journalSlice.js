import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
   name: 'journal',
   initialState:{
       isSaving: false,
       messageSaved:'',
       notes:[],
       activeNote:null,
       imageVectorChanged:false
   },
   reducers: {
      savingNewNote:(state)=>{
         state.isSaving=true;
      },

      addNewEmptyNote: (state, action) => {
         state.notes.push(action.payload);
         state.isSaving=false;
      },
      setActiveNote: (state, action) => {
         state.activeNote=action.payload;
         state.messageSaved='';
      },
      setNotes: (state, action) => {
         state.notes=action.payload;
         state.isSaving=false;
      },
      setSaving: (state) => {
         state.isSaving=true;
         state.messageSaved='';
      },
      updateNote: (state, action) => { //payload: es la nota actualizada
         state.imageVectorChanged=false;
         state.isSaving=false;
         state.notes=state.notes.map(note=>{
            if(note.id===action.payload.id) return action.payload;
            return note;
         });
         state.messageSaved=`${action.payload.title}, actualizada correctamente`;
      },
      setPhotosToActiveNote:(state,action)=>{    
         state.activeNote.imageURL=[...state.activeNote.imageURL, ...action.payload]          
         state.isSaving=false;
         state.imageVectorChanged=true;
      },

      clearNotesLogout:(state) =>{
         state.isSaving=false;
         state.messageSaved='';
         state.notes=[];
         state.activeNote=null;
      },

      deleteImageByURL: (state, action) => { 
         state.activeNote.imageURL=state.activeNote.imageURL.filter(activeNoteUrl=>activeNoteUrl!==action.payload)
         state.imageVectorChanged=true;  
      },

      deleteNoteById: (state, action) => {
         state.activeNote=null;
         state.notes=state.notes.filter(note=>note.id!==action.payload)
         state.messageSaved=`${action.payload.title}, Nota Eliminada`;        
      },
   },
})

export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    deleteNoteById,
    clearNotesLogout,
    deleteImageByURL
 } = journalSlice.actions