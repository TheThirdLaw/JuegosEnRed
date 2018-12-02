NoName.tieState = function(game){

}

var tie;

NoName.tieState.prototype = {

	init: function() {
		if(game.player.x > game.rival.x){
			deletePlayers()
		}
	},

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);

        //Si se llega al final del nivel sin que nadie pille a nadie, sale un texto por pantalla que indica que ha habido un empate
        tie = game.add.text(game.world.centerX-300, game.world.centerY-200, "Ha habido un empate", {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });
        
        //Botón que devuelve al menú
        game.add.button(game.world.centerX-150, game.world.centerY+50, 'menu', backtomenu, this, 1, 0, 2);
    },

    update: function(){

    }
}

    function backtomenu(){
        game.state.start('menuState');
    }

	function deletePlayers() {
		$.ajax({
	        method: "DELETE",
	        url: (window.location.href + '/game/delete'),
	        processData: false,
	        headers: {
	            "Content-Type": "application/json"
	        },
	    }).done(function (data) {
	        console.log("Player removed: " + JSON.stringify(data));
	    })
	}