import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";
import { useEffect } from "react";


interface ProfileProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface ViewUser {
  id: number;
  username: string;
  email: string;
}

function Profile({setUser} : ProfileProps) {
    const { id } = useParams<{ id: string }>();

    const [pageUser, setPageUser] = useState<ViewUser | null>(null)

    useEffect(() => {
      const fetchGetUser = async() => {

        try{
          const response = await fetch('http://localhost:3000/getUser', {
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

      fetchGetUser()
    }, [])
  
    const logoutUser = () => {
        
        //

        const deleteTodos = async () => {
            try {
              // Pobranie todos
              const todosResponse = await fetch('http://localhost:3000/deleteTodos', {
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
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100vw', height: 'calc(100vh - 146px)', position: 'relative', overflow: 'hidden'}}>
  <div style={{position: 'fixed', width: '100%', height: '100vh', zIndex: '-5', backgroundColor: 'black'}}></div>
  <div style={{position: 'absolute', top: 200, left: '2000px', zIndex: -3, width: '1000px', height: '1000px', backgroundImage: `radial-gradient(circle, ${colors.dot1} 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(300px)'}}></div>
  <div style={{position: 'absolute', top: 300, left: '-500px', zIndex: -4, width: '2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot2} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(400px)'}}></div>
  <div style={{position: 'absolute', top: -1500, left: '-400px', zIndex: -4, width: '2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot3} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(2000px)'}}></div>

  {pageUser && (
    <div style={{border: '2px solid #e0e0e0', width: '80%', maxWidth: '800px', margin: '2rem auto', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgb(255, 255, 255, 0.4)', fontFamily: 'Arial, sans-serif'}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
      <div style={{width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '4px solid #4CAF50', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'}}>
        <span style={{fontSize: '3rem', color: '#4CAF50', fontWeight: 'bold'}}>👤</span>
      </div>

      <div style={{textAlign: 'center'}}>
        <h2 style={{margin: '0', color: '#333', fontSize: '1.8rem'}}>{pageUser.username}</h2>
        <p style={{margin: '0.5rem 0 0', color: '#333', fontSize: '1rem'}}>{pageUser.email}</p>
        <p style={{margin: '0.5rem 0 0', color: '#4CAF50', fontWeight: 'bold'}}>Premium Member</p>
      </div>

      <div style={{display: 'flex', gap: '2rem', margin: '1rem 0'}}>
        <div style={{textAlign: 'center'}}>
          <p style={{margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>124</p>
          <p style={{margin: '0', color: '#666', fontSize: '0.9rem'}}>Posty</p>
        </div>
        <div style={{textAlign: 'center'}}>
          <p style={{margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>1.2k</p>
          <p style={{margin: '0', color: '#666', fontSize: '0.9rem'}}>Obserwujący</p>
        </div>
        <div style={{textAlign: 'center'}}>
          <p style={{margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>543</p>
          <p style={{margin: '0', color: '#666', fontSize: '0.9rem'}}>Obserwowani</p>
        </div>
      </div>

      <button onClick={() => logoutUser()} style={{padding: '0.6rem 1.5rem', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.3s ease'}}>Wyloguj się</button>
    </div>
  </div>
  )}

  
</div>
  );
}

export default Profile;
