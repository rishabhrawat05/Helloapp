import { RiDoorOpenFill } from '@remixicon/react'
import React, { useState } from 'react'

export const Rooms = () => {
  const[rooms,setRooms]=useState([
    
  ]);
  return (
    <div className=' flex flex-col justify-between items-center h-screen w-[50vh] border-r-4 border-gray-700'>
      <div className='flex items-center justify-around fixed bg-gray-900 w-64 '>
        <RiDoorOpenFill size={36}/>
      <h1 className='text-2xl text-center p-4 font-bold'>Your Rooms</h1>
      </div>
    <div className='w-[100%] h-[90%] py-14 scrollbar-hidden overflow-auto'
    >
      
      <div className='w-auto justify-around flex flex-col items-start gap-4 px-3 py-3'>
        {
          rooms.map((room,index)=>(
            <div key={index} className=' h-12 bg-blue-500 hover:bg-blue-800 rounded-xl w-full flex items-center justify-center'>
              <p className='text-center text-white font-semibold'>{room.name}</p>
            </div>
          ))
        }
      </div>
      
      </div>
        <button className='bottom-2 fixed bg-green-600 h-12 px-20 rounded-full py-3 text-lg font-semibold hover:bg-green-800'>Create Room</button>
      </div>
  )
}
