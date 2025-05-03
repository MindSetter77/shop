import { colors } from "../../colors"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import { motion } from "framer-motion";


interface AddCommentProps {
    item_id: number;
}

function AddComment() {

    

    useEffect(() => {

      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

    return(
        <div style={{display: 'flex', borderRadius: '20px', width: '68%', backgroundColor: 'rgb(255, 255, 255, 0.2)', padding: '10px', boxShadow: '0 0px 80px rgb(139, 255, 245, 0.2)', marginLeft: '35px', marginTop: '15px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '2px solid #4CAF50'}}>
                        <span style={{fontSize: '20px', color: '#4CAF50', fontWeight: 'bold'}}>👤</span>
                    </div>
                    <div>
                
                        <p style={{fontSize: '18px', color: 'white', marginLeft: '10px'}}>Infinity 17 kwi. 2025</p>
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
                    <p style={{color: 'white', fontSize: '15px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quaerat quibusdam reiciendis, at obcaecati mollitia officia ad minus, earum nihil possimus rerum ipsa culpa numquam pariatur libero quisquam assumenda aut!</p>
                </div>
            </div>
        </div>
        
    )
}

export default AddComment