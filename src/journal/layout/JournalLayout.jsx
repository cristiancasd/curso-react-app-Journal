import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { Navbar } from "../components/Navbar"
import { SideBar } from "../components/SideBar";

//tamaño del sideBar, la columna izquierda
const drawerWidth=240;

export const JournalLayout = ({children}) => {
  return (    
    <Box sx={{ display: 'flex' }}
    className='animate__animated animate__fadeIn animate__faster'
    >
        <Navbar  drawerWidth={ drawerWidth } />
        <SideBar drawerWidth={ drawerWidth } />
        <Box
            component='main'
            sx={{ flexGrow: 1, p: 3 }}>

            <Toolbar/>
            { children }
        </Box> 
    </Box>
  )
}


