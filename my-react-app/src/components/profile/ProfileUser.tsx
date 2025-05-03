import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";
import { useEffect } from "react";
import Order from "./Order";
import CardInfo from "./CardInfo";
import SendData from "./SendData";
import { userInfo } from "os";
import LeftPanel from "./LeftPanel";

interface ProfileUserProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    id: number;
}

export interface ViewUser {
    id: number;
    username: string;
    email: string;
  }

function ProfileUser({setUser, id} : ProfileUserProps) {

    const [pageUser, setPageUser] = useState<ViewUser | null>(null)
    
    const fetchGetUser = async() => {

        try{
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getUser`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: id})
        })

        if(response.ok){
            const data = await response.json()

            setPageUser(data[0])
        }

        } catch (error) {
        console.log(`Something went wrong: ${error}`)
        }
    }

    useEffect(() => {
        fetchGetUser()
    }, [])

    const logoutUser = () => {
            
            //
    
            const deleteTodos = async () => {
                try {
                  // Pobranie todos
                  const todosResponse = await fetch(`${import.meta.env.VITE_BACK_END_URL}/deleteTodos`, {
                    method: 'DELETE',
                    credentials: 'include', // Ważne, aby wysłać ciasteczka
                  });
                  
                  if (!todosResponse.ok) {
                    throw new Error('Failed to logout');
                  }
                  const todosData = await todosResponse.json();
                  console.log(todosData)
                  setUser(null)
                } catch (err) {
            
                }
              };
            
    
            deleteTodos()
        }
    

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', border: '2px solid #e0e0e0', padding: '1rem', width: '100%', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(to bottom right, rgb(242, 245, 228), rgba(255, 255, 255, 1))', fontFamily: 'Arial, sans-serif', justifyContent: 'center'}}>
            
            

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', border: '2px solid red'}}>
            
            <div style={{textAlign: 'center', border: '2px solid blue', marginTop: '80px'}}>
                <h2 style={{margin: '0', color: '#333', fontSize: '2rem'}}>{pageUser?.username}</h2>
                <p style={{margin: '0.5rem 0 0', color: '#333', fontSize: '1rem'}}>{pageUser?.email}</p>
                <p style={{margin: '0.5rem 0 0', color: '#4CAF50', fontWeight: 'bold'}}>Premium Member</p>
            </div>
            <div style={{display: 'flex', gap: '2rem', margin: '1rem 0'}}>
                <div style={{textAlign: 'center'}}>
                <p style={{margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>124</p>
                <p style={{margin: '0', color: '#333', fontSize: '0.9rem'}}>Posty</p>
                </div>
                <div style={{textAlign: 'center'}}>
                <p style={{margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>1.2k</p>
                <p style={{margin: '0', color: '#333', fontSize: '0.9rem'}}>Obserwujący</p>
                </div>
                <div style={{textAlign: 'center'}}>
                <p style={{margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>543</p>
                <p style={{margin: '0', color: '#333', fontSize: '0.9rem'}}>Obserwowani</p>
                </div>
            </div>
            <button onClick={() => logoutUser()} style={{padding: '0.6rem 1.5rem', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.3s ease'}}>Wyloguj się</button>
            </div>
        </div>
      </div>
    );
}

export default ProfileUser;
