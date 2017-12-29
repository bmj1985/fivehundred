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
    console.log(score, round, team);
    const hands = $('#hands');
    hands.append(`
        <p>Bid Team</p>
    `);
    for (i=0; i < team.length; i++) {
        hands.append(`<input group="bid_team" id="team"`+ i+1 +` type="radio" />` +
        `<label for="team"`+ i+1 +`">` + team[i]+ `</label>`);
    }
}
