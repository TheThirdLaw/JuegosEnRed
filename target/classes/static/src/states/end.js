NoName.endState = function(game){

}

var info;

NoName.endState.prototype = {
	
	init: function() {
		
	},
		

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);

        //Si la posición del jugador es mayor, sale por pantalla un texto que indica que ha ganado
        if(ganar == true){
            info = game.add.text(game.world.centerX-230, game.world.centerY-200, "¡Has ganado!", {
                font: "65px Arial",
                fill: "#ff0044",
                align: "center"
            });
        }
        //Si la posición del rival es mayor, sale por pantalla un texto que indica que ha perdido el jugador
        else if(ganar == false){
        	deletePlayers();
            info = game.add.text(game.world.centerX-230, game.world.centerY-200, "Has perdido...", {
                font: "65px Arial",
                fill: "#ff0044",
                align: "center"
            });
        }

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
	var msg = {type: "deletePlayers"};
	game.connection.send(JSON.stringify(msg));
}