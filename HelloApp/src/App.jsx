import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { JoinRoom } from './components/JoinRoom'
import { ChatProvider } from './context/chatContext'

function App() {

  return (
     <JoinRoom/>
  )
}

export default App
