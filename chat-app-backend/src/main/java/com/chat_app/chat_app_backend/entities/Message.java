package com.chat_app.chat_app_backend.entities;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class Message {

	private String sender;
	
	private String content;
	
	private LocalDate timeStamp;

	
	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDate getTimeStamp() {
		return timeStamp;
	}



	public void setTimeStamp(LocalDate timeStamp) {
		this.timeStamp = timeStamp;
	}

	
	public Message(String sender, String content) {
		this.sender = sender;
		this.content = content;
		this.timeStamp=LocalDate.now();
	}
	
	
	
}
