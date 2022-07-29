import { SaveOutlined } from "@mui/icons-material"
import { Grid, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components/imageGallery"
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useEffect, useMemo } from "react"
import { startSaveNote } from "../../store/journal/thunks"
import { setActiveNote } from "../../store/journal/journalSlice"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'



export const NoteView = () => {
    const dispatch = useDispatch();
    const {activeNote,messageSaved,isSaving} = useSelector(state=>state.journal)

    const {body, title, date, onInputChange, formState} = useForm(activeNote)
  
    const dateString=useMemo(()=>{
        const newDate = new Date(date)
        return newDate.toUTCString()
    },[date])

    useEffect(()=>{
        if(messageSaved.length>0){
            Swal.fire('Nota actualizada', messageSaved,'success')
        }
    },[messageSaved])
    
    //useEffect(() => {// Cada vez que hay un cambio guardo la nota Activa cada modificacion
    //  dispatch(setActiveNote(formState));
    //}, [formState])

    const onSaveNote=()=>{
        dispatch(setActiveNote(formState)); // puedo colocarlo aparte en un useEffect
        dispatch(startSaveNote())
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
            <button 
                disabled={isSaving}
                onClick={onSaveNote}
                color='primary' sx={{padding:2}}>
                <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                Guardar
            </button>
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
        <ImageGallery />
    </Grid>
  )
}
