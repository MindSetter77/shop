import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";
import { useEffect } from "react";


interface OrderProps {
    title: string,
    delivery_location: string,
    id: number,
    item_id: number,
    order_date: string,
    status: string,
    user_id: number,
}



function Order({title, delivery_location, id, item_id, order_date, status, user_id}: OrderProps) {

    const [photo, setPhoto] = useState<string>('');



    const fetchPhotos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getPhotos`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: item_id }),
            });
    
            if (response.ok) {
                const data = await response.json();
                
                setPhoto(data[0].src)
            } else {
                console.error('Error adding user to database:', response);
            }
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    useEffect(() => {
        fetchPhotos()
    
    }, [])

    return (
            <div style={{border: '2px solid #e0e0e0', padding: '0.5rem', maxWidth: '700px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffffcc', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', height: 'fit-content', marginBottom: '10px'}}>
              <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                <img src={photo} alt="Produkt" style={{width: '75px', height: '75px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #ccc'}} />
                <div style={{display: 'flex', flexDirection: 'column', fontSize: '15px', color: '#444', gap: '2px'}}>
                  <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <span>{new Date(order_date).toLocaleDateString('pl-PL')}</span>
                    <span style={{backgroundColor: '#d4edda', color: '#155724', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginLeft: 'auto'}}>✅ {status}</span>
                  </div>
                  <span style={{fontSize: '18px', fontWeight: '600'}}>🛍️ {title}</span>
                  <div style={{display: 'flex'}}>
                    <span style={{color: '#666'}}>📍 {delivery_location}</span>
                    <button style={{padding: '5px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s ease', marginLeft: 'auto', marginTop: '2px'}} onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}>
                      Szczegóły
                    </button>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Order;
