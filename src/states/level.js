NoName.levelState = function(game) {

}

//Declaración de variables
var player;
var xgame;
var ygame;
var size;
var speed = 3;

var rival;
var xgameR;
var ygameR;
var sizeR;
var speedR = 4;

var roca;
var job;
var spcont = 5;
var sptimer;

var bomba;
var luces;
var salto;

NoName.levelState.prototype = {
    
    preload: function() {
        
    },

    create: function() {

        game.add.tileSprite(0, 0, 16000, 600, 'background');
        game.world.setBounds(0, 0, 16000, 600);

        //Variables
        size = 0.06;
        ygame = 320;
        xgame = 10;

        sizeR = 0.06;
        ygameR = 320;
        xgameR = 100;

        //PLAYER
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        player = game.add.sprite(xgame, ygame, 'example_char');
        player.scale.setTo(size, size);
        game.physics.enable(player, Phaser.Physics.ARCADE);

        //RIVAL
        this.wRKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.sRKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.dRKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rival = game.add.sprite(xgameR, ygameR, 'example_enem');
        rival.scale.setTo(sizeR, sizeR);
        game.physics.enable(rival, Phaser.Physics.ARCADE);

        //Camera
        game.camera.follow(player);

        //Tex catch or run
        job = game.add.text(20, 20, "", {
            font: "35px Arial",
            fill: "#ff0044",
            align: "center"
        });

        //Speed buff to rival
        sptimer = game.time.events.add(Phaser.Timer.SECOND * 5, speedy, this);

        //Power-ups and traps
        if(hasbomb){
            bomba = game.add.sprite(540, 20, 'bomb');
            bomba.scale.setTo(0.535, 0.535);
        }
        if(hasjump){
            salto = game.add.sprite(700, 20, 'salto');
            salto.scale.setTo(0.535, 0.535);
        }
        if(haslight){
            luces = game.add.sprite(620, 20, 'lightsout');
            luces.scale.setTo(0.535, 0.535);
        }
    },

    update: function() {
        //Text on the left corner
        if(player.x < rival.x){
            job.setText('¡Persíguelo!');
        }else if(rival.x < player.x){
            job.setText('¡Huye!');
        }

        //PLAYER KEYS
        if(this.wKey.isDown){
            if(ygame > 320){
                player.y -= speed;
                size -= 0.0007;
                player.scale.setTo(size, size);
                ygame -= 3;
            }
        }
        if(this.sKey.isDown){
            if(ygame < 553){
                player.y += speed;
                size += 0.0007;
                player.scale.setTo(size, size);
                ygame += 3;
            }
        }
        if(this.dKey.isDown){
            if(player.x >= 400){
                job.x += speed;
                bomba.x += speed;
                luces.x += speed;
                salto.x += speed;
            }
            player.x += speed;
        }

        //RIVAL KEYS
        if(this.wRKey.isDown){
            if(ygameR > 320){
                rival.y -= speed;
                sizeR -= 0.0007;
                rival.scale.setTo(sizeR, sizeR);
                ygameR -= 3;
            }
        }
        if(this.sRKey.isDown){
            if(ygameR < 553){
                rival.y += speed;
                sizeR += 0.0007;
                rival.scale.setTo(sizeR, sizeR);
                ygameR += 3;
            }
        }
        if(this.dRKey.isDown){
            rival.x += speedR;
        }

        //Collisions
        game.physics.arcade.collide(player, rival, collision);
        game.physics.arcade.collide(player, roca, makeinvisible(player));
        game.physics.arcade.collide(rival, roca, makeinvisible(rival));
        !game.physics.arcade.collide(player, roca, makevisible(player));
        !game.physics.arcade.collide(rival, roca, makevisible(rival));

        //Tie
        if(player.x >= 16000 || rival.x >= 16000){
            nowinner();
        }
    }
}

//Collision function
function  collision() {
    game.state.start('endState');
}

//Tie function
function nowinner(){
    game.state.start('tieState');
}

//Hide behind rock function
function makeinvisible(sprite){
    sprite.visible = false;
}

//Get out of behind the rock function
function makevisible(sprite){
    sprite.visible = true;
}

//Ens the rival speed buff function
function speedy(){
    speedR = 3;
}