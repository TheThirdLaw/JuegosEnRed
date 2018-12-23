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
			}
			
			if (data.type == "getWorld") {
				game.map = data.map;
			}
		}
	},
		

    preload: function () {

    },

    create: function () {
<<<<<<< HEAD
    	var msg = {type: "createPlayer"};
    	game.connection.send(JSON.stringify(msg));
    	
    	var msg = {type: "getWorld"};
    	game.connection.send(JSON.stringify(msg));
=======
        game.add.tileSprite(0, 0, 800, 600, 'background');
        game.add.tileSprite(0, 0, 800, 600, 'match');
        game.add.tileSprite(0, 0, 800, 600, 'hojas1');
        game.add.tileSprite(0, 0, 800, 600, 'hojas2');
    	this.createPlayer();
>>>>>>> Dev
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