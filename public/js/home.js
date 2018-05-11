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

function getDateString(datetime) {
    var day = weekday[datetime.getDay()];
    var date = month[datetime.getMonth()] + " " + datetime.getDate();
    var hours = datetime.getHours();
    hours = (hours > 12)? hours -12 : hours;
    hours = (hours == '00')? 12 : hours;
    hours = zeroPad(hours, 2);
    var minutes = zeroPad(datetime.getMinutes(), 2);
    var suffix = (hours >= 12)? 'pm' : 'am';
    var dateString = day + ", " + date + " @ " + hours + ":" + minutes + " " + suffix;

    return dateString;
}

$(document).ready(function() {
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
                games.forEach(function(game) {
                    var datetime = new Date(game["time"]);
                    if (datetime < new Date()) {
                        var dateString = getDateString(datetime);
                        var league = leagues.find(function(league) {
                            return league["_id"] == game["leagueId"];
                        });
                        var leagueName = league["name"];
                        var leagueSport = league["sport"];
                        var team1 = teams.find(function(team) {
                            return team["_id"] == game["team1"];
                        });
                        var team1Name = team1["name"];
                        var team1Score = game["score"]["team1Score"];
                        var team2 = teams.find(function(team) {
                            return team["_id"] == game["team2"];
                        });
                        var team2Name = team2["name"];
                        var team2Score = game["score"]["team2Score"];

                        console.log("League: " + leagueName + "\tSport: " + leagueSport);
                        console.log("Team 1 (" + team1Name + ") VS Team 2 (" + team2Name + ")");
                        console.log("Team 1: " + team1Score + "\tTeam 2: " + team2Score);
                        console.log(dateString);
                        console.log("\n");

                        var newCard = `
                        <div class='card'>
                            <div class="top underline">
                                <h3 id="league"><b>` + leagueName + `</b></h3>
                                <h3 id="sport"><b>` + leagueSport + `</b></h3>
                            </div>
                            <div class="final">
                                <p>Final</p>
                            </div>
                            <div class="results">
                                <div class="team1">
                                    <p id="team_name">` + team1Name + `</p>
                                    <br>
                                    <p id="score">` + team1Score + `</p>
                                </div>
                                <div class="team2">
                                    <p id="team_name">` + team2Name + `</p>
                                    <br>
                                    <p id="score">` + team2Score + `</p>
                                </div>
                                <div class="vs">
                                    <img src="/img/vs.png">
                                </div>
                            </div>
                            <div class="date">
                                <p>` + dateString + `</p>
                            </div>
                        </div>
                        `;

                        $("div.container").prepend(newCard);
                    }
                });
            });
        });
    });
});