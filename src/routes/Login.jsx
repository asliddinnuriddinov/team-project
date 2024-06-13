import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoIosEye,IoIosEyeOff  } from "react-icons/io";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const Login = () => {
    const scheme=z.object({
        phone:z.string().refine(
            (value) => /^\+?[0-9]{1,12}$/.test(value.replace(/\s/g, "")),
            'This field is required'
        ),
        password: z.string().min(3,{message:'This field is required'})
    })
    const {register,handleSubmit,reset, setError,formState:{isDirty,isSubmitting,errors}}=useForm({
        resolver: zodResolver(scheme)
    })
    const url='https://autoapi.dezinfeksiyatashkent.uz/api'
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [passwordOpen,setPasswordOpen]=useState(false)

    useEffect(()=>{
        if(localStorage.getItem('token')) navigate('/admin')
    },[])

    async function loginUser({ phone, password }) {
        try {
            const response = await axios.post(url + "/auth/signin", {
                phone_number: phone,
                password: password
            });
    
            if (response.data.data.tokens.accessToken.token) {
                const token = response.data.data.tokens.accessToken.token;
                localStorage.setItem('token', token);
                dispatch({ payload: token, type: "LOGIN" });
                navigate('/admin/categories');
                toast.success("Logged In Successfully", {
                    position: "top-center"
                });
                reset()
            }
        } catch (error) {
            toast.error("Wrong Number or Password, Try Again", {
                position: "top-center"
            });
            setError('root', {
                message: "Phone or Password is incorrect"
            });
        }
    }
    
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        <div className='shadow-login px-8 py-20'>
            <form onSubmit={handleSubmit(loginUser)} className='flex flex-col w-[400px] gap-8'>
                <div style={errors.phone||errors.root?{border:"1px solid red"}:null} className='flex items-center border-[1px] border-gray-500 h-[60px] px-3 rounded-2xl w-full'>
                    <input  {...register('phone')} className='w-full h-full outline-none' type="text" placeholder='Phone Numer'/>
                </div>
                <div style={errors.password||errors.root?{border:"1px solid red"}:null} className='flex items-center border-[1px] border-gray-500 h-[60px] px-3 rounded-2xl w-full'>
                    <input  {...register('password')} className='w-full h-full outline-none' type={passwordOpen?"text":"password"} placeholder='Password'/>
                    {
                        passwordOpen?
                        <IoIosEye className='text-2xl cursor-pointer' onClick={e=>setPasswordOpen(false)}/>
                        :
                        <IoIosEyeOff className='text-2xl cursor-pointer' onClick={e=>setPasswordOpen(true)}/>
                    }
                </div>
                <p className='text-red-500 text-center'>{errors.root?errors.root.message:""}</p>
                <button disabled={!isDirty||isSubmitting} className='bg-blue-500 h-[55px] flex items-center justify-center hover:opacity-75 text-xl rounded-2xl text-white'>
                    {
                        isSubmitting?
                        <img width={30} src="/assets/spinner-main.svg" alt="" />
                        :
                        'Log In'
                    }
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login