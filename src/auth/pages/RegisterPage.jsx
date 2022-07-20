
import {Link as routerLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"
import { AuthLayout } from '../layout/AuthLayout'


const formData={
    email: 'algo@algo.com',
    password:'123456', 
    password2:'123456', 
    displayName: 'Antonio Banderas'
}

// Objeto de validaciones, contiene la función que deseo ejecutar, y el mensaje de error
// Este objeto es usado en useForm
const formValidations={
  email: [(value)=>value.includes('@'), 'El correo debe contener @' ],
  password: [(value)=>value.length>=6,  'El password debe tener mínimo 6 letras' ],
  displayName: [(value)=>value.length>=1,  'El nombre es obligatorio' ],
  password2: [(value)=>value===formData.password ,  'Las contraseñas no coinciden' ],
}


export const RegisterPage = () => {
  
  
  const dispatch = useDispatch();

  //Traigo los estados de las varaibles globales, /store/auth/authslices
  const {status, errorMessage}    = useSelector(state=>state.auth);

  //isCheckingAuthentication, sirve para desabilitar botón
  const isCheckingAuthentication  = useMemo(()=>status==='checking',[status])

  // Variable para saber si el formulario ya fue submitted
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Traemos variables y funciones del useForm
  const {displayName, email, password, password2, onInputChange,
        formState, isFormValid, displayNameValid, emailValid, passwordValid, password2Valid,
        }=useForm(formData,formValidations)
  
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); //Cambiamos estado
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState)) //Thunks
  }
    
  return (  
        <AuthLayout title='Crear cuenta'>               
          <form 
            className='animate__animated animate__fadeIn animate__faster'
            onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField
                  required
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
                  fullWidth
                  name="displayName"
                  onChange={onInputChange}
                  error={!!displayNameValid && formSubmitted /*Casilla roja por error*/}
                  helperText={displayNameValid /*Texto error bajo la casilla*/} 
                  />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  required
                  label="Correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={emailValid}/>
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  name="password"
                  onChange={onInputChange}
                  error={!!passwordValid  && formSubmitted}
                  helperText={passwordValid}/>
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="confirmar contaseña"
                  fullWidth
                  name="password2"
                  onChange={onInputChange}
                  error={!!password2Valid  && formSubmitted}
                  helperText={password2Valid}/>
              </Grid>

              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} 
                  display={!!errorMessage  ? '' :'none'}
                >
                  <Alert severity='error'>{errorMessage} </Alert>
                </Grid>               
              </Grid> 

 
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} >
                  <Button type="submit"
                    disabled={isCheckingAuthentication}
                    variant='contained' fullWidth>
                      Crear Cuenta
                  </Button>
                </Grid>               
              </Grid> 
              <Grid container direction='row' justifyContent='end'>
                <Link component={routerLink } color='inherit' to='/auth/login'>
                  Ya tengo cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
        </AuthLayout>
  )
}
