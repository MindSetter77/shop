import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";
import { useEffect } from "react";
import Order from "./Order";

interface CardInfoProps {
    user_id: number;
}

function CardInfo({user_id}: CardInfoProps) {

    const [cardName, setCardName] = useState<string>('')
    const [cardNumber, setCardNumber] = useState<string>('')
    const [cardDate, setCardDate] = useState<string>('')
    const [ccv, setCcv] = useState<string>('')

    const getCardInfo = () => {
      const getInfo = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getCardInfo`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({user_id: user_id})
            })
      
            if(response.ok){
              const data = await response.json()
      
              

              setCardName(data[0].cardName)
              setCardNumber(data[0].cardNumber)
              setCardDate(data[0].cardDate)
              setCcv(data[0].ccv)
            
            }
      
          } catch (error) {
            console.log(`Something went wrong: ${error}`)
          }

          
    }
    getInfo()
    }

    const setCardData = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/setCardInfo`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({user_id: user_id, cardName: cardName, cardNumber: cardNumber, cardDate: cardDate, ccv: ccv})
            })
      
            if(response.ok){
              const data = await response.json()
      
              console.log(data)
            }
      
          } catch (error) {
            console.log(`Something went wrong: ${error}`)
          }
    }

    const handleSaveClick = () => {
        
        const nameValid = /^[A-Za-z]+ [A-Za-z]+$/.test(cardName);
        const numberValid = /^\d{16}$/.test(cardNumber);
        
        const dateValid = /^.{5}$/.test(cardDate);
        const ccvValid = /^\d{3}$/.test(ccv);

        if(nameValid && numberValid && dateValid && ccvValid){
            setCardData()
        }

        
    }

    const handleNumberChange = (n: string) => {
        n.trim()
        const isDigit = !isNaN(Number(n))        
        if(isDigit || n==""){
            setCardNumber(n)
        }
    }

    const handleDateChange = (n: string) => {

        const insertAt = (str: string, index: number, char: string): string => {
            return str.slice(0, index) + char + str.slice(index);
          };
        
        if (n.includes('/')) {
            n = n.replace('/', '');
          }

        const isDigit = !isNaN(Number(n)) && n.trim();

        if(isDigit || n === ""){
            if(n.length > 2){
                n=insertAt(n, 2, "/")
            }
            setCardDate(n)
        }

        
    }

    const handleCCVChange = (str: string) => {
        const isDigit = !isNaN(Number(str)) && str.trim();
        if(isDigit || str===""){
            setCcv(str)
        }
    }

    useEffect(() => {
      console.log(`${user_id} userID`)
      getCardInfo()
    }, [])



    return (
        <div style={{border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '20px', padding: '1rem', margin: '2rem auto'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '20px', color: '#333', fontWeight: 'bold'}}>Shipping info</h2>
        <div style={{borderBottom: '2px solid white', marginBottom: '20px'}}></div>

        <form style={{display: 'grid', gap: '1rem', color: '#333'}}>
          <input type="text" placeholder="Cardholder Name" value={cardName} onChange={(e) => {setCardName(e.target.value)}} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
          
          <input type="text" value={cardNumber} onChange={(e) => handleNumberChange(e.target.value)} placeholder="Card Number" maxLength={19} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input type="text" value={cardDate} onChange={(e) => handleDateChange(e.target.value)} placeholder="MM/YY" maxLength={5} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
            <input type="text" value={ccv} onChange={(e) => {handleCCVChange(e.target.value)}} placeholder="CVV" maxLength={3} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
          </div>

          <button type="submit" onClick={(e) => {e.preventDefault(); handleSaveClick()}} style={{padding: '0.75rem', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '1rem'}}>
            Save
          </button>
        </form>
      </div>
    );
}

export default CardInfo;
