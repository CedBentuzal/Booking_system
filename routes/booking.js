const express = require('express');
const router = express.Router();

module.exports = (db) => {



router.post('/', (req, res) => {
  const { name, email, date } = req.body;
  
  if (!name || !email || !date) {
    return res.status(400).json({ error: 'Name, email, and date are required' });
  }

    const stmt = db.prepare('INSERT INTO bookings (name, email, date) VALUES (?, ?, ?)');
    stmt.run(name, email, date, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Booking error' });
      }
      res.status(201).json({ message: 'Booking successful', bookingId: this.lastID });
    });
    stmt.finalize();
  }
);
return router;
};
