$(document).ready(function() {
    var x = document.cookie;
    console.log(x);
    /*
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users/" + userId,
        error: function(e) {
            console.log(e);
        }
    }).done(function(userInfo) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/games",
            error: function(e) {
                console.log(e);
            }
        }).done(function(games) {
            var userTeams = userInfo["teams"];
            var userGames = games.find(function(game) {
                if (userTeams.includes(game["team1"])) {
                    return true;
                } else if (userTeams.includes(game["team2"])) {
                    return true;
                } else {
                    return false;
                }
            });

        });
    });
    */
});