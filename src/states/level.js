NoName.levelState = function(game) {

}

var player;
var bg;
var rival; 

NoName.levelState.prototype = {
    
    preload: function() {
        
        
    },

    create: function() {
        //  Register the keys.
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Activate collision
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(rival, Phaser.Physics.ARCADE);
    },

    update: function() {
        //Press keys
        if(this.wKey.isDown){
            player.y -= 3;
        }
        if(this.sKey.isDown){
            player.y += 3;
        }
        if(this.aKey.isDown){
            player.x -= 3;
        }
        if(this.dKey.isDown){
            player.x += 3;
        }

        //Check collision
        var collision = game.physics.arcade.collide(player, rival);

        if(collision) {
            theCollision();
        }

        //If there is a collision:
        function theCollision() {

        }
    }
}

