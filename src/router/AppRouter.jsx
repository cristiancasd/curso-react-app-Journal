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
