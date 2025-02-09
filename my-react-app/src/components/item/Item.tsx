import { colors } from "../../colors"
import { useEffect, useState } from "react"

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

interface Photo {
    id: number;
    item_id: number;
    src: string;
    user_id: number;
}

function Item() {

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPhoto, setCurrentPhoto] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let item_id: number = 1
                const response = await fetch('http://localhost:3000/getPhotos', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ item_id }),
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
    
        fetchData(); // Wywołanie funkcji fetchData
      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

    return(
        <div style={{display: 'flex', width: '100%', height: 'calc(100vh - 64px)', backgroundColor: colors.background, marginTop: '10px'}}>
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
            <div style={{marginLeft: '25px', width: '500px'}}>
                <div style={{width: '100%', backgroundColor: colors.primary, height: '30px', alignContent:' center'}}>
                    <p style={{ marginLeft: '10px', color: 'white'}}>Na powitanie</p>

                </div>
                
                <div style={{display: 'flex', height: '55px'}}>
                    <p style={{fontSize: '40px', fontWeight: 'bold'}}>4,10 PLN</p>
                    <p style={{color: 'red', marginTop: '24px', marginLeft: '10px',}}>36% zniżki</p>
                </div>

                <div style={{display: 'flex'}}>
                    <p style={{fontSize: '13px', marginTop: '0px'}}>Najniższa cena w ciągu 30 dni przed obniżką cen. </p>
                    <p style={{fontWeight: 'bold', fontSize:'13px', marginLeft: '3px'}}>6,41zł</p>
                </div>

                <p style={{color: 'gray', fontSize: '10px'}}>Cena zawiera podatek VAT</p>

                <p style={{fontSize: '13px', fontWeight: 'bold'}}>List wygodne figi seksowna różowa marka VS bielizna koronkowa damska bliscy bielizna niski wzrost majtki damskie biustonosz stringi z kryształkami</p>
                
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                    <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                    <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                    <StarHalfIcon style={{color: 'orange', fontSize: '16px'}}  />
                    <StarOutlineIcon style={{color: 'orange', fontSize: '16px'}}  />
                    <p style={{fontSize: '13px', fontWeight:'bold', marginLeft: '5px'}}  >4,8</p>
                    <p style={{fontSize: '13px', marginLeft: '5px'}}  >| 747 Recenzje</p>
                    <p style={{fontSize: '13px', marginLeft: '5px'}}  >| +4 000 Sprzedanych!</p>
                </div>

                <hr style={{marginTop: '5px', marginBottom: '5px'}}/>
                
                <p style={{fontSize: '15px', marginBottom: '5px'}}>Kolor: 5</p>

                <div>
                    {photos.map((item, index) => (
                        <img key={index} src={item.src} onClick={() => setCurrentPhoto(item.src)} style={{width: '55px', marginRight: '10px', border: item.src === currentPhoto ? ('1px solid black') : ('1px dotted gray') , cursor: 'pointer'}} />
                    ))}
                </div>

                <p style={{fontSize: '15px', marginBottom: '5px'}}>Rozmiar: XL</p>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dotted gray', width: '60px', height: '38px', marginRight: '5px'}}> <p style={{color: 'gray'}}>M</p></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dotted gray', width: '60px', height: '38px', marginRight: '5px'}}> <p style={{color: 'gray'}}>L</p></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', width: '60px', height: '38px'}}> <p>XL</p></div>
                </div>

                <p style={{fontSize: '15px', marginBottom: '5px', marginTop: '5px'}}>Sztuka: 1PC</p>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', width: '60px', height: '38px'}}> <p>XL</p></div>
                </div>

            </div>
            <div>
                <div style={{border: '1px solid gray', width: '400px', marginLeft: '10px', padding: '10px'}}>
                    <div style={{display: 'flex'}}>
                        <p style={{fontSize: '14px', fontWeight: 'bold'}}>Sprzedaż i wysyłka:</p>
                        <p style={{fontSize: '14px', marginLeft: 'auto'}}>{'Shop1103999165 >'}</p>
                    </div>

                    <hr style={{marginTop: '5px', marginBottom: '5px'}}/>

                    <div style={{display: 'flex'}}>
                        <p style={{fontSize: '14px', fontWeight: 'bold'}}>Wysyłamy do:</p>
                        <p style={{fontSize: '14px', marginLeft: 'auto'}}>{'Polska >'}</p>
                    </div>
                    
                    <div style={{display: 'flex',  width: '100%', height: '40px', background: "linear-gradient(to bottom,rgb(255, 252, 95),rgb(254, 255, 208))", alignItems: 'center'}}>
                        <div style={{display: 'flex', border: '2px solid orange', backgroundColor: 'rgb(255, 218, 95)', borderRadius: '5px', justifyContent: 'center', alignItems: 'center', height: '25px', width: '50px', marginLeft: '10px'}}>
                            <p style={{fontSize: '11px', fontWeight: 'bold'}}>Choice</p>
                        </div>
                        <p style={{fontSize: '12px', fontWeight: 'bold', marginLeft: '10px'}}>Zobowiązanie BestMarket</p>
                    </div>

                    <div style={{padding: '10px'}}>
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
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Item