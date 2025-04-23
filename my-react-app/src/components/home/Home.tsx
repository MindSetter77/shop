import { colors } from "../../colors"
import { useEffect, useState } from "react"
import { basket_item, User } from "../../App";


import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DiscountIcon from '@mui/icons-material/Discount';

// src/index.js lub src/App.js
import '../../index.css';  // Upewnij się, że ścieżka pasuje do lokalizacji Twojego pliku CSS

import ItemCard from "./ItemCard";

interface HomeProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    addToBasket: (item: basket_item) => void;
    basket: any[];
    language: string;
    getPriceText: (itemPrice: number) => string;
    getPrice: (p: number, d: number) => number;
    removeFromBasket: (id: number) => void;
    languageData: { [key: string]: string };

}

function Home({setUser, addToBasket, basket, language, getPriceText, getPrice, removeFromBasket, languageData }: HomeProps){

  const navigate = useNavigate();
  
  const [items, setItems] = useState<any[]>([])
  const [photo1s, setPhoto1s] = useState<any[]>([])
  const [photoSorted, setPhotoSorted] = useState<any[]>([])

  const [discountedItems, setDiscountedItems] = useState<any[] | null>([])

  const headers = ['Polecane', 'Uroda', 'Gowno', 'komputer', 'Znizka']

  const [filter, setFilter] = useState('Znizka')
  

  const highlight = false

  const setPhotoUrls = (data: any, type: number) => {
    let url_list = []
    
    for(let i = 0; i<data.length; i++){
      url_list.push(`http://localhost:3000/images/item_${data[i].id}/image_1.jpg`)
    }

    console.log(data)

    if(type === 1){
      setPhoto1s(url_list)
    } else {
      setPhotoSorted(url_list)
    }
    
    
  }

  const getItems = async (ids: string) => {
    try {
        const response = await fetch('http://localhost:3000/getItems', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_ids: ids }),
        });

        if (response.ok) {
            const data = await response.json();

            let item_list = []
            
            setPhotoUrls(data, 1)

            for(let i = 0; i<data.length; i++){
              let item = data[i]
              item_list.push(item)
            }
            


            setItems(item_list)
            
            
        } else {
            console.error('Error adding user to database:', response);
        }
    } catch (error) {
        console.error('Something went wrong!', error);
    }
  };

  const getDiscountItems = async(filterr: string) => {
    try {
      const response = await fetch('http://localhost:3000/getSortedItems', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({sort_type: filterr})
      });

      if (response.ok) {
          const data = await response.json();
  
          setDiscountedItems(data)
          setPhotoUrls(data, 2)
      } else {
          console.error('Error getting discounted items:', response);
      }
    } catch (error) {
        console.error('Something went wrong!', error);
    }
  }

  useEffect(() => {
      // Funkcja, która pobiera todos oraz wszystkich użytkowników

      let items_str = '2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21'

      getItems(items_str)

      getDiscountItems(filter)
        
    }, [2]); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

  

  const [isOpen, setIsOpen] = useState(true);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  const headerClick = (item: string) => {
    setFilter(item)
    getDiscountItems(item)
  }
  

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100vw', overflowY: 'auto'  }}>
          
          <div style={{position: 'fixed', width: '100%', height: '100vh', zIndex: '-5', backgroundColor: `black`}}></div>
          <motion.div 
          initial={{ x: 0, opacity: 0 }}  // Startowa pozycja - poza ekranem
          animate={{ x: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
          transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
          style={{position: 'absolute',top: 200, left: '2000px', zIndex: -3, width:'1000px', height: '1000px', backgroundImage: `radial-gradient(circle, ${colors.dot1} 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(300px)'}}></motion.div>
          <motion.div 
          initial={{ x: -500, opacity: 0 }}  // Startowa pozycja - poza ekranem
          animate={{ x: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
          transition={{ type: "tween", duration: 3, stiffness: 90, damping: 15 }} // Płynne pojawianie 
          style={{position: 'absolute',top: 300, left: '-500px', zIndex: -4, width:'2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot2} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(400px)'}}></motion.div>
          <motion.div 
          initial={{ x: -500, y: -500, opacity: 0 }}  // Startowa pozycja - poza ekranem
          animate={{ x: 0, y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
          transition={{ type: "tween", duration: 2, stiffness: 90, damping: 15 }} // Płynne pojawianie 
          style={{position: 'absolute',top: -1500, left: '-400px', zIndex: -4, width:'2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot3} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(2000px)'}}></motion.div>


          <div style={{width: '100', border: highlight ? ('2px solid red') : undefined, marginTop: '64px'}}>
            <div style={{display: 'flex'}}>
            <div style={{width: '50%', height: '100%', border: highlight ? ('2px solid yellow') : undefined, paddingLeft: '23%', display: 'flex', alignContent: 'center', }}>

              <div style={{width: '100%', height: '60%', border: highlight ? ('2px solid green') : undefined, marginTop: '100px', marginBottom: '10px'}}>
                
                <motion.div 
                initial={{ y: 10, opacity: 0 }}  // Startowa pozycja - poza ekranem
                animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                transition={{ type: "tween", delay: 1, duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
                style={{width: '320px', height: '40px', backgroundImage: `linear-gradient(to bottom, #272727, #11101D)`, borderRadius: '10px'}}>
                  
                  <div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontFamily: 'Satoshi'}
                }>
                    <DiscountIcon style={{color: '#66ccff', fontSize: '16px', marginRight: '5px'}}/>
                    <p style={{color: 'white'}}>80%</p>
                    <p style={{color: 'rgb(194, 194, 194)', marginLeft: '5px'}}>{languageData.discountText1}</p>
                    <p style={{color: 'white', marginLeft: '5px'}}>{languageData.discountText2}</p>
                    <p style={{color: 'rgb(194, 194, 194)', marginLeft: '5px'}}>{languageData.discountText3}</p>

                  </div>

                  
                </motion.div>

                <motion.div 
                initial={{ y: 100, opacity: 0 }}  // Startowa pozycja - poza ekranem
                animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
                style={{display: 'flex', flexDirection: 'column', fontFamily: 'Satoshi-Black'}}>
                    <p style={{color: 'white', fontSize: '60px'}}>{languageData.mainSlogan1}</p>
                    <motion.p initial={{ opacity: 0 }} animate={{opacity: [0.8, 1, 0.8, 1],backgroundPosition: ["80% 50%", "90% 50%", "70% 50%", "80% 50%"]}} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }} style={{fontFamily: 'Satoshi-Bold', fontSize: '60px',fontWeight: 'bold',background: 'linear-gradient(90deg, #66ccff 40%, #ffffff 100%)',backgroundSize: '300% 100%',backgroundPosition: "80% 50%",WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',whiteSpace: 'nowrap',}}
                    >{languageData.mainSlogan2}</motion.p>
                    <p style={{color: 'white', fontSize: '60px', width: '100%'}}>{languageData.mainSlogan3}</p>
                  </motion.div>

                  <motion.div 
                  initial={{ y: 0, opacity: 0 }}  // Startowa pozycja - poza ekranem
                  animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                  transition={{ type: "tween", delay: 1, duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
                  style={{width: '100%', fontSize: '16px', marginTop: '20px'}}>
                    <p style={{color: 'gray', fontFamily: 'Satoshi'}}>{languageData.underMainSlogan}</p>
                  </motion.div>


              </div>

            </div>

            <div style={{width: '50%',color: 'white', border: highlight ? ('2px solid green') : undefined, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

              <motion.div 
              initial={{ x: 40, y: 20, opacity: 0 }}  // Startowa pozycja - poza ekranem
              animate={{ x: 0, y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
              transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
              style={{width: '450px', border: highlight ? ('2px solid red') : undefined, marginRight: 'auto', marginLeft: '10%'}}>
              <Slider {...settings}>

              {items?.map((item, index) => {
                
                if(index < 100){
                  return(
                    <div>
                      <ItemCard photo1s={photo1s[index]} item={item} getPriceText={getPriceText} getPrice={getPrice} addToBasket={addToBasket} basket={basket} removeFromBasket={removeFromBasket} type={1}/>
                    </div>)
                } else {
                  return (null)
                }
                
              })}
              
              </Slider>
              </motion.div>


              
            </div>

            </div>

            <div style={{display: 'flex', height: '180px', border: highlight ? ('2px solid cyan') : undefined, alignItems: 'center', justifyContent: 'center'}}>
              <motion.div 
              initial={{ y: 50, opacity: 0 }}  // Startowa pozycja - poza ekranem
              animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
              transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15, delay: 1}} // Płynne pojawianie 
              style={{display: 'flex', alignItems: 'center'}}>
                <p style={{color: 'white', fontSize: '30px', marginRight: '20px', fontFamily: 'Satoshi-Bold'}}>3800+</p>
                <motion.p initial={{ opacity: 0 }} animate={{opacity: [0.8, 1, 0.8, 1],backgroundPosition: ["80% 50%", "90% 50%", "70% 50%", "80% 50%"]}} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }} style={{fontSize: '20px',fontWeight: 'bold',background: 'linear-gradient(90deg, #66ccff 40%, #ffffff 100%)',backgroundSize: '300% 100%',backgroundPosition: "80% 50%",WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',whiteSpace: 'nowrap',}}
                >{languageData.activeUser}</motion.p>
                
              </motion.div>

              <div style={{width: '2px', height: '10px', backgroundColor: 'gray', marginLeft: '40px'}}/>

              <motion.div 
              initial={{ y: 50, opacity: 0 }}  // Startowa pozycja - poza ekranem
              animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
              transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15, delay: 2 }} // Płynne pojawianie 
              style={{display: 'flex', alignItems: 'center', marginLeft: '40px'}}>
                <p style={{color: 'white', fontSize: '30px', marginRight: '20px', fontFamily: 'Satoshi-Bold'}}>230+</p>
                <motion.p initial={{ opacity: 0 }} animate={{opacity: [0.8, 1, 0.8, 1],backgroundPosition: ["80% 50%", "90% 50%", "70% 50%", "80% 50%"]}} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }} style={{fontSize: '20px',fontWeight: 'bold',background: 'linear-gradient(90deg, #66ccff 40%, #ffffff 100%)',backgroundSize: '300% 100%',backgroundPosition: "80% 50%",WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',whiteSpace: 'nowrap',}}
                >{languageData.company}</motion.p>
                
              </motion.div>

              <div style={{width: '2px', height: '10px', backgroundColor: 'gray', marginLeft: '40px'}}/>

              <motion.div 
              initial={{ y: 50, opacity: 0 }}  // Startowa pozycja - poza ekranem
              animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
              transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15, delay: 3 }} // Płynne pojawianie 
              style={{display: 'flex', alignItems: 'center', marginLeft: '40px'}}>
                <p style={{color: 'white', fontSize: '30px', marginRight: '20px', fontFamily: 'Satoshi-Bold'}}>$230M+</p>
                <motion.p initial={{ opacity: 0 }} animate={{opacity: [0.8, 1, 0.8, 1],backgroundPosition: ["80% 50%", "90% 50%", "70% 50%", "80% 50%"]}} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }} style={{fontSize: '20px',fontWeight: 'bold',background: 'linear-gradient(90deg, #66ccff 40%, #ffffff 100%)',backgroundSize: '300% 100%',backgroundPosition: "80% 50%",WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',whiteSpace: 'nowrap',}}
                >{languageData.transaction}</motion.p>
              </motion.div>
            </div>
            <div style={{border: highlight ? ('2px dotted purple') : undefined, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{display: 'flex', border: '1px solid gray', justifyContent: 'space-between', width: '50%', backgroundColor: 'rgb(255, 255, 255, 0.1)', height: '40px', marginTop: '10px', borderRadius: '30px', padding: '10px', marginBottom: '10px', alignItems: 'center'}}>
                {headers.map((item, index) => (
                  <motion.div 
                  initial={{ x: 20, opacity: 0 }}  // Startowa pozycja - poza ekranem
                  animate={{ x: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                  transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15, delay: index * 0.5 }} // Płynne pojawianie 
                  onClick={() => headerClick(item)} style={{color: 'white', backgroundColor: item === filter ? ('gray'):('transparent'), border: item === filter ? ('1px solid white') : ('transparent') , borderRadius: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25px', cursor: 'pointer'}}>
                    <p style={{marginLeft: '10px', marginRight: '10px'}}>{item}</p>
                  </motion.div>
                  
                ))}
              </div>
              <motion.div 
              initial={{ y: 0, opacity: 0 }}  // Startowa pozycja - poza ekranem
              animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
              transition={{ type: "tween", duration: 2, stiffness: 90, damping: 15, delay: 1 }} // Płynne pojawianie 
              style={{display: 'flex',paddingTop: '10px', position: 'relative', zIndex: 0 , flexWrap: 'wrap', gap: '-10px', justifyContent: 'center', color: 'white', border: '1px solid rgb(165, 165, 230)', borderBottom: '0px', backgroundColor: 'rgb(109, 110, 179, 0.5)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', width: '95%', marginTop: '10px', overflow: 'hidden', boxShadow: '0 -10px 80px rgb(139, 255, 245, 0.2)'}}>
                
                <div style={{position: 'absolute', right: '-100px', top: '0px', width: '500px', height: '500px', zIndex: -1, backgroundColor: 'red', backgroundImage: `radial-gradient(circle, rgb(167, 167, 223) 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(180px)'}}></div>
                <div style={{position: 'absolute', top: '700px', left: '-600px', width: '2000px', height: '2000px', zIndex: -1, backgroundImage: `radial-gradient(circle, rgb(84, 139, 187) 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(180px)'}}></div>

                {discountedItems?.map((item, index) => (
                  <motion.div
                  initial={{ y: 0, opacity: 0 }}  // Startowa pozycja - poza ekranem
                  animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                  transition={{ type: "tween", duration: 0.5, stiffness: 90, damping: 15, delay: (index * 0.3) + 3 }} // Płynne pojawianie 
                  >
                    <ItemCard photo1s={photoSorted[index]} item={item} getPriceText={getPriceText} getPrice={getPrice} addToBasket={addToBasket} basket={basket} removeFromBasket={removeFromBasket} type={2}/>
                  </motion.div>
                ))}
                
              </motion.div>
            </div>
          </div>
          

        </div>
    )
}

export default Home