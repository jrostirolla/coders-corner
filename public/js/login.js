let clientEmail;

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const city = document.querySelector('#city-signup').value.trim();
    const coding_language = document.querySelector('#coding-signup').value.trim();
  
    console.log(name, email, password, city, coding_language);

    if (name && email && password) {
      const response = await fetch('/api/users/', {
        method: 'post',
        body: JSON.stringify({
          email,
          password,
          name,
          city,
          coding_language
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
  clientEmail = email;
      
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
        console.log(response.body)
      }
    }
  }


  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);