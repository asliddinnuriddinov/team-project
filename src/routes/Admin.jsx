import React from 'react'
import Aside from '../components/common/Aside'
import Nav from '../components/common/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const Admin = () => {
  return (
    <div className='flex'>
      
      <Aside/>
      <div className='relative w-full flex flex-col justify-between h-[100vh]'>
        <Nav/>
        <Outlet/>
        <Footer/>
      </div>
    </div>
  )
}

export default Admin