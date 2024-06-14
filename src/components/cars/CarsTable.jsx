import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import CarsAdd from "./CarsAdd";
import CarsDelete from "./CarsDelete";
import CarsEdit from "./CarsEdit";

const thStyle = "text-left p-3 text-sm";
const tdStyle = "text-left p-3 border-b-[1px] border-b-nav-main text-sm";

const CarsTable = () => {
  const [carsData, setCarsData] = useState([]);
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api";
  const [loading, setLoading] = useState(false);
  const [addOpen,setOpenAdd]=useState(false)
  const [deleteOpen,setOpenDelete]=useState(false)
  const [editOpen,setOpenEdit]=useState(false)
  const [carId,setCarId]=useState('')
  const [singleCarData,setSingleCarData]=useState([])

  function openAddmodal(){
    setOpenAdd(true)
  }
  function closeAddmodal(){
    setOpenAdd(false)
  }

  function openDeletemodal(){
    setOpenDelete(true)
  }
  function closeDeletemodal(){
    setOpenDelete(false)
  }



  function openEditmodal(){
    setOpenEdit(true)
  }
  function closeEditmodal(){
    setOpenEdit(false)
  }

  useEffect(() => {
    getCarsData();
  }, []);

  async function getCarsData() {
    setLoading(true);
    try {
      const responce = await axios(url + "/cars");
      setCarsData(responce.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return !loading ? (
    <>
    <table className="w-full">
      <thead>
        <tr className="border-b-[1px] border-b-nav-main">
          <th className={thStyle}>Brand</th>
          <th className={thStyle}>Model</th>
          <th className={thStyle}>Color</th>
          <th className={thStyle}>City</th>
          <th className={thStyle}>Action</th>
          <th className={thStyle}>
            <div className="flex items-center justify-end">
              <button onClick={e=>openAddmodal()} className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-75 transition-all duration-300">
                Add Car
              </button>
            </div>
          </th>
        </tr>
      </thead>

      <tbody className="">
        {carsData?.map((data) => (
          <tr key={data.id}>
            <td className={tdStyle}>{data.brand.title}</td>
            <td className={tdStyle}>{data.model.name}</td>
            <td className={tdStyle}>{data.color}</td>
            <td className={tdStyle}>{data.city.name}</td>
            <td className={tdStyle}>
              <div className="flex items-center gap-4">
                <button onClick={e=>{setCarId(data.id);setSingleCarData(data);openEditmodal();}} className="bg-primary text-white p-2 rounded-md text-lg hover:opacity-75 transition-all duration-300">
                  <MdEdit />
                </button>
                <button onClick={e=>{openDeletemodal();setCarId(data.id)}} className="bg-danger text-white p-2 rounded-md text-lg hover:opacity-75 transition-all duration-300">
                  <MdDelete />
                </button>
              </div>
            </td>
            <td className={tdStyle}></td>
          </tr>
        ))}
      </tbody>
    </table>
    <CarsAdd isOpen={addOpen} handleClose={closeAddmodal} reRenderTable={getCarsData}/>
    <CarsDelete isOpen={deleteOpen} handleClose={closeDeletemodal} id={carId} reRenderTable={getCarsData}/>
    <CarsEdit isOpen={editOpen} handleClose={closeEditmodal} id={carId} reRenderTable={getCarsData} carData={singleCarData}/>
    </>
  ) : (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <img src="/assets/spinner-primary.svg" alt="" />
    </div>
  );
};

export default CarsTable;
