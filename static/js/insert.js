function copyToClipboard(){
    var name = $('#name').val();
    var phoneNumber = $('#phoneNumber').val();
    var email = $('#email').val();
    var address = $('#address').val();
    var profession = $('#profession').val();
    var specialization = $('#specialization').val();
    var exp = $('#exp').val();
    var courses = $('#courses').val();
    var about = $('#about').val();

    var h = [];
    var t = "";
    t = `
        <p>
        {
            "id": "",<br>
            "picture": ".jpeg",<br>
            "name": "${name}",<br>
            "phoneNumber": "${phoneNumber}",<br>
            "email": "${email}",<br>
            "address": [${address}],<br>
            "profession": "${profession}",<br>
            "specialization": "${specialization}",<br>
            "exp": "${exp}",<br>
            "reviews": "0",<br>
            "courses": [${courses}],<br>
            "about": "${about}",<br>
            "available": true,<br>
        },
        </p>`;

    $('#show').html(t);
}