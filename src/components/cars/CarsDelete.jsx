import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CarsDelete = ({ isOpen, handleClose, id,reRenderTable }) => {
  const [isFetching,setIsFetching]=useState(false)
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api";

  async function deleteCar(){
    setIsFetching(true)
    try{
        const responce=await axios.delete(url+`/cars/${id}`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
        reRenderTable()
        toast.success("Deleted Car Successfully")
        handleClose()
        console.log(responce);
    }
    catch(err){
        toast.error("Something went wwrong, try again")
        console.log(err);
    }
    finally{
        setIsFetching(false)
    }
  }
  return isOpen ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[#00000048] flex items-center justify-center z-50"
    >
        <div className='bg-white shadow-black rounded-2xl px-5 py-10'>
            <p className='text-lg font-semibold'>You really want to Delete?</p>
            <div className='flex items-center justify-center gap-4 mt-8'>
                <button className='bg-primary text-white rounded-md px-6 py-2' onClick={e=>{handleClose()}}>Cancel</button>
                <button className='bg-danger flex items-center justify-center text-white rounded-md h-[40px] w-[95px]' onClick={e=>{deleteCar()}}>
                    {
                        isFetching?
                        <img width={30} src="/assets/spinner-main.svg" alt="" />
                        :
                        "Yes, Delete"
                    }
                </button>
            </div>
        </div>
    </div>
  ) : null;
};

export default CarsDelete;
