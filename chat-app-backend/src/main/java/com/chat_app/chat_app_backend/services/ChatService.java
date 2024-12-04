package com.chat_app.chat_app_backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chat_app.chat_app_backend.entities.Message;
import com.chat_app.chat_app_backend.entities.Room;
import com.chat_app.chat_app_backend.exceptions.RoomNotFound;
import com.chat_app.chat_app_backend.payload.MessageRequest;
import com.chat_app.chat_app_backend.repositories.RoomRepository;

@Service
public class ChatService {

	private RoomRepository roomRepository;
	
	public ChatService(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}
	public Message sendMessage(String roomId, MessageRequest request) {
		Optional<Room> roomOpt = roomRepository.findByRoomId(roomId);
		if(roomOpt.isEmpty()) {
			throw new RoomNotFound("Room Not Found");
		}
		Room room = roomOpt.get();
		Message message = new Message(request.getSender(),request.getContent());
		room.getMessages().add(message);
		roomRepository.save(room);
		return message;
	}
}
