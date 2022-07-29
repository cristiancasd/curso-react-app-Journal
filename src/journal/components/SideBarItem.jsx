import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { useDispatch } from 'react-redux/es/exports'

export const SideBarItem = ({title,body,id,date}) => {

  const dispatch = useDispatch();
  
  const newTitle = useMemo(() => {
    return title.length>15 
                ? title.substring(0,15)+'...'
                : title;
  }, [title])

  const newBody = useMemo(() => {
    return body.length>80
                ? body.substring(0,80)+'...'
                : body;
  }, [body])



  //setActiveNote({title,body,id,date})
  const onClickNote =()=>{
      dispatch(setActiveNote({title,body,id,date}));  
  }
  return (
    <ListItem disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ newBody } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
