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
    $('.regMessage').fadeOut(3000);
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
            $('.regMessage').fadeOut(3000);
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
        // Stores temporarily the input email to create a session Kinda...
        localStorage.setItem('email', emailLogin); //
        //redirect to control Panel page if the login is successfull
        window.location.assign('control-panel.html');
      } else {
        $('.logMessage').html('Username or password Incorrect');
      }
    },
  });
});



//Delete Function.......

// $('#delete-button').click(function(event) {
//   event.preventDefault();
//   const fullname = $('#name').val();
//   const date = $('#datepicker').val();
//   const phone = $('#phone').val();
//   const email = $('#email').val();
//   //Check if user input is empty
//   if (!fullname || !date || !phone || !email) {
//     $('.deleteMessage').html('Kindly fill in the field');
//     return;
//   }
//   //Make get request to check if the user already exist
//   $.ajax({
//     method: 'GET',
//     url: `http://localhost:3000/Patients?email=${email}`,
//     data: {
//       email,
//     },
//     beforeSend: function() {
//       $('.deleteMessage').html('Loading....');
//     },
//     success: function(response) {
//       if (response.length) {
//         $('.deleteMessage').html('User is available');
//       } else {
//         //Submit the user data if the user does not exist
//         $.ajax({
//           const idb = $('#id-num').val();
//           console.log(idb)
//           method: 'DELETE',
//           url: 'http://localhost:3000/Patients/id',
//           data: {
//             fullname,
//             email,
//             phone,
//             date,
//           },
//           beforeSend: function() {
//             $('.deleteMessage').html('Loading....');
//           },
//           success: function() {
//             $('.deleteMessage').html('delete Successfull');
//           },
//         });
//       }
//     },
//   });
// });


// $('window').ready(()=>{
  
//   $('#contact_form').submit((e)=>{
//       e.preventDefault();
//       let idnum = $('#id-numb').val();
//       $.ajax({
//           url: 'http://localhost:3000/Patients',
//           method: 'get',
//       }).done((response)=>{
//           let userExist = true;
//           let id = 0;
//           for (let i = 0; i < response.length; i++){
//               if (response[i].id === idnum){
//                   userExist = false;
//                   id = response[i].id
//               }
//           }
//           if (userExist === false){
//               $('.deleteMessage')[0].innerText = 'User Nonexistent'
//               $('.deleteMessage').fadeOut(3000)
//               return
//           }else if (userExist === true){//(!userExist)
//               $('.deleteMessage')[0].innerText='User exists'//'No user exists'
//               $('.deleteMessage').fadeOut(3000)
//               return 
//           }
//           $.ajax({
//               url: `http://localhost:3000/Patients/${id}`,
//               method: 'delete',
//               data: {
//                 fullname,
//                 email,
//                 phone,
//                 date,
//               }
//           }).done(()=>{
//               window.location = 'http://localhost:3000/control-panel.html'
//           })

//       })
//   })

// })

const del = () => {
  const id = document.querySelector('.idd').value;
  console.log(id);
  fetch(
    `http://localhost:3000/Patients/${id}`,{
      method:'DELETE',
      headers:{
        "Content-Type": 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(id);


    })
    .catch(error => console.log(error.messge));
};

//Display Function for individual Patient Appointment...............

const display = () => {
  const id = document.querySelector('#idnum').value;
  console.log(id);
  fetch(
    `http://localhost:3000/Patients/${id}`,{
      method:'GET',
      headers:{
        "Content-Type": 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      patient = '';
      patient += `<div>
      
      <p>Name: ${data.fullname}</p>
      <p>Email: ${data.email}</p>
      <p>Phone: ${data.phone}</p>
      <p>Date: ${data.date}</p>
    </div>`;
      $('#display-div').append(patient);


    })
    .catch(error => console.log(error.messge));
};


//Click to display....Coupled with some CSS Effect....
$('#display-button').click(function(){
  $('#hide').show();
});


//Update function..................

const update = () => {
  const id = document.querySelector('#id-modal').value;
  console.log(id);

  const fulname = $('#name-modal').val();
  const dat = $('#date-modal').val();
  const phon = $('#phone-modal').val();
  const Email = $('#email-modal').val();

  fetch(
    `http://localhost:3000/Patients/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type": 'application/json',
      },
      body:JSON.stringify({fullname:fulname,email:Email,phone:phon,date:dat})
    })
    .then(res => res.json())
    .then(data => {
      console.log(id);

      


    })
    .catch(error => console.log(error.messge));
};







// $('#update-button').click(function(event) {
//   event.preventDefault();
//   const idn = $('#id-modal').val();
//   const fulname = $('#name-modal').val();
//   const dat = $('#date-modal').val();
//   const phon = $('#phone-modal').val();
//   const Email = $('#email-modal').val();
  //Check if user input is empty
  // if (!fulname || !phon || !Email) {
  //   $('#display-div-2').html('Kindly fill in all fields');
  //   $('#display-div-2').fadeOut(3000);
  //   return;
  // }
  //Make get request to check if the user already exist
  //const id = document.querySelector('#idnum').value;





  // $.ajax({
  //   method: 'GET',
  //   url: `http://localhost:3000/Patients?id=${id}`,
  //   data: {
  //     idn
  //   },
  //   beforeSend: function() {
  //     $('#display-div-2').html('Loading....');
  //   },
  //   success: function(response) {
  //     if (response.length) {
  //       $('#display-div-2').html('User already exist');

  //       $.ajax({
  //         method: 'PUT',
  //         url: `http://localhost:3000/Patients/${id=idn}`,
  //         data: {
  //           fulname,
  //           Email,
  //           phon,
  //         },
  //         beforeSend: function() {
  //           $('#display-div-2').html('Loading....');
  //         },
  //         success: function() {
  //           $('#display-div-2').html('Update Successfull');
  //           $('#display-div-2').fadeOut(3000);
  //         },
  //       });

  //     } else {
        //alert("Show that the user does not exist");
//         $('#display-div-2').html('No Existent Patient By Such Id');
//             $('#display-div-2').fadeOut(3000);
//       }
//     },
//   });
// });









