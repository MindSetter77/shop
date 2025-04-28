import { colors } from "../../colors"
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from "react";
import { User } from "../../App";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


function Login({setUser}: LoginProps) {

    const navigate = useNavigate()

    const loginHighligh = false

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [mode, setMode] = useState('insertEmail')

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')

    const [code, setCode] = useState('')


    const changeEmailValue = (event: any) => {
        setEmail(event.target.value)

        let goodEmail: boolean = validateEmail(event.target.value)
        setEmailValid(goodEmail)
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const continueClick = async () => {
        if(!emailValid){
            return
        }

        if(mode === 'insertEmail'){

            try {
                let emailAdress: string = email;
        
                const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/checkIfUserExists`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ emailAdress }), // Teraz body działa
                });
        
                if (response.ok) {
                    const data = await response.json();
                    if(data.length < 1){
                        setMode('register')
                    } else {
                        setMode('login')
                        console.log(data[0]);
                    }
                    
                } else {
                    console.error('Error adding user to database:', response);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }

        } else if(mode === 'login' ) {
            
            try {
                let emailAdress: string = email;
                let pass: string = password;
        
                const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/loginBeforeCode`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ emailAdress, pass }), // Teraz body działa
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if(data.message === 'success'){
                        setMode('login2')
                    }
                    
                } else {
                    console.error('Error adding user to database:', response);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }

        } else if(mode === 'login2' ) {
            
            try {
        
                const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/loginAfterCode`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ code }), // Teraz body działa
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('=======')
                    console.log(data.result)
                    setUser(data.result)
                    navigate('/')
                    
                } else {
                    console.error('Error adding user to database:', response);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }

        } else if(mode === 'register'){
            try {

                if(password === repeatPassword){

                    let emailAdress: string = email;
                    let pass: string = password;
            
                    const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/register`, {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ emailAdress, pass, username }), // Teraz body działa
                    });
            
                    if (response.ok) {
                        setPassword('')
                        setMode('login')
                    } else {
                        console.error('Error adding user to database:', response);
                    }
                }

                
            } catch (error) {
                console.error('Something went wrong!', error);
            }
        }
    };

    const changePassword = (event: any) => {
        setPassword(event.target.value)
    }

    const changeUsername = (event: any) => {
        setUsername(event.target.value)
    }

    const changeRepeatPassword = (event: any) => {
        setRepeatPassword(event.target.value)
    }

    const changeCode = (event: any) => {
        setCode(event.target.value)
    }

    const checkThreeFields = () => {
        if(username){        
            if((password === repeatPassword) && password.length > 0){
                return true
            }
        }
        return false
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center' , flexDirection: 'column', width: '100vw', height: 'calc(100vh - 146px)', position: 'relative', overflow: 'hidden'  }}>
                  
            <div style={{position: 'fixed', width: '100%', height: '100vh', zIndex: '-5', backgroundColor: `black`}}></div>
            <motion.div 
            initial={{ y: 1000, opacity: 0 }}  // Startowa pozycja - poza ekranem
            animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
            transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
            style={{position: 'absolute',top: 200, left: '2000px', zIndex: -3, width:'1000px', height: '1000px', backgroundImage: `radial-gradient(circle, ${colors.dot1} 70%, rgba(0,0,0,0) 70%)`, filter: 'blur(300px)'}}></motion.div>
            <motion.div 
            initial={{ y: 1000, opacity: 0 }}  // Startowa pozycja - poza ekranem
            animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
            transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
            style={{position: 'absolute',top: 300, left: '-500px', zIndex: -4, width:'2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot2} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(400px)'}}></motion.div>
            <motion.div 
            initial={{ y: 1000, opacity: 0 }}  // Startowa pozycja - poza ekranem
            animate={{ y: 0, opacity: 1 }}     // Końcowa pozycja - na miejscu
            transition={{ type: "tween", duration: 1, stiffness: 90, damping: 15 }} // Płynne pojawianie 
            style={{position: 'absolute',top: -1500, left: '-400px', zIndex: -4, width:'2000px', height: '2000px', backgroundImage: `radial-gradient(circle, ${colors.dot3} 10%, rgba(0,0,0,0) 70%)`, filter: 'blur(2000px)'}}></motion.div>

            
            <div style={{width: '400px', display: 'flex', alignItems: 'center', flexDirection: 'column', border: loginHighligh ? ('2px solid red') : undefined, marginLeft: 'auto', marginRight: 'auto'}}>
                <div style={{display: 'flex', flexDirection: 'column', paddingTop: '30px', paddingBottom: '30px', alignItems: 'center', border: loginHighligh ? ('2px solid blue'): undefined, backgroundColor: 'rgb(45,45,45, 0.5)', borderRadius: '25px'}}>
                <p style={{marginBottom: '10px', fontSize: '25px', color: 'white', fontFamily: 'Satoshi-Bold'}}>Zarejestruj się / zaloguj</p>
                
                <div style={{display: 'flex',alignItems: 'center', marginBottom: '20px'}}>
                    <VerifiedIcon style={{fontSize: "15px", color: 'green', marginRight: '5px'}}/>
                    <p style={{fontSize: '13px', color: 'white'}}>Twoje dane są chronione</p>
                </div>

                {mode === 'insertEmail' ? (
                    <input placeholder="Adres email" value={email} onChange={changeEmailValue} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px', borderRadius: '15px'}}></input>
                ) : mode === 'login' ? (
                    <input placeholder="Hasło" value={password} onChange={changePassword} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px', borderRadius: '15px'}}></input>
                ) : mode === 'login2' ? (
                    <input placeholder="Email code" value={code} onChange={changeCode} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px', borderRadius: '15px'}}></input>
                
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                        <input placeholder="Username" value={username} onChange={changeUsername} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px', borderRadius: '15px'}}></input>
                        <input placeholder="Hasło" value={password} onChange={changePassword} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px', borderRadius: '15px'}}></input>
                        <input placeholder="Powtórz hasło" value={repeatPassword} onChange={changeRepeatPassword} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px', borderRadius: '15px'}}></input>
                    </div>
                )}
                
                {
                    mode === 'register' ? ( 
                        <div onClick={() => checkThreeFields() ? (continueClick()) : null} style={{display: 'flex', justifyContent: 'center', marginBottom: '10px', alignItems: 'center', width: '85%', height: '50px', backgroundColor: checkThreeFields() ? colors.primary : colors.secondary , cursor: checkThreeFields() ? 'pointer' : 'not-allowed', borderRadius: '20px'}}>
                            <p>Register</p>
                        </div>
                    ) : (
                        <div onClick={() => continueClick()} style={{display: 'flex', justifyContent: 'center', marginBottom: '10px', alignItems: 'center', width: '85%', height: '50px', backgroundColor: emailValid === false? colors.secondary : colors.primary , cursor: emailValid === false ? 'not-allowed' : 'pointer', borderRadius: '20px'}}>
                            <p>Kontynuuj</p>
                        </div>
                    )
                }
                

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{fontSize: '13px', textAlign: 'center', marginTop: '10px', color: 'white'}}>Kontynuując, zgadzasz się z naszym Regulamin i potwierdzasz, że zapoznałeś się z naszym Ochrona Prywatności.</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login