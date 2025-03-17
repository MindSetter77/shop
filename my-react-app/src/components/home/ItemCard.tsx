import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import { ItemInterface } from '../../App';

interface ItemCardProps{
    photo1s: string;
    item: ItemInterface;
    getPriceText: (itemPrice: number) => string;
    getPrice: (p: number, d: number) => number;
}

function ItemCard({photo1s, item, getPriceText, getPrice}: ItemCardProps){
    
    return(
        <div style={{margin: '50px', padding: '20px', borderRadius: '25px', width: '400px',background: 'linear-gradient(to bottom,#35333E 0%,rgb(22, 19, 29) 100%)' }}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                    <img onClick={() => console.log(photo1s)} src={photo1s} style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '20px'}}/>
                    <div style={{display: 'flex',justifyContent: 'center', textOverflow: 'ellipsis', overflow: 'hidden', flexDirection: 'column',  marginLeft: '10px'}}>
                    <p style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{item.title}</p>
                    <div onClick={() => console.log(item)} style={{display: 'flex', alignItems: 'center'}}>
                        <p style={{textDecoration: 'line-through', fontSize: '14px'}}>{`${item.price}`}</p>
                        <p style={{marginLeft: '5px'}}>{`${getPriceText(getPrice(Number(item.price), Number(item.discount)))}`}</p>
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
                    <div style={{display: 'flex', marginTop: '5px'}}>

                        <div style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', height: '25px',  width: '110px', backgroundColor: '#EAEAEB', borderRadius: '5px'}}>
                        <p style={{color: 'black', fontFamily: 'Satoshi', fontWeight: 'bold'}}>Do koszyka</p>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', height: '25px', marginLeft: '10px',  width: '110px', backgroundColor: '#EAEAEB', borderRadius: '5px'}}>
                        <p style={{color: 'black', fontFamily: 'Satoshi', fontWeight: 'bold'}}>O produkcie</p>
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