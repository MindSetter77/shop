import Navbar from "./components/navbar/Navbar"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import Item from "./components/item/Item";

// src/index.js lub src/App.js
import './index.css';  // Upewnij się, że ścieżka pasuje do lokalizacji Twojego pliku CSS


import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Basket from "./components/basket/Basket";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface basket_item {
  id: number;
  src: string;
  title: string;
  price: number
  discount: number
}

export interface ItemInterface {
  additional_settings: string
  ali_price: string
  ali_url: string
  avg_opinion: number
  discount: string
  id: number
  max_amount: number
  opinion_amount: number
  price: string
  sold_amount: number
  tag: string
  title: string
  user_id: number

}

function App() {
  
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<string>('PL')
  const [languageData, setLangaugeData] = useState<{ [key: string]: any }>({})

  const [basket, setBasket] = useState<any[]>([])
  const [isBasketOpen, setIsBasketOpen] = useState<Boolean>(false)

  const [priceTable, setPriceTable] = useState<number[]>([])

  const addToBasket = (item: basket_item) => {
    
    if(!basket.some(basketItem => basketItem.id === item.id)){
      let basketCpy = [...basket]
      basketCpy.push(item)
      setBasket(basketCpy)
    }

  }

  const removeFromBasket = (id: number) => {
    setBasket(prevBasket => prevBasket.filter(basketItem => basketItem.id !== id));
    console.log(`Usunięto element o id: ${id}`);
  };

  const fetchExchangeRate = async (newLanguage: string) => {

    try {
      const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json");
      const data = await response.json();
      let usdpln = data.rates[0].mid

      const responseGbp = await fetch("https://api.frankfurter.app/latest?from=USD&to=GBP");
      const dataGbp = await responseGbp.json(); 
      let gbpusd = dataGbp.rates.GBP

      const responseUsdEur = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR");
      const dataUsdEur = await responseUsdEur.json();
      let usdeur = dataUsdEur.rates.EUR;

      setPriceTable([usdpln, gbpusd, usdeur])

      console.log(priceTable)
        
    } catch (error) {
        console.error("Błąd pobierania kursu walut:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      // Pobranie todos
      const todosResponse = await fetch('http://localhost:3000/todos', {
        method: 'GET',
        credentials: 'include', // Ważne, aby wysłać ciasteczka
      });
      
      if (!todosResponse.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todosData = await todosResponse.json();
      setUser(todosData.userSession.result)
    } catch (err) {

    }
  };

  const getPriceText = (itemPrice: number) => {
      
      switch(language){
        case 'PL':
          return (itemPrice * priceTable[0]).toFixed(2) + " PLN";
        case 'UK':
          return (itemPrice * priceTable[1]).toFixed(2) + " £"
        case 'DE':
          return (itemPrice * priceTable[2]).toFixed(2) + " EUR"
        case 'FR':
          return (itemPrice * priceTable[2]).toFixed(2) + " EUR"
        default:
          return itemPrice.toFixed(2) + " USD"
      }
  
      
    }

    const getPrice = (p: number, d: number) => {
            let val = p / 100
            let ret = val * (100-d)
            return parseFloat(ret.toFixed(2))
        } 

    const changeLanguage = async(language: string) => {
      
      
      try {
        
        const response = await fetch('http://localhost:3000/getLanguage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lang: language }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch language data');
        }
        
    
        const data = await response.json();
        setLangaugeData(data)

      } catch (err) {
        console.error('Error fetching language data:', err);
      }
      
      
      
    } 
  

  useEffect(() => {
    fetchExchangeRate(language)
    changeLanguage(language)
    fetchTodos()

  }, [language])

  return (
    <Router>
      <Navbar user={user} language={language} setLanguage={setLanguage} basket={basket} setIsBasketOpen={setIsBasketOpen} isBasketOpen={isBasketOpen} removeFromBasket={removeFromBasket} fetchExchangeRate={fetchExchangeRate} getPrice={getPrice} getPriceText={getPriceText} priceTable={priceTable} languageData={languageData}/>
      <Routes>
        <Route path="/" element={<Home setUser={setUser} addToBasket={addToBasket} basket={basket} language={language} getPriceText={getPriceText} getPrice={getPrice} removeFromBasket={removeFromBasket} languageData={languageData}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/item/:id" element={<Item language={language} getPriceText={getPriceText} getPrice={getPrice}/>} />
        <Route path="/basket" element={<Basket basket={basket} removeFromBasket={removeFromBasket}/>} />

        <Route path="/profile/:id" element={<Profile setUser={setUser}/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
