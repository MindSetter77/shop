import { colors } from "../../colors"
import { useEffect, useState } from "react"

interface Photo {
    id: number;
    item_id: number;
    src: string;
    user_id: number;
}

function Item() {

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPhoto, setCurrentPhoto] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let item_id: number = 1
                const response = await fetch('http://localhost:3000/getPhotos', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ item_id }),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    

                    setCurrentPhoto(data[0].src)
                    setPhotos(data)
                } else {
                    console.error('Error adding user to database:', response);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }
        };
    
        fetchData(); // Wywołanie funkcji fetchData
      }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu

    return(
        <div style={{width: '100%', height: 'calc(100vh - 64px)', backgroundColor: colors.background}}>
            <div style={{display: 'flex', width: '500px', height: '400px'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxHeight: '400px', overflowY: 'auto', width: '105px'}}>
                    {photos.map((item, index) => (
                        <img key={index} src={item.src} onClick={() => setCurrentPhoto(item.src)} style={{width: '75px', marginBottom: '15px'}} />
                    ))}
                </div>
                
                <div style={{width: '411px', height: '396px'}}>
                    <img src={currentPhoto} style={{width: '100%', height: '100%'}} />
                </div>
                
                
            </div>
        </div>
    )
}

export default Item