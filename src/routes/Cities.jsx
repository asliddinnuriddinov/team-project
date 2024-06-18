import { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const Cities = () => {
	const [cities, setCities] = useState([]);
	const [data, setData] = useState({ name: "", text: "", images: null });

	const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
	const token = localStorage.getItem("token");

	const getCities = () => {
		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setCities(data.data);
			})
			.catch(error => {
				console.error("Error fetching cities:", error);
			});
	}


	const editCity = (item) => {
		
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('text', data.text);

		if (data.images) {
			formData.append('images', data.images);
		}

		fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${item.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData,
		})
			.then(res => res.json())
			.then(() => {
				alert("City edited");
				getCities();
			})
			.catch(error => {
				console.error("Error editing city:", error);
			});
	}

	const createCity = (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('text', data.text);
		
		if (data.images) {
			formData.append('images', data.images);
		}

		fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			body: formData,
		})
			.then(res => res.json())
			.then(() => {
				alert("City created");
				setData({ name: "", text: "", images: null });
				getCities();
			})
			.catch(err => {
				console.error("Error creating city:", err);
			});
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
				toast("File deleted");
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
			<button className='m-10 ml-20 text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={createCity}>Add city</button>
						
			<table className="h-auto bg-white w-[90%] m-auto rounded-md px-10">
				<tr className='flex md:items-center gap-8 rounded px-10 pt-10 mr-7'>
					<th className='text-base w-[120px]'>ID</th>
					<th className='text-base w-[240px]'>Text</th>
					<th className='text-base w-[270px]'>Text</th>
					<th className='text-base w-[270px]'>Images</th>
					<th className='text-base w-[50px]'>Actions</th>
				</tr>
				{cities && cities.map((item, index) => (
					<tr className='flex sm:items-center m-4' key={index}>
						<td className='w-[200px] rounded p-20 mr-16'><h3 className='text-sm'>{index + 1 + '.'}</h3></td>
						<td className='text-sm w-[250px] p-2 mr-12'>{item.name}</td>
						<td className='text-sm w-[250px] p-2'>{item.text}</td>
						<td><img className='w-[100px] h-26 mt-10 mr-16 ml-8 rounded-lg' src={`${urlImg}${item.image_src}`} alt={item.name_ru} /></td>
						<td className='flex gap-5 w-[200px] ml-10'>
							<button className='text-sm bg-blue-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => editCity(item)}>Edit</button>
							<button className='text-sm bg-red-600 pt-3 pl-4 pr-4 pb-3 rounded-md text-white' onClick={() => deleteCity(item.id)}>Del</button>
						</td>
					</tr>
				))}
			</table>
		</div>
	)
}

export default Cities;