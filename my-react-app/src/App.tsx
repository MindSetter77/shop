import Navbar from "./components/navbar/Navbar"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import Item from "./components/item/Item";

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface basket_item {
  id: number;
  src: string;
}

function App() {
  
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<string>('PL')
  const [basket, setBasket] = useState<any[]>([])
  const [isBasketOpen, setIsBasketOpen] = useState<Boolean>(false)

  const addToBasket = (item: basket_item) => {
    let basketCpy = [...basket]
    basketCpy.push(item)
    setBasket(basketCpy)

    console.log(basket)
  }

  return (
    <Router>
      <Navbar user={user} language={language} setLanguage={setLanguage} basket={basket} setIsBasketOpen={setIsBasketOpen} isBasketOpen={isBasketOpen}/>
      <Routes>
        <Route path="/" element={<Home setUser={setUser} addToBasket={addToBasket}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/item/:id" element={<Item/>} />
      </Routes>
    </Router>
  )
}

export default App
