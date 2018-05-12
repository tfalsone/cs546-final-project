function goToLeague(element) {
    var id = element.id;
    console.log(id);
    window.location.href = "http://localhost:3000/league/" + id;
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/leagues",
        error: function(e) {
            console.log(e);
        }
    }).done(function(leagues) {
        leagues.forEach(function(league) {
            var leagueId = league["_id"];
            var leagueName = league["name"];
            var leagueSport = league["sport"];
            var numTeams = league["teams"].length;

            var newCard = `
            <div class="card" id="` + leagueId + `" onclick="goToLeague(this)">
                <h3 class="underline">` + leagueName + `</h3>
                <div class="stats">
                    <ol>
                        <li class="sport">
                            <p id="description" class="underline">Sport</p>
                            <p id="sport">` + leagueSport + `</p>
                        </li>
                        <li class="numTeams">
                            <p id="description" class="underline"># of Teams</p>
                            <p id="value">` + numTeams + `</p>
                        </li>
                    </ol>
                </div>
            </div>
            `;
            $(".all-leagues div.container").append(newCard);
        });
    });
});