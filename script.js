// Booking Form Submission
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;
  
    alert(`Booking Request:\nCheck-In: ${checkIn}\nCheck-Out: ${checkOut}\nGuests: ${guests}`);
  });