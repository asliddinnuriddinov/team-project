import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Nav = () => {
    const dispatch=useDispatch()
    const [modal,setModal]=useState(false)
  return (
    <nav className='w-full h-[70px] flex items-center justify-end pr-14'>
        <button onClick={e=>{setModal(true)}} className='bg-danger text-white px-10 py-2 rounded-md font-semibold'>
            Log Out
        </button>
        <div className={`fixed w-full h-full top-0 left-0 z-50 bg-[#00000041] items-center justify-center ${modal?'flex':'hidden'}`}>
            <div className='bg-white shadow-black rounded-2xl px-5 py-10'>
                <p className='text-lg font-semibold'>You really want to Log Out?</p>
                <div className='flex items-center justify-center gap-4 mt-8'>
                    <button className='bg-primary text-white rounded-md px-6 py-2' onClick={e=>{setModal(false)}}>Cancel</button>
                    <button className='bg-danger text-white rounded-md px-6 py-2' onClick={e=>{dispatch({type:"LOGOUT"});setModal(false)}}>Yes</button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav