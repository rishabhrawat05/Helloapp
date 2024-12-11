import { RiArrowRightLine, RiAttachment2, RiDeleteBin2Fill, RiDeleteBin3Fill, RiDeleteBin6Fill, RiDoorClosedFill, RiEditCircleFill, RiPencilFill } from '@remixicon/react';
import React, { useEffect, useState, useRef } from 'react';
import "../css/ChatPage.css";
import { useChatContext } from '../context/chatContext';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { BASE_URL, getMessages } from '../services/roomService';
import { Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { timesAgo } from '../utils/timesAgo';

export const ChatPage = () => {
  const { roomId, currentUser, connected } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser, navigate]);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${BASE_URL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      }, (error) => {
        console.error("WebSocket connection error:", error);
      });

      return client;
    };

    const client = connectWebSocket();

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        content: input,
        sender: currentUser,
        roomId: roomId
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setInput("");
    }
  };

  const leaveRoom = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    }
    navigate("/");
    toast.success("You left the room.");
  };

  useEffect(() =>{
    async function loadMessages(){
      try{
        const messages = await getMessages(roomId);
        setMessages(messages);
      }
      catch(error){
        console.error(error);
      }
    }
    loadMessages();
  },[]);
  
  useEffect(() => {
    if(chatBoxRef.current){
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  },[messages]);
  return (
    <div className="w-full">
      {/* Header */}
      <header className="w-full h-16 bg-gray-700 flex items-center justify-around fixed top-0">
        <div>
          <h1 className="text-2xl">
            Room: <span>{roomId}</span>
          </h1>
        </div>
        <div>
          <h1 className="text-2xl">
            User: <span>{currentUser}</span>
          </h1>
        </div>
        <div>
          <button
            onClick={leaveRoom}
            className="text-2xl pb-2 bg-red-600 py-1 px-8 rounded-full hover:bg-red-800 flex items-center gap-3"
          >
            Leave Room <RiDoorClosedFill className="mt-1" />
          </button>
        </div>
      </header>

      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        className="w-full overflow-auto h-[89vh] py-20 px-10 scrollbar-hidden"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"} gap-2`}
          >
            {message.sender === currentUser &&
            <div className='flex flex-col gap-2 py-4'>
              <RiPencilFill className='text-blue-500'/>
              <RiDeleteBin6Fill className='text-red-500'/>
              </div>
            }
            <div
              className={`${
                message.sender === currentUser
                  ? "bg-green-600"
                  : "bg-gray-600"
              } max-w-96 mt-4 p-3 rounded`}
            >
              <p className="text-sm font-bold">{message.sender} </p>
              <p className="break-words">{message.content}</p>
              <p className='text-xs text-gray-300'>{timesAgo(message.timeStamp)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center justify-around gap-9 bg-gray-80 fixed bottom-0 w-full h-20">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="text-2xl w-full h-14 dark:bg-gray-600 ml-3 py-2 rounded-full dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center">
          <button
            className="text-2xl px-3 py-3 rounded-full bg-blue-500 hover:bg-blue-700 mr-2 flex items-center justify-center"
          >
            <RiAttachment2 />
          </button>
          <button
            onClick={sendMessage}
            className="text-2xl px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-700 mr-2 flex items-center justify-center gap-3"
          >
            Send <RiArrowRightLine />
          </button>
        </div>
      </div>
    </div>
  );
};
