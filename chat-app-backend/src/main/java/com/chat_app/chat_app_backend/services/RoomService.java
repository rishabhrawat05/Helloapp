package com.chat_app.chat_app_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chat_app.chat_app_backend.entities.Message;
import com.chat_app.chat_app_backend.entities.Room;
import com.chat_app.chat_app_backend.exceptions.RoomAlreadyPresentException;
import com.chat_app.chat_app_backend.exceptions.RoomNotFound;
import com.chat_app.chat_app_backend.payload.RoomRequest;
import com.chat_app.chat_app_backend.repositories.RoomRepository;

@Service
public class RoomService {

	private RoomRepository roomRepository;
	
	public RoomService(RoomRepository roomRepository) {
		this.roomRepository=roomRepository;
	}
	
	public Room createRoom(RoomRequest request) {
		Optional<Room> roomOpt = roomRepository.findByRoomId(request.getRoomId());
		if(roomOpt.isPresent()) {
			throw new RoomAlreadyPresentException("Room Already Exists");
		}
		Room room = new Room();
		room.setRoomId(request.getRoomId());
		room.setName(request.getName());
		roomRepository.save(room);
		return room;
	}
	
	public Room joinRoom(String roomId) {
		Optional<Room> roomOpt = roomRepository.findByRoomId(roomId);
		if(roomOpt.isEmpty()) {
			throw new RoomNotFound("Room Not Found");
		}
		return roomOpt.get();
	}
	
	public List<Message> getMessages(String roomId, int page, int size){
		Optional<Room> roomOpt = roomRepository.findByRoomId(roomId);
		if(roomOpt.isEmpty()) {
			throw new RoomNotFound("Room Not Found");
		}
		Room room = roomOpt.get();
		List<Message> messages = room.getMessages();
		int start = Math.max(0, messages.size() - (page+1)*size);
		int end = Math.min(messages.size(), start + size);
		List<Message> paginatedMessage = messages.subList(start, end);
		return paginatedMessage;
	}
}
 