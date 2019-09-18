$('window').ready(()=>{
    $('#new-user-form').submit((e)=>{
        e.preventDefault();//Prevents the default behaviour of forms
        let name = $('#name').val();
        // $.ajax({
        //     url: 'http://localhost:3000/Patients',
        //     method: 'post',
        //     data: {
        //         name
        //     }
        // }).done((response)=>{
        //     console.log(response)

            $.ajax({
                url: 'http://localhost:3000/Patients',
                method: 'get',
            }).done((response)=>{
                var userExist =false;
                for (var i = 0; i > response.length; i++){
                    if (response[i].name === name){
                        userExist=true;
                    }
                }
                if (userExist){//(!userExist)
                    $('#error')[0].innerText='User exists'//'No user exists'
                    $('#error').fadeOut(3000)
                    return 
                }
                $.ajax({
                    url: 'http://localhost:3000/Patients',
                    method: 'post',//input delete
                    data: {//do not include this section.
                        name
                    }
                }).done(()=>{
                    window.location = 'http://localhost:3000/Patients'
                })
                // let userExist = response.filter(e={
                //     return e.name === name
                // })
                console.log(response)
        })
    })
})