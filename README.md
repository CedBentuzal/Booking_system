Testing the current booking function in Postman


URL: http://localhost:3000/api/bookings

Method: POST

Headers: Content-Type: application/json

Body (raw JSON):

{
  "name": "Anna Cruz",
  "email": "anna@email.com",
  "date": "2025-09-01"
}

return should 

{
    "message": "Booking successful",
    "bookingId": 1
}
