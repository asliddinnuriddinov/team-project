import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const inpDivStyle="flex flex-col gap-2"
const inpStyle="border-[1px] border-nav-main w-full outline-primary cursor-pointer hover:border-primary"
const url = "https://autoapi.dezinfeksiyatashkent.uz/api";

const CarsAdd = ({ isOpen, handleClose,reRenderTable }) => {
  const [inclusive,setInclusive]=useState(false)
  const [category,setCategory]=useState("")
  const [brand,setBrand]=useState("")
  const [model,setModel]=useState("")
  const [location,setLocation]=useState("")
  const [city,setCity]=useState("")
  const [categories,setCategories]=useState([])
  const [brands,setBrands]=useState([])
  const [models,setModels]=useState([])
  const [locations,setLocations]=useState([])
  const [cities,setCities]=useState([])

  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);

  useEffect(()=>{
    getCategoryData()
    getModelData()
    getBrandData()
    getLocationData()
    getCityData()
  },[])

  async function getCategoryData(){
    try{
      const responce=await axios(url+'/categories')
      setCategories(responce.data.data)
    }
    catch(err){
      console.error(err);
    }
  }
  async function getModelData(){
    try{
      const responce=await axios(url+'/models')
      setModels(responce.data.data)
    }
    catch(err){
      console.error(err);
    }
  }
  async function getBrandData(){
    try{
      const responce=await axios(url+'/brands')
      setBrands(responce.data.data)
    }
    catch(err){
      console.error(err);
    }
  }
  async function getLocationData(){
    try{
      const responce=await axios(url+'/locations')
      setLocations(responce.data.data)
    }
    catch(err){
      console.error(err);
    }
  }
  async function getCityData(){
    try{
      const responce=await axios(url+'/cities')
      setCities(responce.data.data)
    }
    catch(err){
      console.error(err);
    }
  }
  

  const {register,handleSubmit,formState:{isDirty,isSubmitting}}=useForm()

  async function addCar({brandAdd,modelAdd,aed,aed1,usd,usd1,cityAdd,deposit,limit,fuel,motor,drive,transmission,color,year,seconds,categoryAdd,speed,people,protection,lolcationAdd,inclusive}){
    try{
      const formdata=new FormData()
      formdata.append("brand_id",brandAdd)
      formdata.append("model_id",modelAdd)
      formdata.append("city_id",cityAdd)
      formdata.append("color",color)
      formdata.append("year",year)
      formdata.append("seconds",seconds)
      formdata.append("category_id",categoryAdd)
      formdata.append("images",ImageUrl)
      formdata.append("images",mainImageUrl)
      formdata.append("max_speed",speed)
      formdata.append("max_people",people)
      formdata.append("transmission",transmission)
      formdata.append("motor",motor)
      formdata.append("drive_side",drive)
      formdata.append("petrol",fuel)
      formdata.append("limitperday",limit)
      formdata.append("deposit",deposit)
      formdata.append("premium_protection",protection)
      formdata.append("price_in_aed",aed)
      formdata.append("price_in_usd",usd)
      formdata.append("price_in_aed_sale",aed1)
      formdata.append("price_in_usd_sale",usd1)
      formdata.append("location_id",lolcationAdd)
      formdata.append("inclusive",inclusive)
      formdata.append("cover",coverImageUrl)

      const response = await axios.post(url + '/cars',formdata, {
        headers: {
          // 'Content-type':'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      reRenderTable()
      toast.success("Added new Car successfully")
      handleClose()
    } 
    catch(err){   
      toast.error("Something wewnt wrong, try again")
      console.error(err);
    }   
  }

  return isOpen ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[#00000048] flex items-center justify-center z-50"
    >
      <div
        className="w-[400px] overflow-y-scroll h-[90vh] px-5 py-8 bg-white"
      >
        <form onSubmit={handleSubmit(addCar)} className="flex flex-col gap-5">
          <div className={inpDivStyle}>
            <label htmlFor="category__add">Category</label>
            <select {...register("categoryAdd")} required className={inpStyle} value={category} onChange={e=>{setCategory(e.target.value)}} id="category__add">
              <option hidden disabled defaultValue={true} value="">
                Select Category
              </option>
              {
                categories?.map(data=>
                  <option key={data.id} value={data.id}>{data.name_en}</option>
                )
              }
            </select>
          </div>

          <div className={inpDivStyle}>
            <label htmlFor="brand__add">Brand</label>
            <select {...register("brandAdd")} required className={inpStyle} value={brand} onChange={e=>{setBrand(e.target.value)}} id="brand__add">
              <option hidden disabled defaultValue={true} value="">
                Select Brand
              </option>
              {
                brands?.map(data=>
                  <option key={data.id} value={data.id}>{data.title}</option>
                )
              }
            </select>
          </div>

          <div className={inpDivStyle}>
            <label htmlFor="model__add">Model</label>
            <select {...register("modelAdd")} required className={inpStyle} value={model} onChange={e=>{setModel(e.target.value)}} id="model__add">
              <option hidden disabled defaultValue={true} value="">
                Select Model
              </option>
              {
                models?.map(data=>
                  <option key={data.id} value={data.id}>{data.name}</option>
                )
              }
            </select>
          </div>

          <div className={inpDivStyle}>
            <label htmlFor="location__add">Location</label>
            <select {...register("lolcationAdd")} required className={inpStyle} value={location} onChange={e=>{setLocation(e.target.value)}} id="location__add">
              <option hidden disabled defaultValue={true} value="">
                Select Location
              </option>
              {
                locations?.map(data=>
                  <option key={data.id} value={data.id}>{data.name}</option>
                )
              }
            </select>
          </div>

          <div className={inpDivStyle}>
            <label htmlFor="city__add">City</label>
            <select {...register("cityAdd")} required className={inpStyle} value={city} onChange={e=>{setCity(e.target.value)}} id="city__add">
              <option hidden disabled defaultValue={true} value="">
                Select City
              </option>
              {
                cities?.map(data=>
                  <option key={data.id} value={data.id}>{data.name}</option>
                )
              }
            </select>
          </div>

          <div className={inpDivStyle}>
            <label htmlFor="color__add">Color</label>
            <input {...register("color")} required className={inpStyle} id="color__add" type="text" />
          </div>

          <div className={inpDivStyle}>
            <label htmlFor="year__add">Year</label>
            <input {...register("year")} required className={inpStyle} id="year__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="seconds__add">Seconds</label>
            <input {...register("seconds")} required className={inpStyle} id="seconds__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="speed__add">Speed</label>
            <input {...register("speed")} required className={inpStyle} id="speed__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="people__add">Max People</label>
            <input {...register("people")} required className={inpStyle} id="people__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="motor__add">Motor</label>
            <input {...register("motor")} required className={inpStyle} id="motor__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="transmission__add">Transmission</label>
            <input {...register("transmission")} required className={inpStyle} id="transmission__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="drive__add">Side Drive</label>
            <input {...register("drive")} required className={inpStyle} id="drive__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="fuel__add">Fuel</label>
            <input {...register("fuel")} required className={inpStyle} id="fuel__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="limit__add">Limit Per Day</label>
            <input {...register("limit")} required className={inpStyle} id="limit__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="deposit__add">Deposit</label>
            <input {...register("deposit")} required className={inpStyle} id="drive__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="protection__add">Premium Protection Price</label>
            <input {...register("protection")} required className={inpStyle} id="protection__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="aed__add">Price in AED</label>
            <input {...register("aed")} required className={inpStyle} id="aed__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="usd__add">Price in USD</label>
            <input {...register("usd")} required className={inpStyle} id="usd__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="aed2__add">Price in AED(Otd)</label>
            <input {...register("aed2")} required className={inpStyle} id="aed2__add" type="text" />
          </div>
          <div className={inpDivStyle}>
            <label htmlFor="usd2__add">Price in USD(Otd)</label>
            <input {...register("usd2")} required className={inpStyle} id="usd2__add" type="text" />
          </div>

          <div className="flex flex-col">
            <p>Inclusive</p>
            <label className="inline-flex items-center cursor-pointer w-fit">
              <input {...register("inclusive")} type="checkbox" onChange={e=>setInclusive(e.target.checked)} checked={inclusive} value={inclusive} className="sr-only peer"/>
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <small>Upload car Images</small>
            <div className="flex items-center gap-4"> 
            {
            ImageUrl&&<img className="object-contain w-full max-w-[110px] h-[120px]" src={URL.createObjectURL(ImageUrl)} alt="" />
            }
            <label htmlFor="car-images-add" className="flex w-[90px] items-center justify-center p-4 gap-3 rounded-xl border border-gray-300 hover:border-primary transition-all duration-300 border-dashed bg-gray-50 cursor-pointer">
            <div className="space-y-2 flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-gray-700">+</h4>
              <span className="text-sm text-gray-500">Upload</span>
            </div>
            <input {...register("images")} required type="file" id="car-images-add" accept="image/*" hidden onChange={e=>setImageUrl(e.target.files[0])}/>
            </label>
            </div>
          </div>

          <div>
            <small>Upload the main image</small>
            <div className="flex items-center gap-4">
            {
            mainImageUrl&&<img className="object-contain w-full max-w-[110px] h-[120px]" src={URL.createObjectURL(mainImageUrl)} alt="" />
            }
            <label htmlFor="car-image-main-add" className="flex w-[90px] items-center justify-center p-4 gap-3 rounded-xl border border-gray-300 hover:border-primary transition-all duration-300 border-dashed bg-gray-50 cursor-pointer">
            <div className="space-y-2 flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-gray-700">+</h4>
              <span className="text-sm text-gray-500">Upload</span>
            </div>
            <input {...register("mainImage")} required type="file" id="car-image-main-add" accept="image/*" hidden onChange={e=>setMainImageUrl(e.target.files[0])}/>
            </label>
            </div>
          </div>

          <div>
            <small>Upload the cover image</small>
            <div className="flex items-center gap-4">
            {
            coverImageUrl&&<img className="object-contain w-full max-w-[110px] h-[120px]" src={URL.createObjectURL(coverImageUrl)} alt="" />
            }
            <label htmlFor="car-image-cover-add" className="flex w-[90px] items-center justify-center p-4 gap-3 rounded-xl border border-gray-300 hover:border-primary transition-all duration-300 border-dashed bg-gray-50 cursor-pointer">
            <div className="space-y-2 flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-gray-700">+</h4>
              <span className="text-sm text-gray-500">Upload</span>
            </div>
            <input {...register("coverImage")} required type="file" id="car-image-cover-add" accept="image/*" hidden onChange={e=>setCoverImageUrl(e.target.files[0])} />
          </label>
            </div>
          </div>

          <div className="flex justify-end items-center gap-5">
            <button type="button" onClick={handleClose} className="border-[1px] border-nav-main px-7 py-2 rounded-md">Cancel</button>
            <button disabled={!isDirty||isSubmitting} className="border-[1px] flex items-center justify-center border-transparent bg-primary text-white h-[42px] w-[110px] rounded-md">
              {
                isSubmitting?
                <img width={26} src="/assets/spinner-main.svg" alt="" />
                :
                "Add"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default CarsAdd;
