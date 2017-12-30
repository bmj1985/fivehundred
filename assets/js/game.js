window.$ = window.jQuery = require('jquery');

let score_variant
let round_to_win
let team
$('#new_game').click(function(){
    $("#game_result").show()
    $("#new_game_setup").hide()
    score_variant = $('#score_variant').find(":selected").text();
    round_to_win = $('#round_to_win').find(":selected").text();
    team = []
    for (i = 1; i <=2; i++){
        team_name = $('#team_name_'+i).val();
        // console.log(team_name);
        if (team_name != ""){
            team.push(team_name);
        } else {
            team.push("Team " + i);
        }
    }
    setup_result_board(team, round_to_win)
    create_new_round(score_variant, team)
});

function setup_result_board(team, round_to_win) {
    $('#team1_name').html(team[0] +
        `<a id="team1_round_score" class="secondary-content">0
            </a>`)
    $('#team2_name').html(team[1] +
        `<a id="team2_round_score" class="secondary-content">
            0
            </a>`)
    $('#reset').hide()
}

function create_new_round(score, team){
    var hands = $('#hands')
    hands.html("")
    hands.append(`
        <p>Bid Team</p>`);
    add_team_score(team)
    add_bid_table(score);
    $('<div class="divider"></div><div class="section" id="tricks_won"></div>').appendTo($('#hands'));
    $('#tricks_won').append(`
        <div class="row">
        <div class="col s8">
            <select id="tricks_won_select" class = "browser-default">
                <option value = "default" disabled selected>
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
            <button class="btn waves-effect waves-light" type="submit" name="action" id='new_round'>New Round
              <i class="material-icons right">autorenew</i>
            </button>
        </div>
        </div>
        `);

    $('#new_round').hide()

    $('#tricks_won_select').on("change", ()=>{
        $('#new_hand').removeClass("disabled")
    });
}

$(document).on("click", '#new_hand',()=>{
    var current_scores = calculate_result()
    reset_hand(current_scores)
})

$(document).on("click", '#new_round',()=>{
    var team1_score = parseInt($('#team_1_score').text())
    var team2_score = parseInt($('#team_2_score').text())
    var team1_win, team2_win
    var team_round = 0
    if (team1_score >=500 || team2_score <= -500){
        team_round = parseInt($("#team1_round_score").text())
        team_round += 1
        $("#team1_round_score").html(team_round)
        if (team_round == round_to_win){
            team1_win = true
        }
    }
    if (team2_score >=500 || team1_score <= -500){
        team_round = parseInt($("#team2_round_score").text())
        team_round += 1
        $("#team1_round_score").html(team_round)
        if (team_round == round_to_win){
            team2_win = true
        }
    }
    if (team_round < parseInt(round_to_win)){
        create_new_round(score_variant, team)
    } else{
        $("#new_round").hide()
        if (team1_win) {
            $("#team1_round_score").html(`<a class="secondary-content"><i class="material-icons">sentiment_very_satisfied</i></a>`)
            $("#team2_round_score").html(`<a class="secondary-content"><i class="material-icons">sentiment_very_dissatisfied</i></a>`)
        } else {
            $("#team2_round_score").html(`<a class="secondary-content"><i class="material-icons">sentiment_very_satisfied</i></a>`)
            $("#team1_round_score").html(`<a class="secondary-content"><i class="material-icons">sentiment_very_dissatisfied</i></a>`)
        }
        $('#reset').show()
    }
})

$('#reset').on("click",()=>{
    location.reload()
    // $("#game_result").hide()
    // $("#new_game_setup").show()
    // $("#hands").html("")
})

$('#score_variant').on("change",()=>{
    if ($('#round_to_win option:selected').val() != ""){
        $('#new_game').prop("disabled", false)
        console.log($('#round_to_win option:selected').val())
    }
})

$('#round_to_win').on("change",()=>{
    if ($('#score_variant option:selected').val() != ""){
        $('#new_game').prop("disabled", false)
        console.log($('#score_variant option:selected').val())
    }

})

function reset_hand(scores) {
    $("#team1").prop("checked", true);
    $("#bid_6_2").prop("checked", true);
    $("#tricks_won_select > [value=default]").prop("disabled", false)
    $("#tricks_won_select > [value=default]").prop("selected", true)
    $("#tricks_won_select > [value=default]").prop("disabled", true)
    $('#new_hand').addClass("disabled")
    scores.forEach((element)=>{
        if (element >=500 || element <= -500){
            $('#new_hand').hide()
            $('#new_round').show()
        }
    })
}

