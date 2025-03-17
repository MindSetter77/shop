import { colors } from "../../colors"
import { useEffect, useState } from "react"
import { basket_item, User } from "../../App";

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {  Person2, ShoppingBasket } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";

interface AdsProps{
  photo1s: any[]
}

function Ads({ photo1s }:AdsProps){

  

  

    return (
        <div style={{position: 'absolute', top: 0, left: '65%', width: '200px', height: '200px'}}>
          <div>
            <div style={{ 
              width: '125px', 
              height: '125px',
              border: '4px solid white',
              borderRadius: '5px',
              
              position: 'absolute', 
              top: '35%', 
              left: '0%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' // cień
            }}>
              <img style={{width: '100%', height: '100%', border: '2px solid black' }} src={photo1s[0] }/>
              <div style={{
                position: 'absolute', 
                width: '50px', 
                height: '20px', 
                top: 90, 
                left: 35, 
                borderRadius: '10px', 
                border: '2px solid black', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'white'
              }}>
                <p style={{fontSize: '12px', margin: 0}}>10zł</p>
              </div>
            </div>
          </div>
          

            
          <div>
            <div style={{
              backgroundColor: 'red', 
              width: '125px', 
              height: '125px',
              border: '4px solid white',
              borderRadius: '5px',    
              position: 'absolute', 
              top: '45%', 
              left: '53%',
              transform: 'translate(-50%, -50%) rotate(25deg)',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' // cień
            }}>
              <img style={{width: '100%', height: '100%', border: '2px solid black' }} src={photo1s[1] }/>
              <div style={{
                position: 'absolute', 
                width: '50px', 
                height: '20px', 
                top: 90, 
                left: 35, 
                borderRadius: '10px', 
                border: '2px solid black', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'white'
              }}>
                <p style={{fontSize: '12px', margin: 0}}>10zł</p>
              </div>
            </div>
          </div>



          <div>
            <div style={{
              backgroundColor: 'red', 
              width: '125px', 
              height: '125px',
              border: '4px solid white',
              borderRadius: '5px',    
              position: 'absolute', 
              top: '80%', 
              left: '95%',
              transform: 'translate(-50%, -50%) rotate(50deg)',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' // cień
            }}>
              <img style={{width: '100%', height: '100%', border: '2px solid black' }} src={photo1s[2] }/>
              <div style={{
                position: 'absolute', 
                width: '50px', 
                height: '20px', 
                top: 90, 
                left: 35, 
                borderRadius: '10px', 
                border: '2px solid black', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'white'
              }}>
                <p style={{fontSize: '12px', margin: 0}}>10zł</p>
              </div>
            </div>
          </div>

          



        </div>
    )
}

export default Ads