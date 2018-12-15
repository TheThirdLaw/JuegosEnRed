NoName.matchState = function(game){

}

var map;

NoName.matchState.prototype = {
	
	init: function () {
		game.connection.onmessage = function(msg) {
			data = JSON.parse(msg.data);
			if (data.type == "getNumPlayers") {
				if (data.longitud == 2 && game.player1 !== undefined) {
					console.log ('##### COMIENZA EL JUEGO #####');
					game.state.start('levelState');
				}
			}
			
			if (data.type == "createPlayer") {
				game.player1 = data.jugador;
				if(game.haslight == true){
					game.player1.trap = true;
				}else{
					game.player1.trap = false;
				}
			}
		}
	},
		

    preload: function () {
        var text = "- MatchMaking -\n Esperando otro jugador \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX - 200, 0, text, style);
    },

    create: function () {
    	var msg = {type: "createPlayer"};
    	game.connection.send(JSON.stringify(msg));
    },

    update: function () {
    	var msg = {type: "getNumPlayers"};
		game.connection.send(JSON.stringify(msg));
    }, 
    
    /*getNumPlayers: function (callback) {
        $.ajax({
            url: (window.location.href + '/game'),
            async: false,
        }).done(function (data) {
            callback(data);
        })
    },*/
    
    /*createPlayer: function () {
        $.ajax({
            method: "POST",
            url: (window.location.href + '/game'),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Player created: " + JSON.stringify(data));
            game.player1 = data
        })
    }*/
}