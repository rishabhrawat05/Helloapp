package com.chat_app.chat_app_backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import com.chat_app.chat_app_backend.entities.Message;
import com.chat_app.chat_app_backend.payload.MessageRequest;
import com.chat_app.chat_app_backend.services.ChatService;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

	private ChatService chatService;
	
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}
	
	@MessageMapping("/sendMessage/{roomId}")
	@SendTo("/topic/room/{roomId}")
	public Message sendMessage(
			@DestinationVariable String roomId,
			@Payload MessageRequest request) {
		
		return chatService.sendMessage(roomId, request);
	}
}
