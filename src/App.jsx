import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from "./LoginPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/register/" element={<RegisterPage/>}/>
        <Route path="/login/" element={<LoginPage/>}/>
        <Route path="/" element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App
