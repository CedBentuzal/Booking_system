const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Create booking
  router.post("/", async (req, res) => {
    console.log("POST /bookings hit", req.body);
    const { name, email, date } = req.body;

    if (!name || !email || !date) {
      return res
        .status(400)
        .json({ error: "Name, email, and date are required" });
    }

    try {
      const docRef = await db.collection("bookings").add({
        name,
        email,
        date,
        created_at: new Date(),
      });

      res
        .status(201)
        .json({ message: "Booking successful", bookingId: docRef.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Booking error" });
    }
  });


  router.get("/", async (req, res) => {
    try {
      const snapshot = await db.collection("bookings").get();
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  return router;
};
