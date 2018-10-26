NoName.levelState = function(game) {

}

//Declaración de variables
var bg;

var player;
var xgame;
var ygame;
var size;

var rival;
var xgameR;
var ygameR;
var sizeR;

NoName.levelState.prototype = {
    
    preload: function() {
        
        
    },

    create: function() {

        game.add.tileSprite(0, 0, 8000000, 600, 'background');
        game.world.setBounds(0, 0, 8000000, 600);

        //Variables
        size = 0.05;
        ygame = 320;
        xgame = 10;

        sizeR = 0.05;
        ygameR = 320;
        xgameR = 100;


        //bg = game.add.sprite(0, 0, 'background');

        //PLAYER
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        player = game.add.sprite(xgame, ygame, 'example_char');
        player.scale.setTo(size, size);

        game.physics.enable(player, Phaser.Physics.ARCADE);


        //RIVAL
        this.wRKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.sRKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.aRKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.dRKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        rival = game.add.sprite(xgameR, ygameR, 'example_enem');
        rival.scale.setTo(sizeR, sizeR);

        game.physics.enable(rival, Phaser.Physics.ARCADE);

        //Camera
        game.camera.follow(player);
    },

    update: function() {
        //PLAYER KEYS
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

        //RIVAL KEYS
        if(this.wRKey.isDown){
            if(ygameR > 320){
                rival.y -= 3;
                sizeR -= 0.001;
                rival.scale.setTo(sizeR, sizeR);
                ygameR -= 3;
            }
        }
        if(this.sRKey.isDown){
            if(ygameR < 599){
                rival.y += 3;
                sizeR += 0.001;
                rival.scale.setTo(sizeR, sizeR);
                ygameR += 3;
            }
        }
        if(this.aRKey.isDown){
            if(rival.x >= xgame){
                rival.x -= 3;
            }
        }
        if(this.dRKey.isDown){
            rival.x += 3;
        }

        //Check collision
        game.physics.arcade.collide(player, rival, collision);
        
        function  collision() {
            game.state.start('endState');
        }
    }
}

