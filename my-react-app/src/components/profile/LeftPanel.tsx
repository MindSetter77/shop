import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../colors";
import { User } from "../../App";
import { useEffect } from "react";
import Order from "./Order";

interface LeftPanelProps  {
    setLeftPanelMode: React.Dispatch<React.SetStateAction<string>>;
}

function LeftPanel({setLeftPanelMode}: LeftPanelProps) {

    return (
        <div style={{border: '2px solid white', backgroundColor: 'red', borderRadius: '20px', padding: '1rem', margin: '2rem auto', width: '250px', height: '200px', position: 'absolute', left: 0}}>
            
            <h2 style={{margin: '0', color: '#333', fontSize: '1.8rem', cursor: 'pointer'}} onClick={() => setLeftPanelMode('dashboard')}>My dashboard</h2>
            <h2 style={{margin: '0', color: '#333', fontSize: '1.8rem', cursor: 'pointer'}} onClick={() => setLeftPanelMode('payments')}>Payments</h2>
            <h2 style={{margin: '0', color: '#333', fontSize: '1.8rem', cursor: 'pointer'}} onClick={() => setLeftPanelMode('delivery')}>Delivery</h2>
            <h2 style={{margin: '0', color: '#333', fontSize: '1.8rem', cursor: 'pointer'}} onClick={() => setLeftPanelMode('settings')}>Settings</h2>    
        </div>
    );
}

export default LeftPanel;
