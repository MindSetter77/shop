import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";
import { useEffect } from "react";
import Order from "./Order";

interface SendDataProps {
    user_id: number;
}

function SendData({user_id}: SendDataProps) {

    const [imie, setImie] = useState<string>('')
    const [nazwisko, setNazwisko] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    const [postCode, setPostCode] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [province, setProvince] = useState<string>('')

    const [street, setStreet] = useState<string>('')
    const [additional, setAdditional] = useState<string>('')

    const getShoppingInfo = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getAdressData`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({user_id: user_id})
            })
      
            if(response.ok){
              const data = await response.json()

              setImie(data[0].first_name)
              setNazwisko(data[0].second_name)
              setPhone(data[0].phone)

              setPostCode(data[0].postCode)
              setCity(data[0].city)
              setProvince(data[0].province)

              setStreet(data[0].street)
              setAdditional(data[0].additional)
            
            }
      
          } catch (error) {
            console.log(`Something went wrong: ${error}`)
          }
    }

    const manageSaveBtn = async() => {
        if ([imie, nazwisko, phone, postCode, city, province, street].every(v => v != null && v !== '')) {
            try{
                const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/setAdressData`, {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({user_id: user_id, imie: imie, nazwisko: nazwisko, phone: phone, postCode: postCode, city: city, province: province, street: street, additional: additional})
                })
          
                if(response.ok){
                  const data = await response.json()
          
                  console.log(data)
                }
          
            } catch (error) {
              console.log(`Something went wrong: ${error}`)
            }
        }
    }

    useEffect(() => {
        getShoppingInfo()
    }, [])

    return (
        <div style={{border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '20px', padding: '1rem', margin: '2rem auto'}}>
        <p style={{fontSize: '1.8rem', marginBottom: '20px', color: '#333', fontWeight: 'bold'}}>Shipping info</p>
        <div style={{borderBottom: '2px solid white', marginBottom: '20px'}}></div>

        <form style={{display: 'grid', gap: '1rem', color: '#333'}}>

          <p>Dane Osobowe</p>
          <div>
            <input type="text" placeholder="Imię" value={imie} onChange={(e) => setImie(e.target.value)} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
            <input type="text" placeholder="Nazwisko" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} maxLength={19} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
            <input type="text" placeholder="Numer telefonu" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={19} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
          </div>

          <p>Adres</p>
          <div>
            <input type="text" placeholder="Kod pocztowy" value={postCode} onChange={(e) => setPostCode(e.target.value)} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
            <input type="text" placeholder="Miasto" value={city} onChange={(e) => setCity(e.target.value)} maxLength={19} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
            <input type="text" placeholder="Województwo" value={province} onChange={(e) => setProvince(e.target.value)} maxLength={19} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
          </div>

          <div>
            <input type="text" placeholder="Nazwa ulicy i numer" value={street} onChange={(e) => setStreet(e.target.value)} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
            <input type="text" placeholder="Dodatkowe informacje o dostawie" value={additional} onChange={(e) => setAdditional(e.target.value)} maxLength={19} style={{padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', fontSize: '14px'}} />
          </div>
          
          
          

          <button type="submit" onClick={(e) => {e.preventDefault(); manageSaveBtn()}} style={{padding: '0.75rem', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '1rem'}}>
            Save
          </button>
        </form>
      </div>
    );
}

export default SendData;
