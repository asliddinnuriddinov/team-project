import React from 'react'
import CarsTable from '../components/cars/CarsTable'


const Cars = () => {
  return (
    <div className='h-full bg-main overflow-y-scroll px-14 py-10'>
        <div className='bg-white w-full rounded-xl py-5'>
          <CarsTable/>
        </div>
    </div>
  )
}

export default Cars