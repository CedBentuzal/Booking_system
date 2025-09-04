Testing the current booking function in Postman


URL: http://localhost:3000/api/bookings

Method: POST

Headers: Content-Type: application/json

Body (raw JSON):

{
  "name": "",
  "email": "",
  "date": ""
}

return should 

{
    "message": "Booking successful",
    "bookingId": 1
}
