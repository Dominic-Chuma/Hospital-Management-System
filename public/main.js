//Registration Function
$('#button').click(function(event) {
  event.preventDefault();
  const fullname = $('#name').val();
  const date = $('#datepicker').val();
  const phone = $('#phone').val();
  const email = $('#email').val();
  //Check if user input is empty
  if (!fullname || !date || !phone || !email) {
    $('.regMessage').html('Kindly fill in all fields');
    return;
  }
  //Make get request to check if the user already exist
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/Patients?email=${email}`,
    data: {
      email,
    },
    beforeSend: function() {
      $('.regMessage').html('Loading....');
    },
    success: function(response) {
      if (response.length) {
        $('.regMessage').html('User already exist');
      } else {
        //Submit the user data if the user does not exist
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3000/Patients',
          data: {
            fullname,
            email,
            phone,
            date,
          },
          beforeSend: function() {
            $('.regMessage').html('Loading....');
          },
          success: function() {
            $('.regMessage').html('Registration Successfull');
          },
        });
      }
    },
  });
});



//Login Function
$('#login-button').click(function(event) {
  event.preventDefault();
  const passwordLogin = $('#password_modal').val();
  const emailLogin = $('#email_modal').val();
  if (!passwordLogin || !emailLogin) {
    $('.logMessage').html('Kindly fill in all fields');
    return;
  }
  //Check if the user is in the database
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/Admin?email=${emailLogin}&password=${passwordLogin}`,
    data: {
      email: emailLogin,
      password: passwordLogin,
    },
    beforeSend: function() {
      $('.logMessage').html('Loading....');
    },
    success: function(response) {
      if (response.length) {
        //$('.regMessage').html('Login sucessful');
        //$('.checkLogin').html('You are logged in');
        localStorage.setItem('email', emailLogin);
        //redirect to control Panel page if the login is successfull
        window.location.assign('control-panel.html');
      } else {
        $('.logMessage').html('Username or password Incorrect');
      }
    },
  });
});
