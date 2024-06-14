import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
const Brands = () => {

  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false);
  const handleShow =  () => setShowModal(true);

  // APi Get 
  const [brands, setBrands] = useState([])
  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  const getBrands = () => {
       fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
       .then(res => res.json())
       .then(brand => {
        console.log(brand);
        setBrands(brand.data)
        })
  }
  useEffect(()=> {
     getBrands();
  },[])
// APi Get 

  return (
    <>
    <div className=' h-full p-10 bg-main overflow-hidden overflow-scroll'>
    <div  className='h-auto bg-white w-[90%] m-auto m-10 rounded-md'>

      <div className='p-10 flex justify-between align-middle'>
        <div className='rounded-md border flex align-middle w-[40%]  shadow-sm'>
        <button className='p-3  bg-transparent border outline-none hover:bg-slate-300  rounded'><CiSearch className='text-black text-md '/></button><input className='p-1 text-md outline-none w-[90%]' type="serch" placeholder='Search................'/>
        </div>
        <div className='flex align-middle'>
           <button className='bg-blue-600 hover:bg-blue-500 p-2 w-[100%] text-white text-md rounded-md shadow-sm'>Add brand</button>
        </div>
      </div>
<table class="border-separate border-spacing-2 border border-white-500 ... w-full">
  <thead>
    <tr>
      <th class="shadow-sm rounded-md border border-blue-600 ... bg-blue-600 text-white">Name</th>
      <th class="shadow-sm rounded-md border border-green-600 ... bg-green-600 text-white">BrandLogo</th>
      <th class="shadow-sm rounded-md border border-red-600 ... bg-red-600 text-white">Action</th>
    </tr>
  </thead>
  <tbody>
   
      {
        brands && brands.map((logos, index)=> (
            <>
             <tr key={index}>
              <td class="shadow-sm border border-white-700 ... h-[40px]  w-10 rounded-md">{logos.title}</td>
              <td class="shadow-sm border border-white-700 ... h-[40px] w-10 rounded-md"><img src={`${urlImg}${logos.image_src}`} alt={logos.title} className='w-full h-[100px] rounded-md'/></td>
              <td class="shadow-sm border border-white-700 ... h-[40px]   w-10 rounded-md">
              <button className='bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-md m-2'><MdEdit className='text-md'/></button>
              <button className='bg-red-600 hover:bg-red-500 text-white p-3 rounded-md   m-2' onClick={handleShow}><MdDelete  className='text-md'/></button>
              </td>
              </tr>
            </>
        ))
      }
  </tbody>
</table>
     </div>
    </div>
  

  {/* Mpodals bootstrap*/}
{showModal ?
  <div className='flex justify-center align-middle fixed top-[50%] right-[40%] bg-white shadow-lg rounded-md h-[100px] w-[400px]'
  
  >
    <div>
      <h2 className='text-black
        text-lg
      '>
        Are you sure you want to delete?
      </h2>
      <div className='ml-20'>
        <button onClick={handleClose} className='bg-blue-600 hover:bg-blue-500  text-white text-[1rem] ml-1 p-2 mt-3 rounded-md'>Cancel</button>
        <button className='bg-red-600  hover:bg-red-500 text-white text-[1rem] ml-1 p-2 mt-3  rounded-md'>Delete</button>
      </div>
    </div>
  </div>
  :" "
  }
</>
  )
}

export default Brands