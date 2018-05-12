function joinTeam() {
    alert("Congrats, you've been added!");
}

$(document).ready(function() {
    var id = window.location.pathname.split("/").pop();

    $.ajax({
        type: "GET", 
        url: "http://localhost:3000/users",
        error: function(e) {
            console.log(e);
        }
    }).done(function(users) {
        $.ajax({
            type: "GET", 
            url: "http://localhost:3000/teams/" + id,
            error: function(e) {
                console.log(e);
            }
        }).done(function(team) {
            var teamName = team["name"];
            $("#team-name").text(teamName);
            var records = team["record"];
            var wins = 0;
            var losses = 0;
            records.forEach(function(record) {
                wins = wins + record["wins"];
                losses = losses + record["losses"];
            });
            var recordString = wins + " - " + losses;
            $("#record").text("Record: " + recordString);

            var teamPlayers = team["roster"];
            teamPlayers.forEach(function(playerId) {
                var user = users.find(function(user) {
                    return user["_id"] == playerId;
                });
                var userName = user["firstName"] + " " + user["lastName"];
                var element = "<li>" + userName + "</li>";
                $("#roster").append(element);
            });
        });
    });
});