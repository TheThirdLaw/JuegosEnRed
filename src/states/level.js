NoName.levelState = function(game) {

}

var bg;
var player;
var xgame;
var ygame;
var size;

NoName.levelState.prototype = {
    
    preload: function() {
        
        
    },

    create: function() {
        //Create variables
        size = 0.05;
        ygame = 320;
        xgame = 10;

        //Register the keys.
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Add sprites
        bg = game.add.sprite(0, 0, 'background');
        player = game.add.sprite(xgame, ygame, 'example_char');
        player.scale.setTo(size, size);

        //Activate collision
        game.physics.enable(player, Phaser.Physics.ARCADE);
    },

    update: function() {
        //Press keys
        if(this.wKey.isDown){
            if(ygame > 320){
                player.y -= 3;
                size -= 0.001;
                player.scale.setTo(size, size);
                ygame -= 3;
            }
        }
        if(this.sKey.isDown){
            if(ygame < 599){
                player.y += 3;
                size += 0.001;
                player.scale.setTo(size, size);
                ygame += 3;
            }
        }
        if(this.aKey.isDown){
            if(player.x >= xgame){
                player.x -= 3;
            }
        }
        if(this.dKey.isDown){
            player.x += 3;
        }

        //Check collision
        var collision = game.physics.arcade.collide(player);

        if(collision) {
            theCollision();

            //Checks who is behind, that one
        }

        //If there is a collision:
        function theCollision() {

        }
    }
}

