import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const createRoom = async (data)=>{
    const response = await axios.post(`${BASE_URL}/api/v1/room/create-room`, data);
    return response.data;
}

export const joinRoom = async (roomId)=>{
    const response = await axios.get(`${BASE_URL}/api/v1/room/join-room/${roomId}`, );
    return response.data;
}

export const getMessages = async (roomId, size = 50, page = 0) => {
    const response = await axios.get(`${BASE_URL}/api/v1/room/${roomId}/messages?${size}&page=${page}`);
    return response.data;
}