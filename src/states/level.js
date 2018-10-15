NoName.menuState = function(game) {

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

        //Variable punctuation
        puntuacion = 0;

        //Sprites
        /* bg = game.add.sprite(0, 0, 'backGround');
        cat = game.add.sprite(0, 20, 'cat');
        catCatcher = game.add.sprite(200, 200, 'catCatcher'); */

        //Activate collision
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(rival, Phaser.Physics.ARCADE);
    },

    update: function() {
        //Press keys
        if(this.wKey.isDown){
            catCatcher.y -= 3;
        }
        if(this.sKey.isDown){
            catCatcher.y += 3;
        }
        if(this.aKey.isDown){
            catCatcher.x -= 3;
        }
        if(this.dKey.isDown){
            catCatcher.x += 3;
        }

        //Check collision
        var collision = game.physics.arcade.collide(player, rival);

        if(collision) {
            thecollision();
        }

        //If there is a collision:
        function  thecollision() {

        }
    }
}

