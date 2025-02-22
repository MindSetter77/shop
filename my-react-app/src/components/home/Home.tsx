import { colors } from "../../colors"
import { useEffect, useState } from "react"
import { basket_item, User } from "../../App";

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {  Person2, ShoppingBasket } from "@mui/icons-material"; 

interface HomeProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    addToBasket: (item: basket_item) => void;
}

function Home({setUser, addToBasket}: HomeProps){

  const [items, setItems] = useState<any[]>([])
  const [photo1s, setPhoto1s] = useState<any[]>([])
  const [hoverIndex, setHoverIndex] = useState<string | null>(null)

    useEffect(() => {
        // Funkcja, która pobiera todos oraz wszystkich użytkowników
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

        const getPhotoUrls = async (ids: string) => {
          try {
              const response = await fetch('http://localhost:3000/getPhotoUrls', {
                  method: 'POST', 
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ item_ids: ids }),
              });
      
              if (response.ok) {
                  const data = await response.json();

                  setPhoto1s(data)
                  
                  
              } else {
                  console.error('Error adding user to database:', response);
              }
          } catch (error) {
              console.error('Something went wrong!', error);
          }
        };

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
                  console.log('good!')
                  console.log(data)

                  let item_list = []

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

        let items_str = '18, 19, 20, 21, 22, 23, 24, 25, 26, 27'

        fetchTodos(); // Wywołanie funkcji fetchData
        getItems(items_str)
        getPhotoUrls(items_str)
        
      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

  const displayTitle = (name: string) => {
    let limit = 30
    let ret = name

    if(name.length > limit){
      ret = name.slice(0, limit)
      ret = ret + '...'
    }
    return ret 
  };


    return (
        <div style={{display: 'flex', backgroundColor: colors.background}}>
            <div style={{display: 'flex', flexWrap: 'wrap', width: '90%', marginLeft: 'auto', marginRight: 'auto', height: 'calc(100vh - 64px)', marginTop: '10px'}}>
            {items.map((item, index) => (
                    <div key={item.id} 
                         style={{
                             display: 'flex', 
                             flexDirection: 'column',  // Elementy w pionie
                             width: '270px',  // Każdy element zajmuje 18% szerokości, aby w 1 wierszu zmieściło się 5 elementów
                             marginLeft: '10px', 
                             marginBottom: '10px',  // Odstęp między wierszami
                             border: '1px solid lightgray',
                             padding: '10px',
                             boxSizing: 'border-box',  // Upewnia się, że padding nie zwiększa rozmiaru elementu
                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                             background: Number(item.discount.substring(0, 2)) > 80 ? ('#f7fadc') : (colors.background),
                             cursor: 'pointer'
                         }}>
                        <div style={{ width: '98%', height: '250px'}}>
                          <img src={photo1s[index]} style={{width: '100%', maxHeight: '100%'}}/>
                        </div>
                        <p style={{fontSize: '13px'}}>{displayTitle(item.title)}</p>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <p style={{fontSize: '17px', fontWeight: 'bold'}}> {item.price} zł</p>
                          <p style={{marginLeft: '5px', fontSize: '14px'}}>{item.sold_amount} sprzedane</p>
                        </div>

                        <p style={{fontSize: '14px'}}>Bestseller!</p>

                        <div>
                          <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                          <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                          <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                          <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                          <StarHalfIcon style={{color: 'orange', fontSize: '16px'}}  />
                        </div>

                        <div style={{display: 'flex'}}>
                          <div onClick={() => addToBasket({id: item.id, src: photo1s[index]})} onMouseEnter={() => setHoverIndex(item.id)} onMouseLeave={() => setHoverIndex(null)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '30px', border: `2px solid ${colors.primary}`, backgroundColor: hoverIndex === item.id ? (colors.primary) : ('white')}}>
                            <ShoppingBasket style={{fontSize: '23px', marginRight: '5px', color: hoverIndex === item.id ? ('white') : (colors.primary)}}/>
                            <p style={{fontSize: '10px'}}>Do koszyka</p>
                          </div>
                          <div>{item.discount > 0 ? (
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '30px', marginLeft: '5px', border: Number(item.discount.substring(0, 2)) > 80 ? ('2px solid gold') : ('2px solid green')}}>
                              <p>{`Zniżka ${item.discount.substring(0, 2)}%`}</p>
                            </div>
                          ) : ('dsa')}</div>
                        </div>
                        
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home