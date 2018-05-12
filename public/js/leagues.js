$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/leagues",
        error: function(e) {
            console.log(e);
        }
    }).done(function(leagues) {
        leagues.forEach(function(league) {
            var leagueName = league["name"];
            var leagueSport = league["sport"];
            var numTeams = league["teams"].length;

            var newCard = `
            <div class="card">
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