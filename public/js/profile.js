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

function getDate(datetime) {
    var day = weekday[datetime.getDay()];
    var date = month[datetime.getMonth()] + " " + datetime.getDate();
    var date = day + ", " + date;

    return date;
}

function getTime(datetime) {
    var hours = datetime.getHours();
    hours = (hours > 12)? hours -12 : hours;
    hours = (hours == '00')? 12 : hours;
    hours = hours, 2;
    var minutes = zeroPad(datetime.getMinutes(), 2);
    var suffix = (hours >= 12)? 'pm' : 'am';
    var time = hours + ":" + minutes + " " + suffix;

    return time;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function() {
    console.log(document.cookie);
    var userId = getCookie("AuthCookie");
    console.log(userId);

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users/" + userId,
        error: function(e) {
            console.log(e);
        }
    }).done(function(userInfo) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/teams",
            error: function(e) {
                console.log(e);
            }
        }).done(function(teams) {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/games",
                error: function(e) {
                    console.log(e);
                }
            }).done(function(games) {
                $.ajax({
                    type: "GET",
                    url: "http://localhost:3000/leagues",
                    error: function(e) {
                        console.log(e);
                    }
                }).done(function(leagues) {
                    console.log(userInfo);
                    var userTeams = userInfo["teams"];
                    var userLeagues = userInfo["leagues"];
                    if (userTeams != undefined) {
                        var userGames = games.filter(game => userTeams.includes(game["team1"]) || userTeams.includes(game["team2"]));

                        // Getting Upcoming Games
                        userGames.forEach(function(game) {
                            var datetime = new Date(game["time"]);
                            if (datetime >= new Date()) {
                                var team1 = teams.find(function(team) {
                                    return team["_id"] == game["team1"];
                                });
                                var team2 = teams.find(function(team) {
                                    return team["_id"] == game["team2"];
                                });

                                var team1Name = team1["name"];
                                var team2Name = team2["name"];
                                var date = getDate(datetime);
                                var time = getTime(datetime);
                                var location = game["location"];

                                var newCard = `
                                <div class="card">
                                    <h2 class="underline" id="teams">` + team1Name + ` vs ` + team2Name + `</h2>
                                    <ul>
                                        <li>
                                            <p>` + date + `</p>
                                        </li>
                                        <li>
                                            <p>` + time + `</p>
                                        </li>
                                        <li>
                                            <p>` + location + `</p>
                                        </li>
                                    </ul>
                                </div>
                                `;
                                $(".upcoming-games div.container").prepend(newCard);
                            }
                        });

                        // Getting User Teams
                        userTeams.forEach(function(teamId) {
                            var team = teams.find(function(team) {
                                return team["_id"] == teamId;
                            });
                            var teamName = team["name"];
                            var records = team["record"];
                            var wins = 0;
                            var losses = 0;
                            records.forEach(function(record) {
                                wins = wins + record["wins"];
                                losses = losses + record["losses"];
                            });
                            var recordString = wins + " - " + losses;

                            var newCard = `
                            <div class="card">
                                <h2 class="underline" id="my_team_name">` + teamName + `</h2>
                                <p id="record">` + recordString + `</p>
                            </div>
                            `;
                            $(".my-teams div.container").prepend(newCard);
                        });
                    }

                    if (userLeagues != undefined) {
                        // Getting User Leagues
                        userLeagues.forEach(function(leagueId) {
                            var league = leagues.find(function(league) {
                                return league["_id"] == leagueId;
                            });
                            var leagueName = league["name"];
                            var leagueSport = league["sport"];

                            var newCard = `
                            <div class="card">
                                <h2 class="underline" id="my_league_name">` + leagueName + `</h2>
                                <p id="sport">` + leagueSport + `</p>
                            </div>
                            `;
                            $(".my-leagues div.container").prepend(newCard);
                        });
                    }
                });
            });
        });
    });
});