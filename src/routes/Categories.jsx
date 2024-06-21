import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Categories = () => {
  const notify = (message) => toast(message);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({ name_en: "", name_ru: "", image_src: null });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  };

  const deleteCategory = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(() => {
        notify("Category deleted");
        getCategory();
      })
      .catch(error => {
        console.error("Error deleting category:", error);
      });
  };

  const editCategory = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    if (data.image_src) {
      formData.append('images', data.image_src);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategory.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        notify("Category edited");
        setEditOpen(false);
        getCategory();
      })
      .catch(error => {
        console.error("Error editing category:", error);
      });
  };

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
        notify("Category created");
        setData({ name_en: "", name_ru: "", image_src: null });
        setCreateOpen(false);
        getCategory();
      })
      .catch(err => {
        console.error("Error creating category:", err);
      });
  };

  return (
    <div className='h-full bg-main overflow-y-scroll px-14 py-10'>
      <div className="container bg-white rounded-xl py-5 pr-[50px]">
        <div className='flex justify-end mb-4'>
          <button className='text-sm bg-green-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => setCreateOpen(true)}>Create</button>
        </div>
        <table>
          <thead>
            <tr className='flex md:items-center gap-8 rounded px-10 mr-7 ml-[10px]' style={{ background: '#E3EFFE' }}>
              <th className='text-base w-[120px] pt-5 pb-5'>№</th>
              <th className='text-base w-[240px]'>Name</th>

              <th className='text-base w-[270px]'>Images</th>
              <th className='text-base w-[50px]'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((item, index) => (
              <tr className='flex md:items-center gap-8 pl-[10px]' key={item.id}>
                <td className='w-[200px] rounded bg-slate-50 p-2'>
                  <h3 className='text-sm'>{index + 1}. {item.name_en}</h3>
                </td>
                <td className='text-sm w-[250px] bg-slate-100 p-2'>{item.name_ru}</td>
                <td><img className='w-[200px] h-26 mt-10 rounded-lg' src={`${urlImg}${item.image_src}`} alt={item.name_ru} /></td>
                <td className='flex gap-5 w-[200px]'>
                  <button className='text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => { setSelectedCategory(item); setEditOpen(true); }}>Edit</button>
                  <button className='text-sm bg-red-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => { setSelectedCategory(item); setDeleteOpen(true); }}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000048] flex items-center justify-center z-50">
          <div className="w-[400px] overflow-y-scroll h-[20vh] px-5 py-8 bg-white">
            <p className='text-xl pb-[15px] text-center'>Delete your file now?</p>
            <div className='flex justify-around'>
              <button className='text-sm bg-red-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => { deleteCategory(selectedCategory.id); setDeleteOpen(false); }}>Yes</button>
              <button className='border-2 rounded-sm border-gray-300 bg-gray-100 p-3' onClick={() => setDeleteOpen(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {editOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000048] flex items-center justify-center z-50">
          <div className="w-[400px] overflow-y-scroll h-[50vh] px-5 py-8 bg-white">
            <form onSubmit={editCategory}>
              <p className='text-xl pb-[15px] text-center'>Edit Category</p>
              <div className='flex flex-col mb-4'>
                <label className='text-sm'>Name (English)</label>
                <input
                  className='text-sm border-current border-2 p-2'
                  type="text"
                  value={data.name_en}
                  onChange={(e) => setData({ ...data, name_en: e.target.value })}
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label className='text-sm'>Name (Russian)</label>
                <input
                  className='text-sm border-current border-2 p-2'
                  type="text"
                  value={data.name_ru}
                  onChange={(e) => setData({ ...data, name_ru: e.target.value })}
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label className='text-sm'>Image</label>
                <input
                  className='text-sm'
                  type="file"
                  onChange={(e) => setData({ ...data, image_src: e.target.files[0] })}
                />
              </div>
              <div className='flex justify-around'>
                <button className='text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' type="submit">Save</button>
                <button className='border-2 rounded-sm border-gray-300 bg-gray-100 p-3' onClick={() => setEditOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {createOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000048] flex items-center justify-center z-50">
          <div className="w-[400px] overflow-y-scroll h-[50vh] px-5 py-8 bg-white">
            <form onSubmit={createCategory}>
              <p className='text-xl pb-[15px] text-center'>Create Category</p>
              <div className='flex flex-col mb-4'>
                <label className='text-sm'>Name (English)</label>
                <input
                  className='text-sm border-current border-2 p-2'
                  type="text"
                  value={data.name_en}
                  onChange={(e) => setData({ ...data, name_en: e.target.value })}
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label className='text-sm'>Name (Russian)</label>
                <input
                  className='text-sm border-current border-2 p-2'
                  type="text"
                  value={data.name_ru}
                  onChange={(e) => setData({ ...data, name_ru: e.target.value })}
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label className='text-sm'>Image</label>
                <input
                  className='text-sm'
                  type="file"
                  onChange={(e) => setData({ ...data, image_src: e.target.files[0] })}
                />
              </div>
              <div className='flex justify-around '>
                <button className='text-sm bg-green-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' type="submit">Create</button>
                <button className='border-2 rounded-sm border-gray-300 bg-gray-100 p-3' onClick={() => setCreateOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
