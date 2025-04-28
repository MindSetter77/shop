import { colors } from "../../colors"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import { motion } from "framer-motion";

interface Photo {
    id: number;
    item_id: number;
    src: string;
    user_id: number;
}

interface ItemProps {
    language: string;
    getPriceText: (itemPrice: number) => string;
    getPrice: (p: number, d: number) => number;
}

function Item({language, getPriceText, getPrice}: ItemProps) {

    const { id } = useParams<{ id: string }>();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPhoto, setCurrentPhoto] = useState<string>('')

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)

    const [sold, setSold] = useState<number>(0)
    const [opinion, setOpinion] = useState<number>(0)
    const [avgOpinion, setAvgOpinion] = useState<number>(0)

    useEffect(() => {
        console.log(language)
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getPhotos`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ item_id: id }),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setCurrentPhoto(data[0].src)
                    setPhotos(data)
                } else {
                    console.error('Error adding user to database:', response);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }
        };

        const fetchData = async () =>{
            try {
                const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getItemData`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ item_id: id }),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setName(data[0].title)
                    setPrice(data[0].price)
                    setDiscount(data[0].discount)

                    setSold(data[0].sold_amount)
                    setOpinion(data[0].opinion_amount)
                    setAvgOpinion(data[0].avg_opinion)
                } else {
                    console.error('Error adding user to database:', response);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }
            
        }
        fetchData()
        fetchPhotos(); // Wywołanie funkcji fetchData
      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

    return(
        <div style={{justifyContent: 'center', display: 'flex', width: '100%', height: 'calc(100vh - 146px)', paddingTop: '64px'}}>
            
            <div style={{position: 'fixed', width: '100%', height: '100vh', zIndex: '-5', backgroundColor: `black`, left: '0', top: '0'}}></div>
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



            <div style={{backgroundColor: 'rgb(45,45,45, 0.9)', padding: '20px', height: '450px', borderRadius: '20px'}}>
            <div style={{display: 'flex', width: '500px', height: '400px'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxHeight: '400px', overflowY: 'auto', width: '105px'}}>
                    {photos.map((item, index) => (
                        <img key={index} src={item.src} onClick={() => setCurrentPhoto(item.src)} style={{width: '75px', marginBottom: '15px'}} />
                    ))}
                </div>
                
                <div style={{width: '411px', height: '396px'}}>
                    <img src={currentPhoto} style={{width: '100%', height: '100%'}} />
                </div>
                
                
            </div>
            </div>
            
            <div style={{marginLeft: '25px', width: '540px', backgroundColor: 'rgb(45,45,45, 0.9)', padding: '15px', borderRadius: '20px', height: '550px'}}>
                <div style={{width: '100%', backgroundColor: colors.primary, height: '30px', alignContent:' center'}}>
                    <p style={{ marginLeft: '10px', color: 'white'}}>Na powitanie</p>

                </div>
                
                <div style={{display: 'flex', height: '55px'}}>
                    <p style={{fontSize: '40px', fontWeight: 'bold', color: colors.text}}>{getPriceText(getPrice(price, discount))}</p>
                    <p style={{color: 'red', marginTop: '24px', marginLeft: '10px'}}>{discount} zniżki</p>
                </div>

                <div style={{display: 'flex'}}>
                    <p style={{fontSize: '13px', marginTop: '0px', color: colors.text}}>Cena bez udzielonej promocji: </p>
                    <p style={{fontWeight: 'bold', fontSize:'13px', marginLeft: '3px', color: colors.text }}>{getPriceText(price)}</p>
                </div>

                <p style={{color: 'gray', fontSize: '10px'}}>Cena zawiera podatek VAT</p>

                <p style={{fontSize: '13px', fontWeight: 'bold', color: colors.text}}>{name}</p>
                
                <div style={{display: 'flex', alignItems: 'center', color: colors.text}}>
                    <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                    <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                    <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                    <StarHalfIcon style={{color: 'orange', fontSize: '16px'}}  />
                    <StarOutlineIcon style={{color: 'orange', fontSize: '16px'}}  />
                    <p style={{fontSize: '13px', fontWeight:'bold', marginLeft: '5px'}}  >{avgOpinion}</p>
                    <p style={{fontSize: '13px', marginLeft: '5px'}}  >| {opinion} Recenzje</p>
                    <p style={{fontSize: '13px', marginLeft: '5px'}}  >| +{sold} Sprzedanych!</p>
                </div>

                <hr style={{marginTop: '5px', marginBottom: '5px'}}/>
                
                <p style={{fontSize: '15px', marginBottom: '5px', color: colors.text}}>Kolor: 5</p>

                <div>
                    {photos.map((item, index) => (
                        <img key={index} src={item.src} onClick={() => setCurrentPhoto(item.src)} style={{width: '55px', marginRight: '10px', border: item.src === currentPhoto ? ('1px solid black') : ('1px dotted gray') , cursor: 'pointer'}} />
                    ))}
                </div>

                <p style={{fontSize: '15px', marginBottom: '5px', color: colors.text}}>Rozmiar: XL</p>
                <div style={{display: 'flex', color: colors.text}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dotted gray', width: '60px', height: '38px', marginRight: '5px'}}> <p style={{color: 'gray'}}>M</p></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dotted gray', width: '60px', height: '38px', marginRight: '5px'}}> <p style={{color: 'gray'}}>L</p></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', width: '60px', height: '38px'}}> <p>XL</p></div>
                </div>

                <p style={{fontSize: '15px', marginBottom: '5px', marginTop: '5px', color: colors.text}}>Sztuka: 1PC</p>
                <div style={{display: 'flex', color: colors.text}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', width: '60px', height: '38px'}}> <p>XL</p></div>
                </div>

            </div>
            
            <div>
                <div style={{width: '400px', marginLeft: '10px', padding: '10px', backgroundColor: 'rgb(45,45,45, 0.9)', borderRadius: '20px'}}>
                    <div style={{display: 'flex', color: colors.text}}>
                        <p style={{fontSize: '14px', fontWeight: 'bold'}}>Sprzedaż i wysyłka:</p>
                        <p style={{fontSize: '14px', marginLeft: 'auto'}}>{'Shop1103999165 >'}</p>
                    </div>

                    <hr style={{marginTop: '5px', marginBottom: '5px'}}/>

                    <div style={{display: 'flex', color: colors.text}}>
                        <p style={{fontSize: '14px', fontWeight: 'bold'}}>Wysyłamy do:</p>
                        <p style={{fontSize: '14px', marginLeft: 'auto'}}>{'Polska >'}</p>
                    </div>
                    
                    <div style={{display: 'flex',  width: '100%', height: '40px', background: "linear-gradient(to bottom,rgb(255, 252, 95),rgb(254, 255, 208))", alignItems: 'center'}}>
                        <div style={{display: 'flex', border: '2px solid orange', backgroundColor: 'rgb(255, 218, 95)', borderRadius: '5px', justifyContent: 'center', alignItems: 'center', height: '25px', width: '50px', marginLeft: '10px'}}>
                            <p style={{fontSize: '11px', fontWeight: 'bold'}}>Choice</p>
                        </div>
                        <p style={{fontSize: '12px', fontWeight: 'bold', marginLeft: '10px'}}>Zobowiązanie BestMarket</p>
                    </div>

                    <div style={{padding: '10px', color: colors.text}}>
                        <div style={{display: 'flex'}}>
                            <LocalShippingIcon style={{fontSize: '20px', marginRight: '5px'}}/>
                            <p style={{fontSize: '13px', fontWeight: 'bold'}}>Darmowa dostawa</p>
                        </div>
                        
                        <div style={{display: 'flex'}}>
                            <LocalPostOfficeIcon style={{fontSize: '20px', marginRight: '5px'}}/>
                            <p style={{fontSize: '13px', fontWeight: 'bold'}}>Szybka dostawa</p>
                        </div>


                        <div style={{display: 'flex'}}>
                            <HealthAndSafetyIcon  style={{fontSize: '20px', marginRight: '5px'}}/>
                            <p style={{fontSize: '13px', fontWeight: 'bold'}}>Bezpieczeństwo i ochrona prywatności</p>
                        </div>

                        <hr style={{marginTop: '10px', marginBottom: '10px'}}/>

                        <p>Ilość</p>

                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', border: '2px solid black', width: '20px', height: '20px', borderRadius: '10px', justifyContent: 'center', alignItems: 'center'}}>
                                -
                            </div>
                            <p style={{fontWeight: 'bold', marginLeft: '10px', marginRight: '10px'}}>1</p>
                            <div style={{display: 'flex', border: '2px solid black', width: '20px', height: '20px', borderRadius: '10px', justifyContent: 'center', alignItems: 'center'}}>+</div>
                        </div>
                        
                        <div style={{display: 'flex', backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '5px' }}>
                            <p style={{color: 'white', margin: 0}}>Kup teraz!</p>
                        </div>

                        <div style={{display: 'flex', border: `2px solid ${colors.primary}`, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '10px' }}>
                            <p>Dodaj do koszyka</p>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Item