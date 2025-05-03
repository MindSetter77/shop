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
import ProfileUser from "./ProfileUser";


interface ProfileProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}



interface Photo {
  id: number;
  item_id: number;
  src: string;
  user_id: number;
}

function Profile({setUser} : ProfileProps) {
    const { id } = useParams<{ id: string }>();

    
    const [leftPanelMode, setLeftPanelMode] = useState<string>('')

    type order = {
      delivery_location: string,
      id: number,
      item_id: number,
      order_date: string,
      status: string, 
      title: string,
      user_id: number 
    }

    const [orders, setOrders] = useState<order[]>([])

    

    const getOrders = async(user_id: number) => {
      console.log(user_id)
      try {
          const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getOrders`, {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: user_id }),
          });
  
          if (response.ok) {
              
              const data = await response.json();

              setOrders(data)
              
          } else {
              console.error('Error getting comment user to database:', response);
          }
      } catch (error) {
          console.error('Something went wrong!', error);
      }
  }

  

    useEffect(() => {
      getOrders(Number(id))

    }, [])
  
    

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100vw', height: 'calc(100vh - 143px)', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'fixed', width: '100%', height: '100vh', zIndex: '-5', backgroundColor: 'black'}}></div>
        <div style={{position: 'absolute', top: 200, left: '2000px', zIndex: -3, width: '1000px', height: '1000px', backgroundImage: `radial-gradient(circle, ${colors.dot1} 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(300px)'}}></div>
        <div style={{position: 'absolute', top: 300, left: '-500px', zIndex: -4, width: '2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot2} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(400px)'}}></div>
        <div style={{position: 'absolute', top: -1500, left: '-400px', zIndex: -4, width: '2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot3} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(2000px)'}}></div>
        <LeftPanel setLeftPanelMode={setLeftPanelMode}/>
        <p style={{color: 'white', fontSize: '20px'}}>{leftPanelMode}</p>
        {leftPanelMode === 'payments' ? (
          <div style={{ border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '20px', padding: '1rem', margin: '2rem auto' }}>
            <p style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold', fontSize: '1.8rem' }}>My orders</p>
            <div style={{ borderBottom: '2px solid white', marginBottom: '20px' }}></div>
            {orders?.map((item, index) => (
              <Order
                key={index}
                title={item.title}
                delivery_location={item.delivery_location}
                id={item.id}
                item_id={item.item_id}
                order_date={item.order_date}
                status={item.status}
                user_id={item.user_id}
              />
            ))}
          </div>
        ) : leftPanelMode === 'delivery' ? (
          <div><SendData user_id={Number(id)}/></div>
        ) : leftPanelMode === 'settings' ? (
          <div><CardInfo user_id={Number(id)}/></div>
        ) : leftPanelMode === 'dashboard' ? (
          <div style={{width: '40%'}}>
            <div style={{position: 'relative', marginRight: 'auto', marginLeft: 'auto',top: '70px', width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '4px solid #4CAF50', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'}}>
                <span style={{fontSize: '3rem', color: '#4CAF50', fontWeight: 'bold', marginLeft: '7px'}}>👤</span>
            </div>
            <ProfileUser setUser={setUser} id={Number(id)}/>
          </div>
        ) : null}

        
        

      </div>
    );
}

export default Profile;
