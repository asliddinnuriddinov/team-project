import React, { useEffect, useState } from 'react';
import { LiaArchiveSolid, LiaEyeDropperSolid } from "react-icons/lia";
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({ name_en: "", name_ru: "", image_src: null });
  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  const token = localStorage.getItem('token');

  const getCategory = () => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }

  const deleteCategory = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(() => {
        toast("File deleted");
        getCategory();
      })
      .catch(error => {
        console.error("Error deleting category:", error);
      });
  }

  const editCategory = (item) => {
    const formData = new FormData();
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    if (data.image_src) {
      formData.append('images', data.image_src);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${item.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        toast("Category edited");
        getCategory();
      })
      .catch(error => {
        console.error("Error editing category:", error);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    if (data.image_src) {
      formData.append('images', data.image_src);
    }

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        toast("Category created");
        setData({ name_en: "", name_ru: "", image_src: null });
        getCategory();
      })
      .catch(err => {
        console.error("Error creating category:", err);
      });
  }

  return (
    
    <div className='text-7xl h-full bg-main overflow-y-scroll px-14 py-10'>
      <div className="container bg-white rounded-xl py-5">
        <table >
          <tr className='flex md:items-center gap-8  rounded px-10 mr-7' style={{ background: '#E3EFFE' }}>
            <th className='text-base w-[120px] pt-5 pb-5'>№</th>
            <th className='text-base w-[240px]'>Name</th>
            <th className='text-base w-[270px]'>Text</th>
            <th className='text-base w-[270px]'>images</th>
            <th className='text-base w-[50px]'>Actions</th>
          </tr>
          {categories && categories.map((item, index) => (
            <tr className='flex md:items-center gap-8 ' key={index}>
              <td className='w-[200px] rounded bg-slate-50 p-2'><h3 className='text-sm'>{index + 1 + '.'} {item.name_en}</h3></td>
              <td className='text-sm w-[250px] bg-slate-50 p-2'>{item.name_en}</td>
              <td className='text-sm w-[250px] bg-slate-100 p-2'>{item.name_ru}</td>
              <td><img className='w-[200px] h-26 mt-10 rounded-lg' src={`${urlImg}${item.image_src}`} alt={item.name_ru} /></td>
              <td className='flex gap-5 w-[200px]'>
                <button className='text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => editCategory(item)}>Edit</button>
                <button className='text-sm bg-red-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white'  onClick={() => deleteCategory(item.id)}>Del</button>
              </td>
            </tr>
          ))}
        </table>

        <form onSubmit={createCategory} className='mt-10 flex-col items-center'>
          <div className='flex flex-col'>
            <label className='text-sm' htmlFor="">Create and Edit</label>
            <input className='text-sm border-current border-2 p-2' type="text" placeholder="add or edit text" value={data.name_en} onChange={(e) => setData({ ...data, name_en: e.target.value })} />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm' htmlFor="">Create and Edit</label>
            <input className='text-sm border-current border-2 p-2' type="text" placeholder="add or edit text" value={data.name_ru} onChange={(e) => setData({ ...data, name_ru: e.target.value })} />
          </div>
          <div className='flex flex-row items-center'>
            <label htmlFor=""></label>
            <input className='text-sm' type="file" onChange={(e) => setData({ ...data, image_src: e.target.files[0] })} />
            <button className='text-sm border-current border-2 p-2' type='submit '>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Categories;
