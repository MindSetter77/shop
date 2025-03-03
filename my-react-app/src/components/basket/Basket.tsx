import { ShoppingBasketSharp } from "@mui/icons-material";
import { colors } from "../../colors";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Item from "../item/Item";
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
        <div style={{backgroundColor: colors.background, height: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', width: '1000px', height: '500px'}}>
                <div>
                    <div style={{ padding: '15px', backgroundColor: 'white', width: '595px', height: '100px', marginTop: '10px'}}>
                        <p style={{fontSize: '20px', fontWeight: 'bold'}}>{`Koszyk (${basket.length})`}</p>
                        <div style={{display: 'flex'}}>
                            <p style={{fontSize: '13px', marginTop: '15px', border: '2px sold gray'}}>Wybierz wszystkie produkty |</p>
                            <p style={{fontSize: '13px', marginTop: '15px', border: '2px sold gray', marginLeft: '3px'}}>Usuń wybrane produkty</p>
                        </div>
                        
                    </div>

                    <div style={{width: '595px', backgroundColor: 'white', marginTop: '10px', padding: '10px', paddingTop: '1px'}}>

                        {
                            basket.length > 0 ? (
                                basket.map((item, index) => (
                                    <div style={{display: 'flex', marginTop: '10px'}}>
                                        <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Checkbox/>
                                        </div>
                                        <div style={{display: 'flex', width: '100%'}}>
                                            <img src={basket[index].src} style={{maxWidth: '100px', maxHeight: '100px'}}/>
                                            <div style={{marginLeft: '10px', width: '100%'}}>
                                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                                <p>{displayName(basket[index].title, 35)}</p>
                                                <DeleteForeverIcon style={{cursor: 'pointer'}} onClick={() => removeFromBasket(basket[index].id)}/>
                                            </div>
                                                
                                                <p>{basket[0].price} PLN</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))
                            ) : (<div>a</div>)
                        }

                        
                        


                    </div>
                </div>
                <div style={{padding: '15px', backgroundColor: 'white', width: '395px', height: '200px', marginLeft: '10px', marginTop: '10px'}}>
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Podsumowanie</p>
                    <div style={{display: 'flex', fontSize: '14px', marginTop: '10px'}}>
                        <p>Wartość produktów</p>
                        <p style={{marginLeft: 'auto', fontWeight: 'bold'}}>{getPrice()} PLN</p>
                    </div>

                    <div style={{display: 'flex', fontSize: '14px', marginTop: '10px'}}>
                        <p>Szacowana suma</p>
                        <p style={{marginLeft: 'auto', fontWeight: 'bold', fontSize: '20px'}}>{getPrice()} PLN</p>
                    </div>

                    <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50px', backgroundColor: 'red', borderRadius: '25px', marginTop: '10px'}}>
                        <p style={{color: 'white'}}>{`Kasa (${basket.length})`}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Basket