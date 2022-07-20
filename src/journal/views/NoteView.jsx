import { SaveOutlined } from "@mui/icons-material"
import { Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

export const NoteView = () => {
  return (
    <Grid 
    className='animate__animated animate__fadeIn animate__faster'

        container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'> texto x</Typography>
        </Grid>
        <Grid item>
            <button color='primary' sx={{padding:2}}>
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
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="Que sucedio hoy?"
                minRows={5}
/>
        </Grid>
        <ImageGallery />
    </Grid>
  )
}
