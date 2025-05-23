import { colors } from "../../colors";
import { useState, useEffect } from "react";
import { Person2, ShoppingBasket } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import { User } from "../../App";

import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    user: User | null;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    basket: any[];
    setIsBasketOpen: React.Dispatch<React.SetStateAction<Boolean>>;
    isBasketOpen: Boolean;
    removeFromBasket: (id: number) => void;
    fetchExchangeRate: (newLanguage: string) => void;
    getPrice: (p: number, d: number) => number;
    getPriceText: (itemPrice: number) => string
    priceTable: number[];
    languageData: { [key: string]: string };
}

function Navbar({ user, language, setLanguage, basket, setIsBasketOpen, isBasketOpen, removeFromBasket, fetchExchangeRate, getPrice, getPriceText, priceTable, languageData }: NavbarProps) {
    const navigate = useNavigate();

    
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Stan menu języka

    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const percentage = (scrollPosition / totalHeight) * 100;
        setScrollPercentage(percentage);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    

    const displayName = (name: string, amount: number) => {
        return name.length > amount ? name.slice(0, amount) : name;
    };

    const setLanguageClick = (newLanguage: string) => {
        if(newLanguage !== language){
            setLanguage(newLanguage)

            fetchExchangeRate(newLanguage)
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


    const goToBasket = () => {
        if(basket.length > 0){
            setIsBasketOpen(false)
            navigate('/basket')
        }
    }

    const getAllBasketValue = () => {
        let currentPrice = 0
        
        for(let i = 0; i < basket.length; i++){
            currentPrice += getPrice(basket[i].price, basket[i].discount)
        }


        return currentPrice
    }

    return (
        <motion.div
        initial={{ y: -100, opacity: 0 }}  // Startowa pozycja - poza ekranem
        animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
        transition={{ type: "spring", stiffness: 90, damping: 15, duration: 2 }} // Płynne pojawianie 
        style={{ display: 'flex', justifyContent: 'center' , borderBottom: `4px solid rgb(255, 255, 255, 0)`,position: 'fixed', zIndex: 30, width: '100%', top: 0, backgroundColor: `rgb(13, 17, 23, ${( (scrollPercentage / 100) * 3) > 0.9 ? (0.9) : ((scrollPercentage / 100) * 3)})` }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '60px', width: '90%' }}>
                
                <p onClick={() => navigate('/')} style={{ marginRight: 'auto', fontSize: '30px', marginLeft: '30px', width: '180px', cursor: 'pointer', color: '#66ccff', fontFamily: 'Satoshi-Bold' }}>{languageData.name}</p>
                
                
                
                <div>
                    
                    <AnimatePresence>
                    {isLanguageMenuOpen && (
                        <motion.div 
                        initial={{ y: 0, opacity: 0 }}  // Startowa pozycja - poza ekranem
                        animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                        exit={{ y: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
                        
                        style={{
                            position: 'absolute',
                            top: '64px',
                            right: '50px',
                            backgroundColor: 'rgb(0,0,0, 0.1)',
                            borderRadius: '5px',
                            border: `2px solid ${colors.primary}`,
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
                                    <p style={{ marginLeft: '5px', color: 'white' }}>{label}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    </AnimatePresence>
                    <AnimatePresence>
                    {isBasketOpen && (
                        <motion.div 
                        initial={{ y: 0, opacity: 0 }}  // Startowa pozycja - poza ekranem
                        animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
                        exit={{ y: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
                        
                        style={{
                            position: 'fixed',
                            top: '64px',
                            right: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '400px',
                            height: 'calc(100vh - 64px)',
                            backgroundColor: 'rgb(0, 0, 0, 0.85)',
                            borderLeft: `2px solidrgb(94, 94, 94)`,
                            boxShadow: '10px 40px 60px rgba(0, 0, 0, 0.8), 15px 45px 90px rgba(0, 0, 0, 0.5)',

                            minWidth: '120px',
                            zIndex: 10

                        }}>
                            
                            <p style={{fontSize: '23px', color: 'white', fontFamily: 'Satoshi'}}>Koszyk</p>
                            
                            <div style={{borderTop: `2px solid ${colors.primary}`, borderBottom: `2px solid ${colors.primary}`, width: '100%', height:'89%', overflowY: 'auto'}}>
                                {basket.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', marginBottom: '10px', padding: '10px' }}>
                                    <img src={item.src} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                                    <div>
                                        <div style={{display: 'flex', width: '320px'}}>
                                            <p style={{color: 'white'}}>{displayName(item.title, 30)}</p>
                                            <p onClick={() => removeFromBasket(item.id)} style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}>X</p>
                                        </div>
                                        
                                        <p style={{color: 'white'}}>{getPriceText(getPrice(item.price, item.discount))}</p>
                                    </div>
                                    </div>
                                ))}
                            </div>
                            <div onClick={() => goToBasket()} style={{marginTop: '10px', marginBottom: '12px', borderRadius: '10px', backgroundColor: colors.primary, width: '90%', display:'flex', height: '50px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                                <p style={{color: 'white', fontFamily: 'Satoshi-bold'}}>{`Przejdź dalej (${getPriceText(getAllBasketValue())})`}</p>
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                
                
                <div onClick={() => !user ? (navigate('/login')): (navigate(`/profile/${user.id}`))} style={{ display: 'flex', alignItems: 'center', height: '80%', cursor: 'pointer' }}>
                    <Person2 style={{ fontSize: '35px', color: colors.text }} />
                    <div>
                        <p style={{ marginLeft: '10px', fontSize: '20px', color: colors.text }}>
                            {user === null ? languageData.notLogged : displayName(user.username, 13)}
                        </p>
                        {/*
                        <p style={{ marginLeft: '10px', fontSize: '12px', color: colors.text }}>
                            {user === null ? 'Zaloguj/Zarejestruj' : 'Konto'}
                        </p>
                        */}
                    </div>
                </div>

                <div onClick={() => setIsBasketOpen(!isBasketOpen)} style={{ display: 'flex', alignItems: 'center', height: '80%', cursor: 'pointer', marginLeft: '30px', marginRight: '10px' }}>
                    <ShoppingBasket style={{ fontSize: '35px', color: colors.text }} />
                    <div>
                        <p style={{ marginLeft: '7px', fontSize: '15px', color: colors.text }}>{basket.length}</p>
                    </div>
                </div>

                <div onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} style={{ display: 'flex', alignItems: 'center', height: '50px', marginLeft: '20px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={languageOptions[language]?.flag} style={{ height: '20px' }} />
                        <div style={{ marginLeft: '10px' }}>
                            <p style={{ fontSize: '20px', color: colors.text, }}>{languageOptions[language]?.label}</p>
                            {/*
                            <p style={{ fontSize: '15px', color: colors.text }}>{languageOptions[language]?.currency}</p>
                            */}
                        </div>
                    </div>
                        
                    </div>

                
            </div>
        </motion.div>
    );
}

export default Navbar;
