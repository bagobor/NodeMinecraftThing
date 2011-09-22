exports.init = function(engine) {
  var loginPane    = document.getElementById('loginPane'),
      playerList   = document.getElementById('loginPlayers'),
      loginButton  = document.getElementById('loginButton'),
      createButton = document.getElementById('loginCreate'),
      deleteButton = document.getElementById('loginDelete');
      
  loginPane.style.display = 'block';
  
  
  var players = engine.login.players;
  playerList.innerHTML = '';
  for(var i=0; i<players.length; ++i) {
    playerList.innerHTML += '<input type=radio name=playerValue value="' + players[i].player_name + '">' + players[i].player_name + '<br/>'
  }

  loginButton.onclick = function() {
    var playerValues = document.getElementsByName('playerValue');
    for(var i=0; i<playerValues.length; ++i) {
      if(playerValues[i].checked) {
        engine.login.joinGame(playerValues[i].value, function() {
        
        
        
        
          //TODO: Join game
          
        });
        break;
      }
    }
  };
  
  createButton.onclick = function() {
    engine.setState(engine.game_module.states.create_state);
  };
  
  deleteButton.onclick = function() {
    var playerValues = document.getElementsByName('playerValue');
    for(var i=0; i<playerValues.length; ++i) {
      if(playerValues[i].checked) {
        var r = confirm("Are you sure you want to delete " + playerValues[i].value + " forever?");
        if(r) {
          engine.login.deletePlayer(playerValues[i].value, function(err) {
            if(err) {
              throw Error("Could not delete player " + playerValues[i].value + ", reason: " + err);
            }
            engine.setState(engine.game_module.states.login_state);
          });
        }
        break;
      }
    }
  };
}

exports.deinit = function(engine) {
  var loginPane = document.getElementById('loginPane');
  loginPane.style.display = 'none';
}

