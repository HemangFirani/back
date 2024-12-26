const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'Shagun@51000', // replace with your MySQL password
    database: 'explorx'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Endpoint to handle form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            res.status(500).send('Error saving message.');
        } else {
            res.status(200).send('Message saved successfully.');
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
