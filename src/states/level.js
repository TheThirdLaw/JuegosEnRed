NoName.levelState = function(game) {
    
    }
    
    //Declaración de variables
    var player;
    var xgame;
    var ygame;
    var size;
    var speed = 3;
    var xspeed = 3;
    
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
    var pantallazo;
    var lucestime;
    var lcont = 0;
    var trap;
    var xtrap;
    var ytrap;
        
    var salto;
    
    NoName.levelState.prototype = {
        
        preload: function() {
            
        },
    
        create: function() {
    
            game.add.tileSprite(0, 0, 16000, 600, 'background');
            game.world.setBounds(0, 0, 16000, 600);
    
            //Generamos mundo
            var loops = 16000/800;
            for (var i = 0; i<loops; i++){
                generateRocks(i);
                generateHerbs(i);
            }
    
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
            this.oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);            
    
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
                bomba = game.add.button(540, 20, 'bomb', bombpow, this);
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
                    if(hasbomb){
                        bomba.x += speed;
                    }
                    if(haslight){
                        luces.x += speed;
                    }
                    if(hasjump){
                        salto.x += speed;
                    }
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
            game.physics.arcade.collide(trap, rival, lighttrap);            
    
            //Tie
            if(player.x >= 16000 || rival.x >= 16000){
                nowinner();
            }

            //LIGHTS OUT
            if(this.oKey.isDown){
                if(lcont == 0){
                    droptrap();
                    lcont++;
                }
            }
    
            //Destroys lightsout
            if(game.time.now == lucestime + 3000){
                pantallazo.destroy();
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
    
    //Use bomb power-up
    function bombpow(){
        bomba.pendingDestroy = true;
    }
    
    //Use jump power-up
    function jumppow(){
        salto.pendingDestroy = true;
    }
    
    //Use lightsout trap
    function lighttrap(){
        trap.destroy();        
        pantallazo = game.add.sprite(0, 0, 'blackscreen');
        lucestime = game.time.now;
    }

    function droptrap(){
        luces.pendingDestroy = true;
        xtrap = player.x;
        ytrap = player.y;
        trap = game.add.sprite(xtrap, ytrap, 'trap');
        trap.scale.setTo(size, size);
        game.physics.enable(trap, Phaser.Physics.ARCADE);
    }    
    
    function generateRocks(i){
        if(Math.random() >= 0.5){
            var info =  selectRock();
            var randX = Math.floor(Math.random() * 301);
            var randY = Math.floor(Math.random() * 141) + 140;
            var rock1 = game.add.sprite((800*i + randX), (550 - randY), info[0]);
            rock1.scale.setTo(info[1] - randY*0.001, info[1] - randY*0.001);
        }
        if(Math.random() >= 0.5){
            var info =  selectRock();        
            var randX = Math.floor(Math.random() * 301) + 400;
            var randY = Math.floor(Math.random() * 141) + 140;
            var rock2 = game.add.sprite((800*i + randX), (550 - randY), info[0]);
            rock2.scale.setTo(info[1] - randY*0.001, info[1] - randY*0.001);        
        }
        if(Math.random() >= 0.5){
            var info =  selectRock();        
            var randX = Math.floor(Math.random() * 301);
            var randY = Math.floor(Math.random() * 141);
            var rock3 = game.add.sprite((800*i + randX), (550 - randY), info[0]);
            rock3.scale.setTo(info[1] - randY*0.001, info[1] - randY*0.001);        
        }
        if(Math.random() >= 0.5){
            var info =  selectRock();        
            var randX = Math.floor(Math.random() * 301) + 400;
            var randY = Math.floor(Math.random() * 141);
            var rock4 = game.add.sprite((800*i + randX), (550 - randY), info[0]);
            rock4.scale.setTo(info[1] - randY*0.001, info[1] - randY*0.001);        
        }
    }
    
    function generateHerbs(i){
        var rand = Math.floor(Math.random() * 7);
        for(var j = 0; j < rand; j++){
            var randX = Math.floor(Math.random() * 801);
            var randY = Math.floor(Math.random() * 281);
            var herb = game.add.sprite((800*i + randX), (580 - randY), selectHerb());
            herb.scale.setTo(1/3 - randY*0.0001, 1/3 - randY*0.0001);
        }
    }
    
    function selectHerb(){
        var random = Math.floor(Math.random() * 14) + 1;
        switch(random){
            case 1:
                return "Hi1";
            case 2:
                return "Hi2";
            case 3:
                return "Hi3";
            case 4:
                return "Hi4";
            case 5:
                return "Hi5";
            case 6:
                return "Hi6";
            case 7:
                return "Hi7";
            case 8:
                return "Hi8";
            case 9:
                return "Hi9";
            case 10:
                return "Hi10";
            case 11:
                return "Hi11";
            case 12:
                return "Hi12";
            case 13:
                return "Hi13";
            case 14:
                return "Hi14";
        }
    }
    
    function selectRock(){
        var random = Math.floor(Math.random() * 14) + 1;
        switch(random){
            case 1:
                return ["Pi1", 2/3];
            case 2:
                return ["Pi2", 1];
            case 3:
                return ["Pi3", 0.7];
            case 4:
                return ["Pi4", 1];
            case 5:
                return ["Pi5", 1];
            case 6:
                return ["Pi6", 1.5];
            case 7:
                return ["Pi7", 0.8];
            case 8:
                return ["Pi8", 0.6];
            case 9:
                return ["Pi9", 2/3];
            case 10:
                return ["Pi10", 1];
            case 11:
                return ["Pi11", 2/3];
            case 12:
                return ["Pi12", 1];
            case 13:
                return ["Pi13", 1.5];
            case 14:
                return ["Pi14", 0.8];
        }
    }