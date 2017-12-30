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
    add_team_score(team)
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
            <button class="btn waves-effect waves-light disabled" type="submit" name="action" id='new_hand'>New Hand
              <i class="material-icons right">autorenew</i>
            </button>
        </div>
        </div>
        `);
    $('#new_hand').bind("click",()=>{
        console.log(selected_team())
    })

    $('#tricks_won_select').bind("change", ()=>{
        $('#new_hand').removeClass("disabled")
    });
}

function selected_team(){
    var selected_id = $("input[name='bid_team']:checked").attr("id")
    return $('[for='+selected_id+']').text()
}

function add_team_score(team) {
    var score_board = $("<div/>").attr({id: "score_board"}).addClass("row")
    $(score_board).appendTo($('#hands'))
    for (i=0; i<=1; i++){
        var team_sec = $("<div/>").attr({id: "team_sec_"+(i+1)}).addClass("col s6")
        $(team_sec).appendTo($('#score_board'))

        var team_select = $("<input/>").attr({name: "bid_team", id:"team" +(i+1), type:"radio"})
        var team_label =$("<label/>").attr({for: "team" +(i+1)}).html(team[i])
        $(team_select).appendTo($('#team_sec_' +(i+1)))
        $(team_label).appendTo($('#team_sec_'+(i+1)))
        var team_score = $("<div/>").addClass("card blue-grey darken-1")
        team_score.append(`
                    <div class="card-content white-text">
                        <h3 class="center">0</h3>
                    </div>`)
        $(team_score).appendTo($('#team_sec_'+(i+1)))
    }
    $("#team1").prop("checked", true);
}
function add_bid_table(score){
    $('#hands').append(`
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
    switch (score) {
        case "Perfect":
            for (i=6; i<=10; i++){
                var row_value = document.createElement("tr");
                for (j=1; j<=6; j++){
                    var cell_col = document.createElement("td");
                    if (j == 1){
                        cell_col.innerHTML = i;
                    } else{
                        var bid = 20+(i-6)*100 + (j-2)*20
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+i+j, type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+i+j}).html(bid)
                        $(bid_select).appendTo(cell_col)
                        $(bid_label).appendTo(cell_col)
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
                    if (j%2 == 0){
                        cell.innerHTML = row_array[i][j]
                    } else{
                        var bid = row_array[i][j]
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+row_array[i][j-1].replace(" ", ""), type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+row_array[i][j-1].replace(" ", "")}).html(bid)
                        $(bid_select).appendTo(cell)
                        $(bid_label).appendTo(cell)
                    }
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
                        var bid = 40+(i-6)*100 + (j-2)*20
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+i+j, type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+i+j}).html(bid)
                        $(bid_select).appendTo(cell_col)
                        $(bid_label).appendTo(cell_col)
                    }
                    row_value.appendChild(cell_col);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            var row_array = ["Misere","250","Open Misere","500","Blind Misere","1000"];
            var row_value = document.createElement("tr");
            for (i=0; i<row_array.length; i++){
                var cell = document.createElement("td");
                if (i%2 == 0){
                    cell.innerHTML = row_array[i]
                } else{
                    var bid = row_array[i]
                    var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+row_array[i-1].replace(" ", ""), type:"radio"})
                    var bid_label =$("<label/>").attr({for: "bid_"+row_array[i-1].replace(" ", "")}).html(bid)
                    $(bid_select).appendTo(cell)
                    $(bid_label).appendTo(cell)
                }
                // cell.innerHTML = row_array[i];
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
                        var bid = (20*(i-6)+40)*(j-1)
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+i+j, type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+i+j}).html(bid)
                        $(bid_select).appendTo(cell_col)
                        $(bid_label).appendTo(cell_col)
                    }
                    row_value.appendChild(cell_col);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            var row_array = ["Misere","250","Open Misere","500","Blind Misere","1000"];
            var row_value = document.createElement("tr");
            for (i=0; i<row_array.length; i++){
                var cell = document.createElement("td");
                if (i%2 == 0){
                    cell.innerHTML = row_array[i]
                } else{
                    var bid = row_array[i]
                    var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+row_array[i-1].replace(" ", ""), type:"radio"})
                    var bid_label =$("<label/>").attr({for: "bid_"+row_array[i-1].replace(" ", "")}).html(bid)
                    $(bid_select).appendTo(cell)
                    $(bid_label).appendTo(cell)
                }
                row_value.appendChild(cell);
            }
            $(row_value).appendTo($('#bid_score'));
            break;
        default:
    }
    $("#bid_62").prop("checked", true);
}
