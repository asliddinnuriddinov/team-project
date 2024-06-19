import React, { useState } from 'react'
import { BiSolidCategory } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { FaCity,FaCar,FaChevronRight, FaChevronLeft  } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Aside = () => {
    const [open,setOpen]=useState(false)
  return (
    <aside className={`flex flex-col min-h-fit bg-[#001529] pt-5 ${open?'px-8 w-[270px]':'px-3 w-[90px]'} text-nav-main relative transition-all duration-500`}>

        {
            open?
            <>
            <h1 className='font-bold text-xl mb-5'>Avtozoom Admin</h1>
            <ul className='flex flex-col gap-5'>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/admin/categories'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1'>
                        <BiSolidCategory/>
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/admin/brands'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1'>
                        <AiFillShop/>
                        Brands
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/admin/cities'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1'>
                        <FaCity/>
                        Cities
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/admin/locations'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1'>
                        <IoLocationSharp/>
                        Locations
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/admin/cars'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1'>
                        <FaCar/>
                        Cars
                    </NavLink>
                </li>
            </ul>
            </>
            :
            <>
            <h1 className='mb-5'><img width={75} src="/assets/logo.svg" alt="" /></h1>
            <ul className='flex flex-col items-center gap-5'>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/admin/categories'} className='text-2xl'>
                        <BiSolidCategory/>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/admin/brands'} className='text-2xl'>
                        <AiFillShop/>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/admin/cities'} className='text-2xl'>
                        <FaCity/>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/admin/locations'} className='text-2xl'>
                        <IoLocationSharp/>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/admin/cars'} className='text-2xl '>
                        <FaCar/>
                    </NavLink>
                </li>
            </ul>
            </>
        }



        {
            !open?
            <button onClick={e=>setOpen(true)} className='absolute top-3 right-[-45%] rounded-md z-30 bg-primary text-white p-2'>
                <FaChevronRight className='text-lg'/>
            </button>
            :
            <button onClick={e=>setOpen(false)} className='absolute top-3 right-[-20%] rounded-md z-30 bg-primary text-white p-2'>
                <FaChevronLeft className='text-lg'/>
            </button>
        }
    </aside>
  )
}

export default Aside