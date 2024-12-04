package com.chat_app.chat_app_backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chat_app.chat_app_backend.entities.Message;
import com.chat_app.chat_app_backend.entities.Room;
import com.chat_app.chat_app_backend.services.RoomService;

@RestController
@RequestMapping("/api/v1/room")
@CrossOrigin("http://localhost:3000")
public class RoomController {

	private RoomService roomService;
	
	public RoomController(RoomService roomService) {
		this.roomService=roomService;
	}
	
	@PostMapping("/create-room")
	public ResponseEntity<Room> createRoom(@RequestBody String roomId) {
		return ResponseEntity.ok(roomService.createRoom(roomId));
	}
	
	@GetMapping("/join-room/{roomId}")
	public ResponseEntity<Room> joinRoom(@PathVariable String roomId) {
		return ResponseEntity.ok(roomService.joinRoom(roomId));
	}
	
	@GetMapping("/{roomId}/messages")
	public ResponseEntity<List<Message>> getMessages(
			@PathVariable String roomId, 
			@RequestParam(value = "page", defaultValue = "0", required = false) int page,
			@RequestParam(value = "size", defaultValue = "20", required = false) int size){
		
		return ResponseEntity.ok(roomService.getMessages(roomId, page, size));
	}
}
