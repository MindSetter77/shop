
import { colors } from "../../colors";


function Footer() {

  const footerHighlight = false

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      
      width: '100vw',
    }}>
      

      <div style={{
        backgroundColor: colors.footerBackGround,
        width: '100vw',
      }}>
        <div style={{display: 'flex'}}>
          <div style={{border: footerHighlight ? ('2px solid green') : undefined, width: '25%'}}>
            <div style={{padding: '20px'}}>
              <p style={{fontFamily: 'Satoshi-Bold', color: '#66ccff', fontSize: '30px'}}>Best market</p>
              <p style={{color: colors.text}}>Our team of experts uses a methodology to identify the best deals most likely to fit your needs. 
              We examine annual percentage rates, annual fees</p>
            </div>
          </div>
          <div style={{border: footerHighlight ? ('2px solid red') : undefined, width: '25%', justifyItems: 'center', fontSize: '20px', fontFamily: 'Satoshi-Bold'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
            <p style={{color: 'white', marginTop: '10px'}}>Send us an email</p>
            <div style={{width: '100%'}}>
              <input style={{backgroundColor: 'rgb(10,10,10)', borderRadius: '20px', width: '100%', height: '80px', border: '2px solid white', color: 'white', gridRow: '3'}}></input>
            </div>
            </div>
          </div>

          
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: footerHighlight ? ('2px solid green') : undefined, width: '25%', }}>
            <p style={{color: 'white', marginBottom: '20px', fontSize: '18px', fontFamily: 'Satoshi-bold'}}>Reklamacja</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: '#EAEAEB', width: '200px', height: '50px', borderRadius: '25px'}}>
              <p style={{color: 'black', fontFamily: 'Satoshi-bold', fontSize: '20px'}}>Contact us</p>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: footerHighlight ? ('2px solid red') : undefined, width: '25%'}}>
            <p style={{color: 'white', fontSize: '25px'}}>important links</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
