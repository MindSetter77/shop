import Navbar from "./components/navbar/Navbar"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import Item from "./components/item/item";

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export interface User {
  id: number;
  username: string;
  email: string;
}

function App() {
  
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Home setUser={setUser}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/item" element={<Item/>} />
      </Routes>
    </Router>
  )
}

export default App
