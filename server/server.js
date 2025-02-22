const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
email_code_storage = {}

function generateEmailCode() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        const randomDigit = Math.floor(Math.random() * 10); // Losuje liczbę od 0 do 9
        result += randomDigit;
    }
    return result;
  }

function sendEmail(user_id, email, result){
    console.log(`sending to email: ${email}`)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Możesz użyć innych usług, np. Outlook, Yahoo
        auth: {
            user: 'mygtaemaillol@gmail.com', // Twój adres e-mail
            pass: process.env.EMAIL_PASS // Twoje hasło lub hasło aplikacji
        }
    });
  
    const code = generateEmailCode()
    
    console.log(`code is: ${code}`)
    email_code_storage[code] = result
    // Konfiguracja wiadomości
    const mailOptions = {
      from: 'mygtaemaillol@gmail.com', // Nadawca
      to: `${email}`, // Odbiorca
      subject: 'Authentication Photo Craft Code',
      text: `Hello! Your authentication code is: ${code}`, // Treść wiadomości
      html: `<p>Your Photo Craft authentication code is: <b>${code}</b>.</p>` // Treść HTML
    };
  
      // Wysyłanie wiadomości
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('Błąd podczas wysyłania wiadomości:', error);
      }
      console.log('E-mail wysłany:', info.response);
    });
  }

app.post('/loginBeforeCode', async (req, res) => {
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

            sendEmail(result[0].id, email, user)

            

            res.status(200).json({message: 'success'})
            
        } else {
            res.status(400).json({ error: 'Niepoprawne hasło' });
        }
    } catch (error) {
        console.error('Błąd przy logowaniu:', error);
        res.status(500).json({ error: 'Błąd przy logowaniu' });
    }
});

app.post('/loginAfterCode', (req, res) => {

    const { code } = req.body;
    
  
    if (email_code_storage[code] !== '' && email_code_storage[code] !== undefined) {
  
      console.log(email_code_storage[code])
      const result = email_code_storage[code]
  
      email_code_storage[code] = undefined
      const id = result.id

      const session_id = uuidv4();
      console.log('saved:')
      console.log(result)
      session_memory[session_id] = {result}
      
      // Ustawienie ciasteczka
      res.cookie('WebPhotoSession', session_id, {
        httpOnly: false, // zabezpieczenie przed dostępem z JavaScript
        secure: process.env.NODE_ENV === 'production', // tylko przez HTTPS w produkcji
        sameSite: 'Strict', // zapewnia, że ciasteczko nie jest wysyłane w zapytaniach międzydomenowych
        maxAge: 3600000, // Czas życia ciasteczka (np. 1 godzina)
        path: '/', // Ciasteczko dostępne w całej aplikacji
      });

      res.status(200).json({result});


  
    } else {
      console.log(email_code_storage[code])
      return res.status(401).json({ error: 'Invalid credentials' });
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

app.post('/getItemData', async(req, res) => {
    const item_id = req.body.item_id

    const sql = 'select * from items where id = ?';
    db.query(sql, [item_id], (err, result) => {
        if (err) {
            console.error("Błąd zapytania SQL:", err);
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json(result);
    });
});

app.post('/getItems', async(req, res) => {
    const item_ids = req.body.item_ids;
    const sql = `SELECT * FROM items WHERE id IN (${item_ids})`;

    console.log(sql);

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Błąd zapytania SQL:", err);
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(result);
    });
});

app.post('/getPhotoUrls', async(req, res) => {
    const item_ids = req.body.item_ids;
    const sql = `SELECT * FROM photos WHERE item_id IN (${item_ids})`;

    console.log(sql);

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Błąd zapytania SQL:", err);
            return res.status(500).json({ error: err.message });
        }

        image1urls = []

        for(let i =0; i<result.length; i++){
            if(result[i].src.endsWith('image_1.jpg')){
                image1urls.push(result[i].src)
            }
        }

        res.status(200).json(image1urls);
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

app.use('/images', express.static(path.join(__dirname, 'items')));

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);

});