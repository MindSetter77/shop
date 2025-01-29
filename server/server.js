const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const path = require('path');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sonia484pl!',
    database: 'sklep',
  });

app.post('/checkIfUserExists', (req, res) => {
    const email = req.body.emailAdress; 
    console.log(email)
    const sql = 'SELECT username FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Błąd zapytania SQL:", err);
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json(result);
    });
});

session_memory = {}

app.post('/login', async (req, res) => {
    const email = req.body.emailAdress;
    const pass = req.body.pass

    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        
        const [result] = await db.promise().query(sql, [email]);

        if (result.length === 0) {
            return res.status(400).json({ error: 'Użytkownik nie znaleziony' });
        }

        const hashedPassword = result[0].password;

        // Porównanie hasła
        const match = await bcrypt.compare(pass, hashedPassword);

        if (match) {
            const user = {
                id: result[0].id,
                email: result[0].email,
                username: result[0].username
            };

            const session_id = uuidv4();
            session_memory[session_id] = user

            // Ustawienie ciasteczka
            res.cookie('WebPhotoSession', session_id, {
                httpOnly: false, // zabezpieczenie przed dostępem z JavaScript
                secure: process.env.NODE_ENV === 'production', // tylko przez HTTPS w produkcji
                sameSite: 'Strict', // zapewnia, że ciasteczko nie jest wysyłane w zapytaniach międzydomenowych
                maxAge: 3600000, // Czas życia ciasteczka (np. 1 godzina)
                path: '/', // Ciasteczko dostępne w całej aplikacji
            });

            res.status(200).json({user})
            
        } else {
            res.status(400).json({ error: 'Niepoprawne hasło' });
        }
    } catch (error) {
        console.error('Błąd przy logowaniu:', error);
        res.status(500).json({ error: 'Błąd przy logowaniu' });
    }
});

app.post('/register', async(req, res) => {
    const email = req.body.emailAdress; // Odczytujemy email z body
    const pass = req.body.pass
    const username = req.body.username
    const hashedPassword = await bcrypt.hash(pass, 10);

    const sql = 'insert into users(username, email, password) values(?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error("Błąd zapytania SQL:", err);
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json(result);
    });
});

app.post('/getPhotos', async(req, res) => {
    const item_id = req.body.item_id

    const sql = 'select * from photos where item_id = ?';
    db.query(sql, [item_id], (err, result) => {
        if (err) {
            console.error("Błąd zapytania SQL:", err);
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json(result);
    });
});

app.get('/todos', (req, res) => {
  
    const cookies = req.headers.cookie;
  
    if (!cookies) {
      console.log('err1')
      return res.status(401).send('No cookies found');
    }
    
    const match = cookies.split('; ').find(cookie => cookie.startsWith('WebPhotoSession='));
    if (!match) {
        console.log('err2')
        return res.status(401).send('Session cookie not found');
    }

    const session_id = match.split('=')[1];
    const userSession = session_memory[session_id]

    if(!userSession){
        return res.status(401).send('Invalid session')
    }

    res.status(200).json({userSession});
})

app.use('/images', express.static(path.join(__dirname, 'items/1')));

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);

});