import {Link as routerLink} from 'react-router-dom'
import {Google} from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuthentication , startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

const formData={
  email:'',
  password:''
}
 
export const LoginPage = () => {
  
  //Usar Redux
  const dispatch = useDispatch(); 
  const {status,errorMessage} = useSelector(state => state.auth)   

  const {email, password, onInputChange,formState}=useForm(formData)

  const isAuthenticating = useMemo(()=>status === 'checking', [status])

  const onSubmit=(event)=>{
    event.preventDefault();
    //dispatch(checkingAuthentication()) //Función THUNKS
    dispatch(startLoginWithEmailPassword (formState))

  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())      //Función THUNKS
  
  } 
  
  return (
        
        // AuthLayout contiene la caja en el medio y el fondo
        <AuthLayout title='Login'>
        {/*
        xs: Tamaño elementio en pantalla pequeña (12 es toda)
        sm  Tamaño elemento en pantalla grande(12 es toda)
        sx  Espacio padding {{mb: abajo, mt: arriba}}
        */}
          <form 
            className='animate__animated animate__fadeIn animate__faster'
            onSubmit={onSubmit}>
              
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}/>
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange} />
              </Grid>

              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} 
                  display={!!errorMessage  ? '' :'none'}
                >
                  <Alert severity='error'>{errorMessage} </Alert>
                </Grid>               
              </Grid> 
 
              
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} sm={6}>
                  <Button type="submit" 
                  variant='contained' 
                  disabled={isAuthenticating}
                  fullWidth>
                      Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    disabled={isAuthenticating}
                    variant='contained' 
                    fullWidth
                    onClick={onGoogleSignIn}>
                    <Google />
                      <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={routerLink} color='inherit' to='/auth/register'>
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
        </AuthLayout>   
  )
}
