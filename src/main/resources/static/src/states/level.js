NoName.levelState = function(game) {
    
}
    
//Declaración de variables del jugador
var player;
var xgame = 10;
var ygame = 320;
var size = 0.06;
var yspeed = 3;
var xspeed = 3;

//Declaración de variables del rival
var rival;
var ygameR = 320;
var sizeR = 0.06;
var xspeedR = 4;

//Declaración del texto que indica si huyes o persigues
var job;

//Timer para el buff de velocidad del rival
var sptimer;
   
//Se crea el icono de la bomba y una variable para determinar la duración del power-up
var bomba;
var bombatime;

//Se crea el icono de la luz y aparece la trampa por pantalla
var luces;
var trap;

//Pantallazo es la activación de la trampa y lucestime determina la duración
var pantallazo;
var lucestime;

//Se crea el icono del salto       
var salto;
    
NoName.levelState.prototype = {
        
    preload: function() {
        
    },
    
    create: function() {
        //Background
        game.add.tileSprite(0, 0, 16000, 600, 'background');
        game.world.setBounds(0, 0, 16000, 600);
    
        //Funciones básicas del jugador (teclas, aparición del sprite, escalado y físicas)
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        player = game.add.sprite(xgame, ygame, 'example_char');
        player.scale.setTo(size, size);
        game.physics.enable(player, Phaser.Physics.ARCADE);
    
        //Funciones básicas del rival (teclas, aparición del sprite, escalado y físicas)
        this.wRKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.sRKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.dRKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rival = game.add.sprite(xgame + 90, ygameR, 'example_enem');
        rival.scale.setTo(sizeR, sizeR);
        game.physics.enable(rival, Phaser.Physics.ARCADE);

        //Teclas que activan las trampas
        this.oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
        this.iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);  
        this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);           
    
        //Camara
        game.camera.follow(player);
    
        //Generación del mundo. Se divide el tamaño total del mundo entre el tamaño de la pantalla
        //Por cada uno de estos loops, se llama una vez a las funciones para generar las rocas y las hierbas
        var loops = 16000/800;
        for (var i = 0; i<loops; i++){
            generateRocks(i);
            generateHerbs(i);
        }
    
        //Texto que aparece para indicar que tienes que hacer: perseguir o huir
        job = game.add.text(20, 20, "", {
            font: "35px Arial",
            fill: "#ff0044",
            align: "center"
        });
        job.fixedToCamera = true;
    
        //Buff de velocidad que inicialmente tiene el rival
        //Durante 4 segundos el rival tiene velocidad 4, a partir de entonces, se llama a speedy y esta función cambia la velocidad
        sptimer = game.time.events.add(Phaser.Timer.SECOND * 5, speedy, this);
    
        //Si se ha seleccionado los power-ups y trampas anteriormente, aparecerán los iconos por pantalla
        if(hasbomb){
            bomba = game.add.sprite(540, 20, 'bomb');
            bomba.scale.setTo(0.535, 0.535);
            bomba.fixedToCamera = true;
        }
        if(hasjump){
            salto = game.add.sprite(700, 20, 'salto');
            salto.scale.setTo(0.535, 0.535);
            salto.fixedToCamera = true;
        }
        if(haslight){
            luces = game.add.sprite(620, 20, 'lightsout');
            luces.scale.setTo(0.535, 0.535);
            luces.fixedToCamera = true;
        }
    },
    
    update: function() {
        //Cambia el texto dependiendo de si está por delante o por detrás
        if(player.x < rival.x){
            job.setText('¡Persíguelo!');
        }else if(rival.x < player.x){
            job.setText('¡Huye!');
        }
    
        //Teclas para el jugador, si está más cerca del límite inferior, se hace mayor el sprite, para dar sensación de profundidad
        //No se puede ir para la izquierda
        if(this.wKey.isDown){
            if(ygame > 320){
                player.y -= yspeed;
                size -= 0.0007;
                player.scale.setTo(size, size);
                ygame -= 3;
            }
        }
        if(this.sKey.isDown){
            if(ygame < 553){
                player.y += yspeed;
                size += 0.0007;
                player.scale.setTo(size, size);
                ygame += 3;
            }
        }
        if(this.dKey.isDown){
            player.x += xspeed;
        }
    
        //Teclas para el rival, si está más cerca del límite inferior, se hace mayor el sprite, para dar sensación de profundidad
        //No se puede ir para la izquierda
        if(this.wRKey.isDown){
            if(ygameR > 320){
                rival.y -= yspeed;
                sizeR -= 0.0007;
                rival.scale.setTo(sizeR, sizeR);
                ygameR -= 3;
            }
        }
        if(this.sRKey.isDown){
            if(ygameR < 553){
                rival.y += yspeed;
                sizeR += 0.0007;
                rival.scale.setTo(sizeR, sizeR);
                ygameR += 3;
            }
        }
        if(this.dRKey.isDown){
            rival.x += xspeedR;
        }
    
        //Colisiones
        game.physics.arcade.collide(player, rival, collision);
        game.physics.arcade.collide(trap, rival, lighttrap);            
    
        //Si el jugador o el rival llegan al final del mapa, hay un empate
        if(player.x >= 16000 || rival.x >= 16000){
            nowinner();
        }

        //Si se pulsa la O y se ha seleccionado la trampa anteriormente se suelta la trampa de luz
        if(this.oKey.isDown){
            if(haslight){
                droptrap();
                haslight = false;
            }
        }
        //Una vez pasan tres segundos desde la activación de la trampa, se destuye
        if(game.time.now == lucestime + 3000){
            pantallazo.destroy();
        }
        
        //Si se pulsa la I y se ha seleccionado la bomba anteriormente, se usa la bomba
        if(this.iKey.isDown){
            if(hasbomb){
                bombpow();
                hasbomb = false;
            }
        }
        //Una vez pasan tres segundos desde la activación de la bomba, la velocidad vuelve a la normal
        if(game.time.now == bombatime + 3000){
            xspeed = 3;
        }

        //
        if(this.pKey.isDown){
            if(hasjump){
                jumppow();
                hasjump = false;
            }
        }
    }
}
    
