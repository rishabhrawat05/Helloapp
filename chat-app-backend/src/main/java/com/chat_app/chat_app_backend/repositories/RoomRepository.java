package com.chat_app.chat_app_backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chat_app.chat_app_backend.entities.Room;

public interface RoomRepository extends MongoRepository<Room, String>{
	
	Optional<Room> findByRoomId(String roomId);

}
