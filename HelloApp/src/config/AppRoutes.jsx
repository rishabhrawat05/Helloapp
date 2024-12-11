import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import { ChatPage } from "../components/ChatPage";
import { Rooms } from "../components/Rooms";

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/chat" element={
                <div className="flex w-full">
                    {/* <Rooms/> */}
                     <ChatPage/>
                </div>
               
                } />
        </Routes>
    )
}
export default AppRoutes;