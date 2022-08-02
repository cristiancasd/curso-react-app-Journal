import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useEffect, useMemo, useRef } from "react"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components/imageGallery"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import { setActiveNote } from "../../store/journal/journalSlice"


export const NoteView = () => {

    const dispatch = useDispatch();
    const {activeNote,messageSaved,isSaving,imageVectorChanged} = useSelector(state=>state.journal)
    const {body, title, date, onInputChange, formState} = useForm(activeNote)
    const fileInputRef=useRef();
   

    const dateString=useMemo(()=>{
        const newDate = new Date(date)
        return newDate.toUTCString()
    },[date])


    useEffect(()=>{       //Actualizar Front-Redux cada vez que se agregue o elimine una imagen
        imageVectorChanged && dispatch(startSaveNote())
    },[imageVectorChanged])


    useEffect(()=>{
        if(messageSaved.length>0){
            Swal.fire('Nota actualizada', messageSaved,'success')
        }
    },[messageSaved])
    
    //useEffect(() => {// Cada vez que hay un cambio guardo la nota Activa cada modificacion
    //  dispatch(setActiveNote(formState));
    //}, [formState])

    const onSaveNote=()=>{
        console.log('estoy en saveNote')
        dispatch(setActiveNote(formState)); // puedo colocarlo aparte en un useEffect
        title===''
            ? Swal.fire('El titulo es obligatorio', 'Titulo es obligatorio','error')
            : dispatch(startSaveNote())
    }
    
    const onFileInputChange=({target})=>{
        dispatch(setActiveNote(formState));
        if(target.files===0)   return;        
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete=()=>{
        dispatch(startDeletingNote());
    }
    

    return (
    <Grid 
        className='animate__animated animate__fadeIn animate__faster'
        container 
        direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString} </Typography>
        </Grid>
        <Grid item>
            <input
               
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{display:'none'}}
            />            
            <Button
                color="primary"
                disabled={isSaving||title==''}
                onClick={()=>fileInputRef.current.click()}
            >
                <UploadOutlined sx={{fontSize: 30, mr:1}}/>
                Subir Foto
            </Button>
            

            <Button
                disabled={isSaving||title==''}
                onClick={onSaveNote}
                color='primary' sx={{padding:2}}>
                <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                Guardar
            </Button>


            
        </Grid>
        
        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                
                placeholder="Ingrese Titulo"
                label='Titulo'
                sx={{border:'none', mb:1}}
                name='title'
                value={title}
                onChange={onInputChange}
                required
                
            
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="Que sucedio hoy?"
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}              
            />
        </Grid>
        <Grid container justifyContent='end'>
            <Button
                onClick={onDelete}
                sx={{mt:2}}
                color="error"    
            >
                <DeleteOutline/>
                Borrar
            </Button>
        </Grid>
        <ImageGallery  images={activeNote.imageURL}/>
    </Grid>
  )
}
