document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    
    // Perform some basic validation (you should implement proper validation and security measures)
    if (username === 'yourusername' && password === 'yourpassword') {
      alert('Login successful');
      // Redirect to a new page or perform other actions
    } else {
      alert('Login failed. Please check your username and password.');
    }
  });
});
