import { colors } from "../../colors"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import { motion } from "framer-motion";


interface CommentsProps {
    item_id: number;
}

function Comments({item_id}: CommentsProps) {

    type Comment = {
        id: number;
        username: string;
        user_id: number;
        item_id: number;
        added_comment: string;
        rating?: number;
        created_at?: string;
    };

    const navigate = useNavigate()
      
      // Ustawienie stanu na tablicę komentarzy
    const [comments, setComments] = useState<Comment[]>([]);

    const getComments = async(item_id: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/getComments`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: item_id }),
            });
    
            if (response.ok) {
                
                const data = await response.json();

                setComments(data)
                
            } else {
                console.error('Error getting comment user to database:', response);
            }
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    }
    

    useEffect(() => {
        getComments(item_id)
      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

    return(
        <div>
            {comments.map((comment) => (
                <div style={{display: 'flex', borderRadius: '20px', width: '68%', backgroundColor: 'rgb(255, 255, 255, 0.2)', padding: '10px', boxShadow: '0 0px 80px rgb(139, 255, 245, 0.2)', marginLeft: '35px', marginTop: '15px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '2px solid #4CAF50'}}>
                            <span style={{fontSize: '20px', color: '#4CAF50', fontWeight: 'bold', marginLeft: '3px', marginBottom: '2px'}}>👤</span>
                        </div>
                        <div>
                            <div style={{display: 'flex'}}>
                            <p onClick={() => navigate(`/profile/${comment.id}`)} style={{fontSize: '18px', color: 'white', marginLeft: '10px', cursor: 'pointer'}}>{comment.username}</p>
                            <p style={{fontSize: '18px', color: 'white', marginLeft: '10px'}}>{comment.created_at ? new Date(comment.created_at).toLocaleDateString('pl-PL') : null}</p>
                            </div>
                            
                            <p style={{marginLeft: '10px'}}>
                                <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                                <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                                <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                                <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                                <StarIcon style={{color: 'orange', fontSize: '16px'}} />
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '5px'}}>
                        <p style={{color: 'white', fontSize: '15px'}}>{comment.added_comment}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default Comments