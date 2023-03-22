import { createSlice } from '@reduxjs/toolkit'
import { startTransition } from 'react'

export const authSlice = createSlice({
   name: 'auth',
   initialState:{
       status:'not-authentication',
       uid: null,
       email: null,
       displayName: null,
       photoURL: null,
       errorMessage: null
   },
   reducers: { 
      login: (state,{payload}) => {
         //console.log('login authSlice payload', payload)
         state.status       =  'authenticated'
         state.uid          =  payload.uid
         state.email        =  payload.email
         state.displayName  =  payload.displayName
         state.photoURL     =  payload.photoURL
         state.errorMessage =  null
      },

      logout: (state,{payload}) => {
        // console.log('logout authSlice payload', payload)
         state.status       =  'not-authenticated'
         state.uid          =  null
         state.email        =  null
         state.displayName  =  null
         state.photoURL     =  null
         state.errorMessage =  payload?.errorMessage
      },
      checkingCredentials: (state) => {
         state.status='checking';
      }
   },
})
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions