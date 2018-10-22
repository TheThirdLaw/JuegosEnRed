NoName.levelState = function(game) {

}

NoName.levelState.prototype = {
    
    preload: function() {
        
        
    },

    create: function() {
        //Create variables
        var size = 0.025;
        var ygame = 305;
        var xgame;

        //Register the keys.
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Add sprites
        bg = game.add.sprite(0, 0, 'background');
        var player = game.add.sprite(20, ygame,'example_char');
        player.scale.setTo(size, size);
        var rival = game.add.sprite(0, ygame, 'example_enem');
        rival.scale.setTo(size, size);

        //Activate collision
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(rival, Phaser.Physics.ARCADE);
    },

    update: function() {
        //Press keys
        if(this.wKey.isDown){
            if(ygame > 305){
                player.y -= 3;
                size = size - 0.25;
                ygame -= 3;
            }
        }
        if(this.sKey.isDown){
            if(ygame < 599){
                player.y += 3;
                size = size + 0.25;
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

            //Checks who is behind, that one
        }

        //If there is a collision:
        function theCollision() {

        }
    }
}

