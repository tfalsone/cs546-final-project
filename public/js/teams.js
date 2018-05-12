function goToTeam(element) {
    var id = element.id;
    console.log(id);
    window.location.href = "http://localhost:3000/team/" + id;
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/teams",
        error: function(e) {
            console.log(e);
        }
    }).done(function(teams) {
        teams.forEach(function(team) {
            var teamId = team["_id"];
            var teamName = team["name"];
            var numPlayers = team["roster"].length;
            var numLeagues = team["record"].length;
            var records = team["record"];
            var wins = 0;
            var losses = 0;
            records.forEach(function(record) {
                wins = wins + record["wins"];
                losses = losses + record["losses"];
            });
            var recordString = wins + " - " + losses;

            var newCard = `
            <div class="card" id="` + teamId + `" onclick="goToTeam(this)">
                <h3 class="underline">` + teamName + `</h3>
                <div class="stats">
                    <ol>
                        <li class="numPlayers">
                            <p id="description" class="underline"># of Players</p>
                            <p id="value">` + numPlayers + `</p>
                        </li>
                        <li class="record">
                            <p id="description" class="underline">Record</p>
                            <p id="value">` + recordString + `</p>
                        </li>
                        <li class="numLeagues">
                            <p id="description" class="underline"># of Leagues</p>
                            <p id="value">` + numLeagues + `</p>
                        </li>
                    </ol>
                </div>
            </div>
            `;
            $(".all-teams div.container").append(newCard);
        });
    });
});