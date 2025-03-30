import React from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";


interface ProfileProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Profile({setUser} : ProfileProps) {
    const { id } = useParams<{ id: string }>();
  
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
    <div style={{height: 'calc(100vh - 146px)', backgroundColor: 'black', paddingTop: '64px'}}>
        
        <div style={{width: '100px', height: '25px', backgroundColor: 'red', cursor: 'pointer', display: 'flex', justifyContent: 'center'}}>
            <p onClick={() => logoutUser()} style={{color: 'white'}}>logout</p>
        </div>
    </div>
  );
}

export default Profile;
