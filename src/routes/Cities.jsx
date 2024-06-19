import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [data, setData] = useState({ id: null, name: "", text: "", images: null });
    const [modal, setModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
    const token = localStorage.getItem("token");

    const style = { color: "#00000072", width: "30px", cursor: "pointer" };

    const getCities = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
            .then(res => res.json())
            .then(data => {
                setCities(data.data);
            })
            .catch(error => {
                console.error("Error fetching cities:", error);
            });
    }

    const handleEditClick = (item) => {
        setData({ id: item.id, name: item.name, text: item.text, images: item.image_src });
        setIsEditing(true);
        setModal(true);
    }

    const handleAddClick = () => {
        setData({ id: null, name: "", text: "", images: null });
        setIsEditing(false);
        setModal(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('text', data.text);
        formData.append('images', data.images);

        if (isEditing) {
            fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${data.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            })
                .then(res => res.json())
                .then(() => {
                    setModal(false);
                    getCities();
                    toast.success("City updated successfully");
                    setData({ id: null, name: "", text: "", images: null });
                })
                .catch(error => {
                    console.error("Error updating city:", error);
                });
        } else {
            fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })
                .then(res => res.json())
                .then(() => {
                    setModal(false);
                    getCities();
                    toast.success("City added successfully");
                    setData({ id: null, name: "", text: "", images: null });
                })
                .catch(err => {
                    console.error("Error creating city:", err);
                });
        }
    }

    const deleteCity = (id) => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(() => {
                toast.error("City deleted");
                getCities();
            })
            .catch(error => {
                console.error("Error deleting city:", error);
            });
    }

    useEffect(() => {
        getCities();
    }, []);

    return (
        <div style={{ background: '#E3EFFE' }} className='text-7xl h-full overflow-x-hidden container bg-white rounded-xl py-10'>
            <div className={`modal bg-white ${modal ? "inline-block" : "hidden"} drop-shadow-2xl w-[30%] h-[510px] pt-3 pl-8 pr-8 rounded-lg shadow-lg absolute m-auto top-0 bottom-0 right-0 left-0`}>
                <div className="flex items-center justify-between">
                    <h4 className="text-xl w-[100%]">{isEditing ? "Edit City" : "Add City"}</h4>
                    <IoClose style={style} onClick={() => setModal(false)} />
                </div>

                <label
                    className="block text-lg font-regular leading-10 text-gray-900"
                    htmlFor="name">Name</label>
                <input
                    value={data.name}
                    required
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="block w-[100%] rounded-md border-zinc-400 border-solid border mb-4 py-2 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    type="text"
                    id="name"
                    placeholder="Name"
                />

                <label
                    className="block text-lg font-regular leading-10 text-gray-900"
                    htmlFor="text">Text</label>
                <textarea
                    value={data.text}
                    required
                    onChange={(e) => setData({ ...data, text: e.target.value })}
                    className="block w-[100%] rounded-md resize-none border-zinc-400 border-solid border mb-4 py-2 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    name="text"
                    id="text"
                    placeholder="Text"
                ></textarea>

                <label
                    className="block text-lg font-regular leading-10 text-gray-900"
                    htmlFor="image">Upload Image</label>
                <input
                    onChange={(e) => setData({ ...data, images: e.target.files[0] })}
                    className="block cursor-pointer w-[100%] rounded-md border-zinc-400 border py-2.5 px-2.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                />
                <div className="text-right">
                    <button
                        className="text-sm mr-3 border-zinc-400 border rounded-lg py-2 px-5"
                        onClick={() => setModal(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="text-sm bg-blue-600 py-2 px-5 rounded-md text-white"
                        onClick={handleSubmit}
                    >
                        OK
                    </button>
                </div>
            </div>

            <button className='m-10 ml-20 text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={handleAddClick}>Add city</button>

            <table className="h-auto bg-white w-[90%] m-auto rounded-md px-10">
                <tbody>
                    <tr className='flex md:items-center gap-8 rounded px-10 pt-10 mr-7'>
                        <th className='text-base w-[120px]'>ID</th>
                        <th className='text-base w-[240px]'>Name</th>
                        <th className='text-base w-[270px]'>Text</th>
                        <th className='text-base w-[270px]'>Images</th>
                        <th className='text-base w-[50px]'>Actions</th>
                    </tr>
                    {cities && cities.map((item, index) => (
                        <tr className='flex sm:items-center m-4' key={index}>
                            <td className='w-[200px] rounded p-20 mr-16'><h3 className='text-sm'>{index + 1 + '.'}</h3></td>
                            <td className='text-sm w-[250px] p-2 mr-12'>{item.name}</td>
                            <td className='text-sm w-[250px] p-2'>{item.text}</td>
                            <td><img className='w-[100px] h-26 mt-10 mr-16 ml-8 rounded-lg' src={`${urlImg}${item.image_src}`} alt={item.name} /></td>
                            <td className='flex gap-5 w-[200px] ml-10'>
                                <button className='text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => handleEditClick(item)}>Edit</button>
                                <button className='text-sm bg-red-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => deleteCity(item.id)}>Del</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Cities;
