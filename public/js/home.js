$(document).ready(function() {
    /*
    var team1id = game["team1"];
    var team2id = game["team2"];
    var leagueId = game["leagueId"];
    var team1score = game["score"]["team1Score"];
    var team2score = game["score"]["team2Score"];
    var hours = datetime.getHours();
    var suffix = (hours >= 12)? 'pm' : 'am';
    hours = (hours > 12)? hours -12 : hours;
    hours = (hours == '00')? 12 : hours;
    var minutes = zeroPad(datetime.getMinutes(), 2);

    console.log("Team 1 Score: " + team1score);
    console.log("Team 2 score: " + team2score);
    console.log("Day of Week: " + weekday[datetime.getDay()]);
    console.log("Month and Day: " + month[datetime.getMonth()] + ", " + datetime.getDate());
    console.log("Time: " + hours + ":" + minutes + " " + suffix);
    */

    var data = JSON.stringify({
        "firstName": "Thomas",
        "lastName": "Falsone",
        "email": "tfalsone@stevens.edu",
        "password": "PoopDollar"
    });

    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    //Getting Recent Results
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/games",
        error: function(e) {
            console.log(e);
        }
    }).done(function(games, status) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/teams",
            error: function(e) {
                console.log(e);
            }
        }).done(function(teams, status) {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/leagues",
                error: function(e) {
                    console.log(e);
                }
            }).done(function(leagues, status) {
                //console.log("Games:");
                //console.log(games);
                //console.log("Teams:");
                //console.log(teams);
                //console.log("Leagues:");
                //console.log(leagues);

                games.forEach(function(game) {
                    var datetime = new Date(game["time"]);
                    if (datetime < new Date()) {
                        var day = weekday[datetime.getDay()];
                        var date = month[datetime.getMonth()] + " " + datetime.getDate();
                        var hours = datetime.getHours();
                        hours = (hours > 12)? hours -12 : hours;
                        hours = (hours == '00')? 12 : hours;
                        hours = zeroPad(hours, 2);
                        var minutes = zeroPad(datetime.getMinutes(), 2);
                        var suffix = (hours >= 12)? 'pm' : 'am';
                        var league = leagues.find(function(league) {
                            return league["_id"] == game["leagueId"];
                        });
                        var team1 = teams.find(function(team) {
                            return team["_id"] == game["team1"];
                        });
                        var team2 = teams.find(function(team) {
                            return team["_id"] == game["team2"];
                        });

                        console.log("League: " + league["name"] + "\tSport: " + league["sport"]);
                        console.log("Team 1 (" + team1["name"] + ") VS Team 2 (" + team2["name"] + ")");
                        console.log("Team 1: " + game["score"]["team1Score"] + "\tTeam 2: " + game["score"]["team2Score"]);
                        console.log(day + ", " + date + " @ " + hours + ":" + minutes + " " + suffix);
                        console.log("\n");
                    }
                });
            });
        });
    });
});