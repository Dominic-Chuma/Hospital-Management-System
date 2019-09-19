//An initial try for displaying database.
const response = [
    {
        "id": 1,
        "name": "SColeman",
        "email": "Brett@gal.co",
        "phone": null
    },
    {
        "id": 2,
        "name": "SColeman",
        "email": "Brett@gal.co",
        "phone": null
    },
    {
        "id": 3,
        "name": "SColeman",
        "email": "Brett@gal.co",
        "phone": null
    }
]



const elementPatients = response.map(el=>{
    return '<tr><th>'+el.id+'</th><th>'+el.name+'</th><th>'+el.email+'</th><th>'+Phone+'</th></tr>';
});

const elementString = elementPatients.join('');

document.getElementById("tableId").appendChild(elementString);