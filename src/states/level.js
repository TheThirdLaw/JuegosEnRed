NoName.levelState = function(game) {

}

var xsize = 25;
var ysize = 25;

var ygame = 305;
var xgame;

var player = game.add.sprite(0,0,'example_char');
player.width = 25;
player.height = 25;
var bg;
var rival;

NoName.levelState.prototype = {
    
    preload: function() {
        
        
    },

    create: function() {
        //Register the keys.
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Add sprites
        bg = game.add.sprite(0, 0, 'background');
        rival = game.add.sprite(0, ygame, 'example_enem');

        //Activate collision
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(rival, Phaser.Physics.ARCADE);
    },

    update: function() {
        //Press keys
        if(this.wKey.isDown){
            if(ygame > 305){
                player.y -= 3;
                xsize = xsize - 0.25;
                ygame -= 3;
            }
        }
        if(this.sKey.isDown){
            if(ygame < 599){
                player.y += 3;
                xsize = xsize + 0.25;
                ygame += 3;
            }
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

