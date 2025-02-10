document.getElementById('booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const property = document.getElementById('property').value;
  const checkIn = document.getElementById('check-in').value;
  const checkOut = document.getElementById('check-out').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  // Check availability
  const availabilityResponse = await fetch('http://localhost:3000/check-availability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ property, checkIn, checkOut }),
  });

  const availabilityData = await availabilityResponse.json();

  if (availabilityData.available) {
    const confirmBooking = confirm(`${availabilityData.message} Do you want to book it?`);

    if (confirmBooking) {
      const bookingResponse = await fetch('http://localhost:3000/book-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property, checkIn, checkOut, client: { name, phone } }),
      });

      const bookingData = await bookingResponse.json();
      alert(bookingData.message);
    }
  } else {
    alert(availabilityData.message);
  }
});