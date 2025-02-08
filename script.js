// Booking Form Submission
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;
  
    alert(`Booking Request:\nCheck-In: ${checkIn}\nCheck-Out: ${checkOut}\nGuests: ${guests}`);
  });

  document.getElementById('booking-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const property = prompt("Enter the property you want to book (e.g., bedsitter1, onebed1, twobed1):");
  
    if (!property) return;
  
    // Check availability
    const availabilityResponse = await fetch('http://localhost:3000/check-availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ property }),
    });
  
    const availabilityData = await availabilityResponse.json();
  
    if (availabilityData.available) {
      const confirmBooking = confirm(`${availabilityData.message} Do you want to book it?`);
  
      if (confirmBooking) {
        const bookingResponse = await fetch('http://localhost:3000/book-property', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ property }),
        });
  
        const bookingData = await bookingResponse.json();
        alert(bookingData.message);
      }
    } else {
      alert(availabilityData.message);
    }
  });