import { colors } from "../../colors";
import { useState } from "react";
import { Person2, ShoppingBasket } from "@mui/icons-material";  // Zamiast Person2 użyj Person
import { useNavigate } from "react-router-dom";
import { User } from "../../App";

interface NavbarProps {
    user: User | null;
}

function Navbar({user}: NavbarProps){

    const navigate = useNavigate()

    const [searchBar, setSearchBar] = useState('')

    const handleSearchChange = (event: any) =>{
        setSearchBar(event.target.value)
    }

    const displayName = (name: string) => {
        
        if(name.length > 13){
            name = name.slice(0, 13)    
        }

        return name
    } 

    return (
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderBottom: `4px solid ${colors.primary}`}}>
            <div style={{ display: 'flex', alignItems: 'center', height: '60px', backgroundColor: 'white', width: '90%'}}>
                
                <p onClick={() => navigate('/')} style={{ fontSize: '25px', marginLeft: '30px', width: '180px', cursor: 'pointer'}}>Best market</p>
                
                <input type="text" value={searchBar} onChange={handleSearchChange} placeholder="Search" style={{marginLeft: '20px', width: '60%', height: '30px', borderRadius: '15px', paddingLeft: '10px'}}/>
                
                <div style={{display: 'flex', alignItems: 'center', height: '50px', marginLeft: '20px', cursor: 'pointer'}}>
                    <img src="pl-flag.png" style={{height: '15px'}}/>
                    <div style={{marginLeft: '10px'}}>
                        <p style={{fontSize: '15px'}}>PL</p>
                        <p style={{fontSize: '15px'}}>PLN</p>
                    </div>
                </div>
                
                <div onClick={() => navigate('/login')} style={{display: 'flex', alignItems: 'center', height: '80%', cursor: 'pointer', marginLeft: '20px'}}>
                    <Person2 style={{fontSize: '35px'}}/>
                    <div>
                        <p style={{marginLeft: '10px', fontSize: '15px'}}>{user === null ? ('Niezalogowano') : (displayName(user.username))}</p>
                        <p style={{marginLeft: '10px', fontSize: '12px'}}>{user === null ? ('Zaloguj/Zarejestruj') : ('Konto')}</p>
                    </div>
                </div>


                <div style={{display: 'flex', alignItems: 'center', height: '80%', cursor: 'pointer', marginLeft: '20px', }}>
                    <ShoppingBasket style={{fontSize: '35'}}/>
                    <div>
                        <p style={{marginLeft: '10px', fontSize: '15px'}}>0</p>
                        <p style={{marginLeft: '10px', fontSize: '12px'}}>Koszyk</p>
                    </div>
                </div>


                
                
            </div>
        </div>
      );

}

export default Navbar