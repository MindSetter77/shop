
import { colors } from "../../colors";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Checkbox from "@mui/material/Checkbox";


interface BasketProps {
    basket: any[];
    removeFromBasket: (id: number) => void;
}



function Basket({basket, removeFromBasket}: BasketProps){

    const displayName = (name: string, amount: number) => {
        return name.length > amount ? name.slice(0, amount) : name;
    };

    const getPrice = () => {
        
        let totalPrice = basket.reduce((total, item) => total + Number(item.price), 0);
        let formattedPrice = totalPrice.toFixed(2);

        return formattedPrice;
    };

    return (
        
        <div style={{height: 'calc(100vh - 146px)', display: 'flex', justifyContent: 'center'}}>
            
            <div style={{position: 'fixed', width: '100vw', height: '100vh', zIndex: '-5', backgroundColor: `rgb(0, 0, 0)`}}></div>
            <div style={{position: 'fixed',top: 200, left: '2000px', zIndex: -3, width:'1000px', height: '1000px', backgroundImage: `radial-gradient(circle, ${colors.dot1} 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(300px)'}}></div>
            <div style={{position: 'fixed',top: 300, left: '-500px', zIndex: -4, width:'2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot2} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(400px)'}}></div>
            <div style={{position: 'fixed',top: -1500, left: '-400px', zIndex: -4, width:'2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot3} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(2000px)'}}></div>

            <div style={{display: 'flex', width: '1000px', height: '500px', marginTop: 'auto', marginBottom: 'auto', border: '2px solid green'}}>
                <div>
                    <div style={{ padding: '15px', backgroundColor: colors.blackBackgroundColorInBasket, width: '595px', height: '100px', marginTop: '10px', borderRadius: '25px', }}>
                        <p style={{fontSize: '20px', fontWeight: 'bold', color: 'white'}}>{`Koszyk (${basket.length})`}</p>
                        <div style={{display: 'flex'}}>
                            <p style={{fontSize: '13px', marginTop: '15px', border: '2px sold gray', color: 'white'}}>Wybierz wszystkie produkty |</p>
                            <p style={{fontSize: '13px', marginTop: '15px', border: '2px sold gray', marginLeft: '3px', color: 'white'}}>Usuń wybrane produkty</p>
                        </div>
                        
                    </div>

                    <div style={{width: '595px', backgroundColor: colors.blackBackgroundColorInBasket, marginTop: '10px', padding: '10px', borderRadius: '25px'}}>

                        {
                            basket.length > 0 ? (
                                basket.map((item, index) => (
                                    <div style={{display: 'flex', marginTop: index > 0 ? ('10px') : undefined}}>
                                        <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Checkbox style={{color: 'white'}}/>
                                        </div>
                                        <div style={{display: 'flex', width: '100%'}}>
                                            <img src={basket[index].src} style={{maxWidth: '100px', maxHeight: '100px'}}/>
                                            <div style={{marginLeft: '10px', width: '100%'}}>
                                            <div style={{ display: 'flex', width: '98%', justifyContent: 'space-between' }}>
                                                <p style={{color: 'white'}}>{displayName(basket[index].title, 35)}</p>
                                                <DeleteForeverIcon style={{color: 'white', cursor: 'pointer', marginTop: '10px'}} onClick={() => removeFromBasket(basket[index].id)}/>
                                            </div>
                                                
                                                <p style={{color: 'white'}}>{basket[0].price} PLN</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))
                            ) : (<div>a</div>)
                        }

                        
                        


                    </div>
                </div>
                <div style={{padding: '15px', backgroundColor: colors.blackBackgroundColorInBasket, width: '395px', height: '200px', marginLeft: '10px', marginTop: '10px', borderRadius: '25px'}}>
                    <p style={{fontSize: '20px', fontWeight: 'bold', color: 'white'}}>Podsumowanie</p>
                    <div style={{display: 'flex', fontSize: '14px', marginTop: '10px'}}>
                        <p style={{color: 'white'}}>Wartość produktów</p>
                        <p style={{marginLeft: 'auto', fontWeight: 'bold', color: 'white'}}>{getPrice()} PLN</p>
                    </div>

                    <div style={{display: 'flex', fontSize: '14px', marginTop: '10px'}}>
                        <p style={{color: 'white'}}>Szacowana suma</p>
                        <p style={{marginLeft: 'auto', fontWeight: 'bold', fontSize: '20px', color: 'white'}}>{getPrice()} PLN</p>
                    </div>

                    <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50px', backgroundColor: 'red', borderRadius: '25px', marginTop: '30px'}}>
                        <p style={{color: 'white'}}>{`Kasa (${basket.length})`}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Basket