function calculate_result() {
    var scores = []
    var team_selected = $("input[name='bid_team']:checked").attr("id")
    var team1_score = parseInt($('#team_1_score').text())
    var team2_score = parseInt($('#team_2_score').text())
    var won_tricks = parseInt($('#tricks_won_select option:selected').text())
    var bid = $("input[name='bid']:checked").attr("id")
    var bid_score = parseInt($('[for='+bid+']').text())
    var tricks_to_win

    if (bid.includes("Hi")) {
        tricks_to_win = 5
    } else if (bid.includes("Misere") || bid.includes("Patatrope")) {
        tricks_to_win = 0
    } else {
        tricks_to_win = parseInt(bid.match(/_\d{1,2}_/g).toString().replace(/_/g,""))
    }
    var result
    if ((won_tricks >= tricks_to_win && tricks_to_win !=0)){
        result = "won"
    } else if ((tricks_to_win == 5 && won_tricks == 5) || (won_tricks == 0 && tricks_to_win ==0)){
        result = "won_special"
    } else {
        result = "lose"
    }
    switch (result) {
        case "won":
            switch (team_selected){
                case "team1":
                    team1_score += bid_score
                    team2_score += (10-won_tricks)*10
                    break;
                case "team2":
                    team1_score += (10-won_tricks)*10
                    team2_score += bid_score
                    break;
            }
            break
        case "won_special":
            switch (team_selected){
                case "team1":
                    team1_score += bid_score
                    team2_score += 0
                    break;
                case "team2":
                    team1_score += 0
                    team2_score += bid_score
                    break;
            }
            break
        case "lose":
            case "team1":
                team1_score -= bid_score
                team2_score += (10-won_tricks)*10
                break;
            case "team2":
                team1_score += (10-won_tricks)*10
                team2_score -= bid_score
            break
    }
    if (team1_score < 0){
        $('#team_1_board').toggleClass("red", true)
        $('#team_1_board').removeClass("teal")
    } else {
        $('#team_1_board').toggleClass("teal", true)
        $('#team_1_board').removeClass("red")
    }
    if (team2_score < 0){
        $('#team_2_board').toggleClass("red", true)
        $('#team_2_board').removeClass("teal")
    } else {
        $('#team_2_board').toggleClass("teal", true)
        $('#team_2_board').removeClass("red")
    }
    $('#team_1_score').html(`<font size="20">`+team1_score+`</font>`)
    $('#team_2_score').html(`<font size="20">`+team2_score+`</font>`)
    scores.push(team1_score)
    scores.push(team2_score)
    return scores
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
        var team_score = $("<div/>").attr({id:"team_" +(i+1) +"_board"}).addClass("card teal darken-1")
        team_score.append(`
                    <div class="card-content white-text">
                        <p id="team_`+(i+1)+`_score" class="center"><font size="20">0</font></p>
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
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+i+"_"+j, type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+i+"_"+j}).html(bid)
                        $(bid_select).appendTo(cell_col)
                        $(bid_label).appendTo(cell_col)
                    }
                    row_value.appendChild(cell_col);
                }
                $(row_value).appendTo($('#bid_score'));
            }
            var row_array = [["Misere","150","Open Misere","250","Hi/Lo","350"],
                             ["Doulbe Misere","450","Patatrope","750","Blind Misere","1000"]];
            for (i=0; i<row_array.length; i++){
                var row_value = document.createElement("tr");
                for (j=0; j<row_array[i].length; j++){
                    var cell = document.createElement("td");
                    if (j%2 == 0){
                        cell.innerHTML = row_array[i][j]
                    } else{
                        var bid = row_array[i][j]
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+row_array[i][j-1].replace(/\s{1}|\//i, ""), type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+row_array[i][j-1].replace(/\s{1}|\//i, "")}).html(bid)
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
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+i+"_"+j, type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+i+"_"+j}).html(bid)
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
                        var bid_select = $("<input/>").attr({name: "bid", id: "bid_"+i+"_"+j, type:"radio"})
                        var bid_label =$("<label/>").attr({for: "bid_"+i+"_"+j}).html(bid)
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
    $("#bid_6_2").prop("checked", true);
}
