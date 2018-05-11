$(document).ready(function() {
    var data = JSON.stringify({
        "firstName": "Thomas",
        "lastName": "Falsone",
        "email": "tfalsone@stevens.edu",
        "password": "PoopDollar"
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/users",
        data: data,
        error: function(e) {
            console.log(e.responseText);
        },
        dataType: "json",
        contentType: "application/json"
    }).done(function(result, status) {
        alert("Data: " + result + "\nStatus: " + status);
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        error: function(e) {
            console.log(e);
        }
    }).done(function(result, status) {
        console.log("Users: ");
        console.log(result);
    });
});