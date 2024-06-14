import React, { useEffect, useState } from 'react';
import { LiaArchiveSolid, LiaEyeDropperSolid } from "react-icons/lia";

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
        alert("Category deleted");
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
        alert("Category edited");
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
        alert("Category created");
        setData({ name_en: "", name_ru: "", image_src: null });
        getCategory();
      })
      .catch(err => {
        console.error("Error creating category:", err);
      });
  }

  return (
    <div className='text-7xl h-full bg-main'>
      <div className="container bg-white mt-10 ml-10 pl-10 pt-10">
        <table border={1}>
          <thead>
            <tr className='flex md:items-center gap-8 '>
              <th className='text-sm'>№</th>
              <th className='text-sm'>name_en</th>
              <th className='text-sm'>name_ru</th>
              <th className='text-sm'>image</th>
              <th className='text-sm'>actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((item, index) => (
              <tr className='flex md:items-center gap-8' key={index}>
                <td><h3 className='text-sm'>{index + 1 + '.' + ' -'} {item.name_en}</h3></td>
                <td className='text-sm'>{item.name_en}</td>
                <td className='text-sm'>{item.name_ru}</td>
                <td><img className='w-28 h-26' src={`${urlImg}${item.image_src}`} alt={item.name_ru} /></td>
                <td className='flex gap-5'>
                  <button className='text-sm bg-blue-600 pt-2 pl-4 pr-4 pb-2 rounded-md' onClick={() => editCategory(item)}><LiaEyeDropperSolid /></button>
                  <button className='text-sm bg-red-600 pt-2 pl-4 pr-4 pb-2 rounded-md' onClick={() => deleteCategory(item.id)}><LiaArchiveSolid /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={createCategory} className='mt-10 flex row'>
          <div className='flex-col'>
            <label className='text-sm' htmlFor="">Create and Edit</label>
            <input className='text-sm border-current border-2 p-2' type="text" placeholder="add or edit text" value={data.name_en} onChange={(e) => setData({ ...data, name_en: e.target.value })} />
          </div>
          <div>
            <label className='text-sm' htmlFor="">Create and Edit</label>
            <input className='text-sm border-current border-2 p-2' type="text" placeholder="add or edit text" value={data.name_ru} onChange={(e) => setData({ ...data, name_ru: e.target.value })} />
          </div>
          <div>
            <label htmlFor=""></label>
            <input className='text-sm' type="file" onChange={(e) => setData({ ...data, image_src: e.target.files[0] })} />
            <button className='text-sm border-current border-2 p-2' type='submit'>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Categories;
