import { colors } from "../../colors"
import { useEffect } from "react"
import { User } from "../../App";

interface HomeProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Home({setUser}: HomeProps){

    useEffect(() => {
        // Funkcja, która pobiera todos oraz wszystkich użytkowników
        const fetchData = async () => {
          try {
            // Pobranie todos
            const todosResponse = await fetch('http://localhost:3000/todos', {
              method: 'GET',
              credentials: 'include', // Ważne, aby wysłać ciasteczka
            });
            
            if (!todosResponse.ok) {
              throw new Error('Failed to fetch todos');
            }
            const todosData = await todosResponse.json();
            setUser(todosData.userSession)
          } catch (err) {
    
          }
        };
    
        fetchData(); // Wywołanie funkcji fetchData
      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu


    return (
        <div style={{backgroundColor: colors.background}}>
            <div></div>
        </div>
    )
}

export default Home