NoName.matchState = function(game){

}

var map;

NoName.matchState.prototype = {
	
	//Si hay ya dos jugadores no te deja jugar ya que el servidor está lleno
	init: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length > 1) {
				console.log ('==========================================================');
				console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
				console.log ('==========================================================');
				game.state.start('menuState');
			}
        });
	},
		

    preload: function () {
        var text = "- MatchMaking -\n Esperando otro jugador \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX - 200, 0, text, style);
    },

    //Se crea al jugador
    create: function () {
    	this.createPlayer();
    },

    //Cuando haya dos jugadores en el servidor, comienza el juego
    update: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('levelState');
			}
		});
    }, 
    
    getNumPlayers: function (callback) {
        $.ajax({
            url: (window.location.href + '/game'),
            async: false,
        }).done(function (data) {
            callback(data);
        })
    },
    
    createPlayer: function () {
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
    }
}