//Si el jugador y el rival colisionan, se acaba la partida y se pasa a endState
function  collision() {
    game.state.start('endState');
}
    
//Si no colisionan y llegan al final, se acaba la partida y se pasa a tieState
function nowinner(){
    game.state.start('tieState');
}
    
/*//Hide behind rock function
function makeinvisible(sprite){
    sprite.visible = false;
}
    
//Get out of behind the rock function
function makevisible(sprite){
    sprite.visible = true;
}*/
    
//Acaba con el buff de velocidad incial que tiene el rival
function speedy(){
    xspeedR = 3;
}

//Se destruye el icono de la bomba y se activa, aumentando la velocidad del jugador
function bombpow(){
    bomba.pendingDestroy = true;
    xspeed = 5;
    bombatime = game.time.now;
}
    
//Se usa el poder del teletransporte
function jumppow(){
    salto.pendingDestroy = true;
    player.x = rival.x + 100;
}
    
//Se destruye la trampa y la pantalla se pone en negro
function lighttrap(){
    trap.destroy();        
    pantallazo = game.add.sprite(0, 0, 'blackscreen');
    lucestime = game.time.now;
}
//Suelta la trampa de luz, destruye el icono y genera el sprite de la trampa en el mismo lugar de donde estaba
//el jugador. Se activan las físicas en la trampa
function droptrap(){
    luces.pendingDestroy = true;
    trap = game.add.sprite(player.x, player.y, 'trap');
    trap.scale.setTo(size, size);
    game.physics.enable(trap, Phaser.Physics.ARCADE);
}    

//Esta función "divide" a cada pantalla (cada loop del mundo) en 4 cuartos, y en cada cuarto hay un 50% de
//probabilidades de que aparezca una roca por pantalla. estas tienen también un escalado aleatorio dentro de unos límites
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

//Esta función permite que aparezcan por pantalla hasta 7 hierbas, las cuales tienen una x y una y aleatorias
//y un tamaño también aleatorio dentro de unos límites
function generateHerbs(i){
    var rand = Math.floor(Math.random() * 7);
    for(var j = 0; j < rand; j++){
        var randX = Math.floor(Math.random() * 801);
        var randY = Math.floor(Math.random() * 281);
        var herb = game.add.sprite((800*i + randX), (580 - randY), selectHerb());
        herb.scale.setTo(1/3 - randY*0.0001, 1/3 - randY*0.0001);
    }
}

//Selecciona y devuelve de manera aleatoria una de los sprites de hierbas que hay disponibles
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

//Selecciona y devuelve de manera aleatoria una de los sprites de rocas que hay disponibles
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