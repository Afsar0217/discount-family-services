const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite DB setup
const db = new sqlite3.Database('./bookings.db', (err) => {
  if (err) console.error('DB Error:', err);
  else console.log('Connected to SQLite DB');
});

// Create bookings table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookedBy TEXT,
    bookedFor TEXT,
    phone TEXT,
    service TEXT,
    vendor TEXT,
    category TEXT,
    subcategory TEXT,
    timestamp TEXT
  )
`);

// API endpoint to save booking
app.post('/api/bookings', (req, res) => {
  const { bookedBy, bookedFor, phone, service, vendor, category, subcategory, timestamp } = req.body;
  db.run(
    `INSERT INTO bookings (bookedBy, bookedFor, phone, service, vendor, category, subcategory, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [bookedBy, bookedFor, phone, service, vendor, category, subcategory, timestamp],
    function (err) {
      if (err) {
        console.error('Insert Error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// API endpoint to get all bookings (optional)
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});