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