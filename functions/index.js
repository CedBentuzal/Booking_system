const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const bookingRoutes = require("./routes/booking")(db);
app.use("/bookings", bookingRoutes);

console.log("📌 Booking routes loaded!");


exports.api = functions.https.onRequest(app);
