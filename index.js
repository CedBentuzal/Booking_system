const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('Database.db');



db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    date TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS form_fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    type TEXT,
    required INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    is_available INTEGER DEFAULT 1
  )`);
});

app.get('/', (req, res) => {
    res.send('backend is running')
});

const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes(db));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


