package com.chat_app.chat_app_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RoomAlreadyPresentException extends RuntimeException{

	
	public RoomAlreadyPresentException(String message) {
		super(message);
	}

}
