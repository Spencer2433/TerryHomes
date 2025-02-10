const express = require('express');
const app = express();
const port = 3000;

// Mock data for availability (replace with a database in production)
let bookings = [
  { property: 'bedsitter1', checkIn: '2023-10-15', checkOut: '2023-10-20', client: { name: 'John Doe', phone: '0712345678' } },
  { property: 'onebed1', checkIn: '2023-10-18', checkOut: '2023-10-25', client: { name: 'Jane Doe', phone: '0723456789' } },
];

// Middleware to parse JSON
app.use(express.json());

// Endpoint to check availability
app.post('/check-availability', (req, res) => {
  const { property, checkIn, checkOut } = req.body;

  // Check for overlapping bookings
  const isAvailable = !bookings.some(booking => {
    return (
      booking.property === property &&
      !(new Date(checkOut) <= new Date(booking.checkIn) &&
      !(new Date(checkIn) >= new Date(booking.checkOut)
    );
  });

  if (isAvailable) {
    res.json({ available: true, message: "This property is available for your selected dates!" });
  } else {
    // Find the next available date
    const nextAvailableDate = bookings
      .filter(booking => booking.property === property)
      .map(booking => new Date(booking.checkOut))
      .sort((a, b) => a - b)[0];

    res.json({
      available: false,
      message: `Sorry, this property is booked until ${nextAvailableDate.toISOString().split('T')[0]}.`,
    });
  }
});

// Endpoint to book a property
app.post('/book-property', (req, res) => {
  const { property, checkIn, checkOut, client } = req.body;

  // Check availability again before booking
  const isAvailable = !bookings.some(booking => {
    return (
      booking.property === property &&
      !(new Date(checkOut) <= new Date(booking.checkIn)) &&
      !(new Date(checkIn) >= new Date(booking.checkOut))
    );
  });

  if (isAvailable) {
    bookings.push({ property, checkIn, checkOut, client });
    res.json({ success: true, message: "Booking confirmed!" });
  } else {
    res.json({ success: false, message: "Property is already booked for the selected dates." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});