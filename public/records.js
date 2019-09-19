//Displaying database function......
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