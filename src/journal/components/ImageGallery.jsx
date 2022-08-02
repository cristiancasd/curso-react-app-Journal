import { DeleteOutline } from '@mui/icons-material';
import { ImageListItem, ImageList, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startDeletingImage } from '../../store/journal/thunks';



export const ImageGallery = ({ images=[] }) => {
  
  const dispatch = useDispatch();
  const onDeleteImage=(event,imageURL='no hay url')=>{
    dispatch(startDeletingImage(imageURL))
  }

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {    
          images.map((image) => (           
            
              
              <ImageListItem key={image}>
                <Grid container justifyContent='end'>
                    <Button
                        onClick={(event)=>onDeleteImage(event,image)}
                        sx={{mt:2}}
                        >
                        <DeleteOutline/>
                                               
                    </Button>
                </Grid>
                
                <img
                  src={`${image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="Imagen de la nota"
                  loading="lazy"
                />
              </ImageListItem>

            
          ))
          
      }
    </ImageList>
  );
}