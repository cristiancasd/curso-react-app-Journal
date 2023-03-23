import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'

export const AppRouter = () => {

  //Hook con la logica saber si hay usuario autenticado
  const {status}=useCheckAuth();  

  if(status==='checking'){
    return <CheckingAuth/> //PANTALLA Circulo de procesando
  }
  
  console.log('import.meta.env.MODE', import.meta.env.MODE)
  try{
    console.log('voy a intentar leer process.env')    
    //console.log('process.env.NODE_ENV', process.env.MODE)
    console.log('pr.NODE_ENV', process.env.NODE_ENV)
    console.log('pr.NODE_ENV', process.env.REACT_APP_FIREBASE_APIKEY)
  }catch(error){
    console.log('no se pudo');
    console.log(error)
  }

  return (
    <Routes>
      {
        (status==='authenticated')
          ? <Route path='/*'      element={<JournalRoutes/>} /> 
          : <Route path='/auth/*' element={<AuthRoutes />}/>
      }        
        <Route path='/*' element={<Navigate to='/auth/login' /> } />
    </Routes>
  )
}
