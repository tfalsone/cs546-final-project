function joinLeague() {
    alert("Congrats, you've been added!");
}

$(document).ready(function() {
    var id = window.location.pathname.split("/").pop();

    $.ajax({
        type: "GET", 
        url: "http://localhost:3000/teams",
        error: function(e) {
            console.log(e);
        }
    }).done(function(teams) {
        $.ajax({
            type: "GET", 
            url: "http://localhost:3000/leagues/" + id,
            error: function(e) {
                console.log(e);
            }
        }).done(function(league) {
            var leagueName = league["name"];
            var leagueSport = league["sport"];
            $("#league-name").text(leagueName);
            $("#sport").text("Sport: " + leagueSport);
            var leagueTeams = league["teams"];
            leagueTeams.forEach(function(teamId) {
                var team = teams.find(function(team) {
                    return team["_id"] == teamId;
                });
                var teamName = team["name"];
                var element = "<li>" + teamName + "</li>";
                $("#teams").append(element);
            });
        });
    });
});