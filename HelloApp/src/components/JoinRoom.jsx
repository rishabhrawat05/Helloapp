import { RiDoorOpenFill } from '@remixicon/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { createRoom, joinRoom } from '../services/roomService';
import { useNavigate } from 'react-router';
import { useChatContext } from '../context/chatContext';
export const JoinRoom = () => {
  const [data,setData]=useState({
    roomId:"",
    name:""
  });
  const navigate =useNavigate();
  const {roomId,currentUser,setRoomId,setCurrentUser, setConnected,connected} = useChatContext();
  function validateForm(){
    if(data.roomId==="" || data.name===""){
      toast.error("Please fill all the required fields");
      return false;
    }
    return true;
  }
  function handleFormInputChange(event){
    setData({...data,[event.target.id]:event.target.value})
  }
  async function joinRoomButton(){
    if(validateForm()){
      try{
        const response = await joinRoom(data.roomId);
        console.log(response);
        setCurrentUser(data.name);
        setRoomId(data.roomId);
        setConnected(true);
        navigate("/chat")
        toast.success("Room joined successfully");
      }
      catch(error){
        if(error.status===404){
          toast.error("Room Not Found");
        }
        else{
          toast.error("Failed to join room. Please try again.");
          console.error(error);
        }
        
      }
    }
  }
  async function createRoomButton (){
    if(validateForm()){
      try{
        const response =await createRoom(data);
        console.log(response);
        setCurrentUser(response.name);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat")
        toast.success("Room created successfully");
      }
      catch(error){
        if(error.status===400){
          toast.error("Room already exists");
        }
        else{
          toast.error("Failed to create room. Please try again.");
        console.error(error);
        }
        
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
       
        <div className="p-8 flex flex-col  gap-5 w-full max-w-md rounded text-2xl font-semibold shadow dark:bg-gray-800">
        <RiDoorOpenFill size={70} className='ml-36  text-blue-500'/>
            <h1 className="text-3xl font-semibold text-center py-5">Join Room / Create Room</h1>
             {/* Name div */}
            <div>
                <label htmlFor='name' className='block font-medium mb-2'>Your Name</label>
                <input type="text" id='name' value={data.name} className='w-full dark:bg-gray-600 py-2 rounded-full dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4'  placeholder='Enter Your Name' onChange={handleFormInputChange}/>
            </div>
             {/* Room ID div */}
             <div>
                <label htmlFor='name' className='block font-medium mb-2'>Room ID</label>
                <input type="text" id='roomId' value={data.roomId} className='w-full dark:bg-gray-600 py-2 rounded-full dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4' placeholder='Enter Room ID' onChange={handleFormInputChange}/>
            </div>
            {/* Button */}
            <div className='flex items-center justify-around pt-8'>
              <button onClick={joinRoomButton} className="px-16 py-2 text-white rounded-full bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Join</button>
              <button onClick={createRoomButton} className="px-14 py-2 text-gray-900 rounded-full bg-blue-300 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">Create</button>
            </div>
        </div>
        
    </div>
  )
}
