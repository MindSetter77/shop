import { colors } from "../../colors"
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from "react";
import { User } from "../../App";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


function Login({setUser}: LoginProps) {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [mode, setMode] = useState('insertEmail')

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')


    const changeEmailValue = (event: any) => {
        setEmail(event.target.value)

        let goodEmail: boolean = validateEmail(event.target.value)

        if(goodEmail){
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
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
        
                const response = await fetch('http://localhost:3000/checkIfUserExists', {
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
        
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ emailAdress, pass }), // Teraz body działa
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user)
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
            
                    const response = await fetch('http://localhost:3000/register', {
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

    return(
        <div style={{backgroundColor: colors.background, height: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center'}}>
            <div style={{backgroundColor: 'yellow', width: '400px', height: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{marginTop: '30px', marginBottom: '10px', fontSize: '20px'}}>Zarejestruj się / zaloguj</p>
                
                <div style={{display: 'flex',alignItems: 'center', marginBottom: '20px'}}>
                    <VerifiedIcon style={{fontSize: "15px", color: 'green', marginRight: '5px'}}/>
                    <p style={{fontSize: '13px'}}>Twoje dane są chronione</p>
                </div>

                {mode === 'insertEmail' ? (
                    <input placeholder="Adres email" value={email} onChange={changeEmailValue} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px'}}></input>
                ) : mode === 'login' ? (
                    <input placeholder="Hasło" value={password} onChange={changePassword} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px'}}></input>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                        <input placeholder="Username" value={username} onChange={changeUsername} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px'}}></input>
                        <input placeholder="Hasło" value={password} onChange={changePassword} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px'}}></input>
                        <input placeholder="Powtórz hasło" value={repeatPassword} onChange={changeRepeatPassword} style={{ width: '85%', height: '50px',  paddingLeft: '10px', marginBottom: '20px'}}></input>
                    </div>
                )}
                

                <div onClick={() => continueClick()} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '85%', height: '50px', backgroundColor: emailValid === false? colors.secondary : colors.primary , cursor: emailValid === false ? 'not-allowed' : 'pointer'}}>
                    <p>Kontynuuj</p>
                </div>
            </div>
        </div>
    )
}

export default Login