const express = require('express');
const app = express();
const port = 3000;

// Mock data for availability
let availability = {
  bedsitter1: true,
  onebed1: true,
  twobed1: true,
};

// Middleware to parse JSON
app.use(express.json());

// Endpoint to check availability
app.post('/check-availability', (req, res) => {
  const { property } = req.body;

  if (availability[property]) {
    res.json({ available: true, message: "This property is available!" });
  } else {
    res.json({ available: false, message: "Sorry, this property is booked." });
  }
});

// Endpoint to book a property
app.post('/book-property', (req, res) => {
  const { property } = req.body;

  if (availability[property]) {
    availability[property] = false; // Mark as booked
    res.json({ success: true, message: "Booking confirmed!" });
  } else {
    res.json({ success: false, message: "Property is already booked." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});