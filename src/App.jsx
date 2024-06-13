import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Admin from './routes/Admin'
import AdminPrivate from './utils/AdminPrivate'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import Categories from './routes/Categories'
import Brands from './routes/Brands'
import Cities from './routes/Cities'
import Cars from './routes/Cars'
import Locations from './routes/Locations'

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/'  element={<Login/>}/>
        <Route path='/' element={<AdminPrivate/>}>
          <Route path='/admin' element={<Admin/>}>
            <Route path='/admin/categories' element={<Categories/>}/>
            <Route path='/admin/brands' element={<Brands/>}/>
            <Route path='/admin/cities' element={<Cities/>}/>
            <Route path='/admin/cars' element={<Cars/>}/>
            <Route path='/admin/locations' element={<Locations/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
