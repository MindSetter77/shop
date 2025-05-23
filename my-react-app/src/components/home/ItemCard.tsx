import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import { ItemInterface } from '../../App';
import { useNavigate } from 'react-router-dom';
import { basket_item } from '../../App';

interface ItemCardProps{
    photo1s: string;
    item: ItemInterface;
    getPriceText: (itemPrice: number) => string;
    getPrice: (p: number, d: number) => number;
    addToBasket: (item: basket_item) => void;
    basket: any[];
    removeFromBasket: (id: number) => void;
    type: number
}

function ItemCard({photo1s, item, getPriceText, getPrice, addToBasket, basket, removeFromBasket, type}: ItemCardProps){
    
    const navigate = useNavigate();

    const manageBasketButton = (id: number) => {
        if(!basket.some(basketItem => basketItem.id === id)){
            addToBasket({id: item.id, src: `${import.meta.env.BACK_END_URL}/images/item_${item.id}/image_1.jpg`, title: item.title, price: Number(item.price),discount: Number(item.discount)})
        } else {
            removeFromBasket(id)
        }


    }

    return(
        <div style={{margin: '20px', padding: '20px', borderRadius: '25px', width: '400px',background: 'linear-gradient(to bottom,#35333E 0%,rgb(22, 19, 29) 100%)', boxShadow: type === 1 ? ('0 5px 15px rgba(204, 204, 204, 0.2)' ) : ('0 0 40px rgb(94, 189, 189, 0.2)'), border: '1px solid gray'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                    <img onClick={() => console.log(photo1s)} src={photo1s} style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '20px'}}/>
                    <div style={{display: 'flex',justifyContent: 'center', textOverflow: 'ellipsis', overflow: 'hidden', flexDirection: 'column',  marginLeft: '10px'}}>
                    <p style={{fontFamily: 'Satoshi-bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{item.title}</p>
                    <div onClick={() => console.log(item)} style={{display: 'flex', alignItems: 'center'}}>
                        <p style={{textDecoration: Number(item.discount) > 0 ? ('line-through') : undefined, fontSize: '14px'}}>{`${getPriceText(Number(item.price))}`}</p>
                        <p style={{marginLeft: '5px'}}>{Number(item.discount) > 0 ? getPriceText(getPrice(Number(item.price), Number(item.discount))) : null}</p>
                    </div>

                    <div onClick={() => console.log(item)} style={{display: 'flex'}}>
                        {
                        Array(Math.floor(item.avg_opinion)).fill(null).map((item, index) => (
                            <StarIcon style={{fontSize: '15px'}}/>
                        ))
                        }

                        {
                        item.avg_opinion % 1 !== 0 ? (
                            <StarHalfIcon style={{fontSize: '15px'}}/>
                        ) : (null)
                        }

                        {
                        Array(5 - Math.ceil(item.avg_opinion)).fill(null).map((item, index) => (
                            <StarOutlineIcon style={{fontSize: '15px'}}/>
                        ))
                        }
                        <p style={{fontSize: '12px'}}>BESTSELLER</p>
                    </div>
                    
                    { type === 1 ? (
                    <div onClick={() => console.log(item)}>
                        <p style={{}}>{item.title}</p>
                    </div> ) : null
                    }
                    <div style={{display: 'flex', marginTop: '5px'}}>

                        <div onClick={() => manageBasketButton(item.id)} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', height: '25px',  width: '110px', backgroundColor: '#EAEAEB', borderRadius: '5px'}}>
                        <p style={{color: 'black', fontFamily: 'Satoshi', fontWeight: 'bold'}}>{basket.some(basketItem => basketItem.id === item.id) ? ('✓') : ("Do koszyka")}</p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', height: '25px', marginLeft: '10px',  width: '110px', backgroundColor: '#EAEAEB', borderRadius: '5px'}}>
                        <p onClick={() => navigate(`/item/${item.id}`)} style={{color: 'black', fontFamily: 'Satoshi', fontWeight: 'bold'}}>O produkcie</p>
                        </div>

                    </div>
                            
                    </div>
                          
                          
                </div>
    
                        

                <div>
                          
                </div>
                        
                        
                        
    
                </div>
            </div>
    )
}

export default ItemCard