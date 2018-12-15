NoName.menuState = function(game) {

}

NoName.menuState.prototype = {

	init: function(){
		game.connection = new WebSocket('ws://' + window.location.hostname + ':8087/nonamegame');
	    game.connection.onerror = function(e) {
			console.log("WS error: " + e);
		}
	    
		game.connection.onmessage = function(msg) {
			data = JSON.parse(msg.data);
			if (data.type == "getNumPlayers") {
				if (data.longitud > 1) {
					console.log ('==========================================================');
					console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
					console.log ('==========================================================');
				} else {
				    game.state.start('pregameState');
				}
			}
		}
	},

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 800, 600, 'background');
        game.add.tileSprite(0, 0, 800, 600, 'title');
        game.add.button(100, 200, 'play', playButton, this, 1, 0, 2);
        game.add.button(101, 370, 'settings', settingsButton, this, 1, 0, 2);
        game.add.button(245, 370, 'shop', shopButton, this, 1, 0, 2);
    },

    update: function() {

    }
}

function playButton() {
	var msg = {type: "getNumPlayers"};
	game.connection.send(JSON.stringify(msg));
}

function shopButton() {
    game.state.start('shopState');    
}

function settingsButton() {
    game.state.start('configState');    
}