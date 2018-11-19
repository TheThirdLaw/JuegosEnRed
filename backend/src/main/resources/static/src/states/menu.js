CatCatcher.menuState = function (game) {

}

CatCatcher.menuState.prototype = {

		// Esta función tiene como objetivo eliminar los posibles jugadores creados en
		// matchmaking que hayan sido echados de la partida por estar el servidor lleno.
		init: function() {
			if (game.player1 != null) {
				$.ajax({
		            method: "DELETE",
		            url: 'http://localhost:8080/game/' + game.player1.id,
		            processData: false,
		            headers: {
		                "Content-Type": "application/json"
		            },
		        }).done(function (data) {
		            //console.log("Player removed: " + JSON.stringify(data));
		        })
			}
		},
		
    preload: function () {
        //Indicamos como iniciar partida
        var text = "- CatCatcher -\n Pulse la tecla 'P' \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };

        var t = game.add.text(game.world.centerX - 200, 0, text, style);

        //Iniciamos tecla 'p'
        this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    },

    create: function () {
        this.pKey.onDown.add(this.startGame,this)
    },

    update: function () {

    },
    
    startGame: function () {
    	game.state.start('matchmakingState')
    }
}