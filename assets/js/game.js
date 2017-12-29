window.$ = window.jQuery = require('jquery');

$('#new_game').click(function(){
    let score_variant = $('#score_variant').find(":selected").text();
    let round_to_win = $('#round_to_win').find(":selected").text();
    let team = [];
    for (i = 1; i <=2; i++){
        team_name = $('#team_name_'+i).val();
        // console.log(team_name);
        if (team_name != ""){
            team.push(team_name);
        } else {
            team.push("Team " + i);
        }
    }
    create_new_game(score_variant, round_to_win, team)
});

function create_new_game(score, round, team){
    const hands = $('#hands');
    hands.append(`
        <p>Bid Team</p>`);
    for (i=0; i < team.length; i++) {
        hands.append(`
            <input name="bid_team" id="team`+ (i+1) +`" type="radio" />` +
            `<label for="team`+ (i+1) +`">` + team[i]+ `</label>`);
    }
    hands.append(`
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
                <p>0</p>
            </div>
        </div>`);
    hands.append(`
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
                <p>0</p>
            </div>
        </div>`);
    hands.append(`
        <table class="striped centered" id="bid">
            <thead>
                <tr>
                  <th>Tricks</th>
                  <th>Spades</th>
                  <th>Clubs</th>
                  <th>Diamonds</th>
                  <th>Hearts</th>
                  <th>NT</th>
                </tr>
            </thead>
            <tbody id="bid_score">
            <tbody>
        </table>
        `);

    add_bid_table(score);
    $('<div class="divider"></div><div class="section" id="tricks_won"></div>').appendTo($('#hands'));
    $('#tricks_won').append(`
        <div class="row">
        <div class="col s8">
            <select id="tricks_won_select" class = "browser-default">
                <option value = "" disabled selected>
                    Select bidders won tricks
                </option>
                <option value = "10">10</option>
                <option value = "9">9</option>
                <option value = "8">8</option>
                <option value = "7">7</option>
                <option value = "6">6</option>
                <option value = "5">5</option>
                <option value = "4">4</option>
                <option value = "3">3</option>
                <option value = "2">2</option>
                <option value = "1">1</option>
                <option value = "0">0</option>
            </select>
        </div>
        <div class="col s4">
            <button class="btn waves-effect waves-light" type="submit" name="action" id='new_hand'>New Hand
              <i class="material-icons right">autorenew</i>
            </button>
        </div>
        </div>
        `);
}

function selected_team(){
    var selected_team = $("input[name='bid_team']:checked").val();
}

function add_bid_table(score){
    switch (score) {
        case "Perfect":
            for (i=6; i<=10; i++){
                var row_value = document.createElement("tr");
                for (j=1; j<=6; j++){
                    var cell_col = document.createElement("td");
                    if (j == 1){
                        cell_col.innerHTML = i;
                    } else{
                        cell_col.innerHTML = 20+(i-6)*100 + (j-2)*20;
                    }
                    row_value.appendChild(cell_col);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            var row_array = [["Misere","150","Open Misere","250","Hi/Lo","150"],
                             ["Doulbe Misere","450","Patatrope","750","Blind Misere","1000"]];
            for (i=0; i<row_array.length; i++){
                var row_value = document.createElement("tr");
                for (j=0; j<row_array[i].length; j++){
                    var cell = document.createElement("td");
                    cell.innerHTML = row_array[i][j];
                    row_value.appendChild(cell);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            break;
        case "Avondale":
            for (i=6; i<=10; i++){
                var row_value = document.createElement("tr");
                for (j=1; j<=6; j++){
                    var cell_col = document.createElement("td");
                    if (j == 1){
                        cell_col.innerHTML = i;
                    } else{
                        cell_col.innerHTML = 40+(i-6)*100 + (j-2)*20;
                    }
                    row_value.appendChild(cell_col);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            var row_array = ["Misere","250","Open Misere","500","Blind Misere","1000"];
            var row_value = document.createElement("tr");
            for (i=0; i<row_array.length; i++){
                var cell = document.createElement("td");
                cell.innerHTML = row_array[i];
                row_value.appendChild(cell);
            }
            $(row_value).appendTo($('#bid_score'));
            break;
        case "Original":
            for (i=6; i<=10; i++){
                var row_value = document.createElement("tr");
                for (j=1; j<=6; j++){
                    var cell_col = document.createElement("td");
                    if (j == 1){
                        cell_col.innerHTML = i;
                    } else{
                        cell_col.innerHTML = (20*(i-6)+40)*(j-1);
                    }
                    row_value.appendChild(cell_col);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            var row_array = ["Misere","250","Open Misere","500","Blind Misere","1000"];
            var row_value = document.createElement("tr");
            for (i=0; i<row_array.length; i++){
                var cell = document.createElement("td");
                cell.innerHTML = row_array[i];
                row_value.appendChild(cell);
            }
            $(row_value).appendTo($('#bid_score'));
            break;
        default:

    }
}
