var NoName = {}

NoName.bootState = function(game) {

}

NoName.bootState.prototype = {

    preload: function() {
        
    },

    create: function() {
    	game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('preloadState');
    },

    update: function() {
      
    }
}