import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AppRoutes from './config/AppRoutes.jsx'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './context/chatContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster/>
    <ChatProvider>
    <AppRoutes/>
    </ChatProvider>
   
    </BrowserRouter>
   
  </StrictMode>,
)
