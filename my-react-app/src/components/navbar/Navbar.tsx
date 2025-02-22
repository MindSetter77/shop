import { colors } from "../../colors";
import { useState } from "react";
import {  Person2, ShoppingBasket } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import { User } from "../../App";

interface NavbarProps {
    user: User | null;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    basket: any[];
    setIsBasketOpen: React.Dispatch<React.SetStateAction<Boolean>>;
    isBasketOpen: Boolean
}

function Navbar({ user, language, setLanguage, basket, setIsBasketOpen, isBasketOpen }: NavbarProps) {
    const navigate = useNavigate();

    const [searchBar, setSearchBar] = useState('');
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Stan menu języka

    const handleSearchChange = (event: any) => {
        setSearchBar(event.target.value);
    };

    const displayName = (name: string) => {
        return name.length > 13 ? name.slice(0, 13) : name;
    };

    const setLanguageClick = (newLanguage: string) => {
        if(newLanguage !== language){
            setLanguage(newLanguage)
        }
        setIsLanguageMenuOpen(!isLanguageMenuOpen)
    }

    const languageOptions: { [key: string]: { flag: string; label: string; currency: string } } = {
        PL: { flag: "pl-flag.png", label: "PL", currency: "PLN" },
        UK: { flag: "uk-flag.png", label: "UK", currency: "GBP" },
        US: { flag: "us-flag.png", label: "US", currency: "USD" },
        DE: { flag: "de-flag.png", label: "DE", currency: "EUR" },
        FR: { flag: "fr-flag.png", label: "FR", currency: "EUR" }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderBottom: `4px solid ${colors.primary}` }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '60px', backgroundColor: 'white', width: '90%' }}>
                
                <p onClick={() => navigate('/')} style={{ fontSize: '25px', marginLeft: '30px', width: '180px', cursor: 'pointer' }}>Best market</p>
                
                <input type="text" value={searchBar} onChange={handleSearchChange} placeholder="Search"
                    style={{ marginLeft: '20px', width: '60%', height: '30px', borderRadius: '15px', paddingLeft: '10px' }} />
                
                <div>
                    <div onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} style={{ display: 'flex', alignItems: 'center', height: '50px', marginLeft: '20px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={languageOptions[language]?.flag} style={{ height: '20px' }} />
                        <div style={{ marginLeft: '10px' }}>
                            <p style={{ fontSize: '15px' }}>{languageOptions[language]?.label}</p>
                            <p style={{ fontSize: '15px' }}>{languageOptions[language]?.currency}</p>
                        </div>
                    </div>
                        
                    </div>

                    {isLanguageMenuOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '64px',
                            left: '100',
                            backgroundColor: 'white',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '5px',
                            minWidth: '120px',
                            zIndex: 10
                        }}>
                            
                            {Object.entries(languageOptions).map(([key, { flag, label, currency }]) => (
                                <div
                                    key={key}
                                    onClick={() => setLanguageClick(key)}
                                    style={{ display: 'flex', padding: '10px', cursor: 'pointer' }}
                                >
                                    <img src={flag} style={{ height: '15px', marginTop: '4px' }} />
                                    <p style={{ marginLeft: '5px' }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {isBasketOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '64px',
                            right: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '400px',
                            height: '100vh',
                            backgroundColor: 'white',
                            borderLeft: `2px solid ${colors.primary}`,
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px 0px 0px 10px',
                            minWidth: '120px',
                            zIndex: 10
                        }}>
                            
                            <p style={{fontSize: '15px'}}>Koszyk</p>
                            
                            <div style={{border: '2px solid gray', width: '100%'}}>
                                {basket.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px' }}>
                                    <img src={item.src} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                                    <div>
                                        <p>{item.title}</p>
                                        <p>{item.price} zł</p>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                
                <div onClick={() => navigate('/login')} style={{ display: 'flex', alignItems: 'center', height: '80%', cursor: 'pointer', marginLeft: '20px' }}>
                    <Person2 style={{ fontSize: '35px' }} />
                    <div>
                        <p style={{ marginLeft: '10px', fontSize: '15px' }}>
                            {user === null ? 'Niezalogowano' : displayName(user.username)}
                        </p>
                        <p style={{ marginLeft: '10px', fontSize: '12px' }}>
                            {user === null ? 'Zaloguj/Zarejestruj' : 'Konto'}
                        </p>
                    </div>
                </div>

                <div onClick={() => setIsBasketOpen(!isBasketOpen)} style={{ display: 'flex', alignItems: 'center', height: '80%', cursor: 'pointer', marginLeft: '20px' }}>
                    <ShoppingBasket style={{ fontSize: '35px' }} />
                    <div>
                        <p style={{ marginLeft: '10px', fontSize: '15px' }}>{basket.length}</p>
                        <p style={{ marginLeft: '10px', fontSize: '12px' }}>Koszyk</p>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Navbar;
