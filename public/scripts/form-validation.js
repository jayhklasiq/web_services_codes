const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const favoriteColor = document.getElementById('favoriteColor').value;
  const birthday = document.getElementById('birthday').value;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    alert('Please fill in all fields.');
    return;
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
});