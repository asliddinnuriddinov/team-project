import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const AuthContainer = () => {
    const [tokenValid,setTokenValid]=useState(false)
    const token=useSelector(state=>state.token)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(token.length>150){
            setTokenValid(true)
        }
        else{
            setTokenValid(false)
            dispatch({type:"LOGOUT"})
        }
    },[])
  return tokenValid?(
    <Outlet/>
  ):
  <></>
}

export default AuthContainer