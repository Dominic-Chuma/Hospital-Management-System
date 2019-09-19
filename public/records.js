//Displaying database function...... For All Patients
$(document).ready(function(){
    $.ajax({
        url:'http://localhost:3000/Patients',
        method: 'get'
    }).done(function(response){
        $.each(response, function(index, value) {
            patient = '';
            patient += `<tr>
            <th>${index + 1}</th>
            <td>${value.fullname}</td>
            <td>${value.email}</td>
            <td>${value.phone}</td>
          </tr>`;
            $('.tableBody').append(patient);
        });
    });
});


//Display database function...........For Individual Patients
$(document).ready(function(){
    $.ajax({
        url:'http://localhost:3000/Patients/id',
        method: 'get'
    }).done(function(response){
            patient = '';
            patient += `<div>
            
            <p>${value.fullname}</p>
            <p>${value.email}</p>
            <p>${value.phone}</p>
            <p>${value.date}</p>
          </div>`;
            $('#display-form').append(patient);
    });
});