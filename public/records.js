$('window').ready(()=>{
    $.ajax({
        url:'http://localhost:3000/Patients',
        method: 'get'
    }).done((Response)=>{
        Response.forEach((e,index)=>{
            $('#tbody')
        })
    })
})