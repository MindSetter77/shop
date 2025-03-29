import React from "react";
import { colors } from "../../colors";

function Footer() {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', // Zapewnia, że cała strona zajmuje wysokość ekranu
      width: '100vw',
    }}>
      <div style={{ flex: 1 }}> {/* Treść strony */}</div>

      <div style={{
        backgroundColor: colors.footerBackGround,
        height: '300px',
        width: '100vw',
      }}>
        <p style={{color: 'white'}}>best footer</p>
      </div>
    </div>
  );
}

export default Footer;
