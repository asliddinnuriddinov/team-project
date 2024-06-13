import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validateToken from "../helpers/validateToken"
import { Navigate, Outlet } from 'react-router-dom'
import AuthContainer from './AuthContainer'

const AdminPrivate = () => {
  const token=useSelector(state=>state.token)
  const dispatch=useDispatch()

  useEffect(()=>{
    const isTokenValid=token&&validateToken(token)

    if(!isTokenValid){
      dispatch({type:"LOGOUT"})
    }
  },[token,dispatch])
  return token? (
      <AuthContainer>
        <Outlet/>
      </AuthContainer>
  ):
  <Navigate  to={'/'}/>
}

export default AdminPrivate