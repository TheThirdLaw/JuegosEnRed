NoName.levelState = function(game) {
    
}
    
//Declaración de variables del jugador
var player;
var xgame = 10;
var ygame = 320;
var size = 0.06;
var yspeed = 5;
var xspeed;

//Declaración de variables del rival
var rival;
var ygameR = 320;
var savedy;
var sizeR = 0.06;

var ganar;

//Declaración del texto que indica si huyes o persigues
var job;

//Timer para el buff de velocidad del rival
var sptimer;
var inittimer;

//Se crea el icono de la bomba y una variable para determinar la duración del power-up
var bomba;
var bombatime;

//Se crea el icono de la luz y aparece la trampa por pantalla
var luces;
var trap;
var trap2 = null;

//Pantallazo es la activación de la trampa y lucestime determina la duración
var pantallazo;
var lucestime;

//Se crea el icono del salto       
var salto;

var cont;
    
NoName.levelState.prototype = {

    init: function() {
		if (game.player1.id == 1) {
			game.player2 = {id: 2}
		} else {
			game.player2 = {id: 1}
        }

        this.getWorld(function (){

        });
	},
        
    preload: function() {
    	console.log(JSON.stringify(game.player1))
    },
    
    create: function() {
        //Background
        game.add.tileSprite(0, 0, 16000, 600, 'background');
        game.world.setBounds(0, 0, 16000, 600);
        
        getPlayerSync(function(data) {
        	if(game.player1.place == 1){
            	game.player = game.add.sprite(game.player1.x, game.player1.y, 'example_char');
            	game.rival = game.add.sprite(game.player2.x, game.player2.y, 'example_enem');
            }else if(game.player1.place == 2){
            	game.player = game.add.sprite(game.player1.x, game.player1.y, 'example_enem');
            	game.rival = game.add.sprite(game.player2.x, game.player2.y, 'example_char');
            }
        });
        
        //Funciones básicas del jugador (teclas, aparición del sprite, escalado y físicas)
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        game.player.scale.setTo(size, size);
        game.physics.enable(game.player, Phaser.Physics.ARCADE);
    
        game.rival.scale.setTo(sizeR, sizeR);
        game.physics.enable(game.rival, Phaser.Physics.ARCADE);

        //Teclas que activan las trampas
        this.oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
        this.iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);  
        this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);           
    
        //Camara
        game.camera.follow(game.player);
    
        //Generación del mundo.
        for (var i = 0; i<game.map.length; i++){
            console.log("1");
            var data;
            if (game.map[i].isRock == true){
                data = selectRock(game.map[i].sprite);
                var rock = game.add.sprite(game.map[i].x, game.map[i].y, data[0]);
                rock.scale.setTo(data[1] + (0.15*(game.map[i].y-320)/555), data[1] + (0.15*(game.map[i].y-320)/555));
                console.log("2");
            }else{
                data = selectHerb(game.map[i].sprite);
                var herb = game.add.sprite(game.map[i].x, game.map[i].y, data);
                herb.scale.setTo(1/3 + (0.15*(game.map[i].y-320)/555), 1/3 + (0.15*(game.map[i].y-320)/555));
                console.log("2");
            }
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
        if(game.player.x > game.rival.x){
        	xspeed = 7;
        	sptimer = game.time.events.add(Phaser.Timer.SECOND * 5, speedy, this);
        }else if(game.player.x < game.rival.x){
            xspeed = 0;
            inittimer = game.time.events.add(Phaser.Timer.SECOND * 2, speedy, this);
        }
        
    
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
        if(game.player.x < game.rival.x){
            job.setText('¡Persíguelo!');
            cont = 1;
        }else if(game.rival.x < game.player.x){
            job.setText('¡Huye!');
            if(cont == 1){
            	xspeed = 7;
            	cont = 2;
            	sptimer = game.time.events.add(Phaser.Timer.SECOND * 3, speedy, this);
            }
        }
        
        size = 0.06 + (0.15*((game.player.y-320)/555));
        game.player.scale.setTo(size, size);
        sizeR = 0.06 + (0.15*((game.rival.y-320)/555));
        game.rival.scale.setTo(sizeR, sizeR);
        
    
        //Teclas para el jugador, si está más cerca del límite inferior, se hace mayor el sprite, para dar sensación de profundidad
        //No se puede ir para la izquierda
        if(this.wKey.isDown){
            if(ygame > 320){
                game.player.y -= yspeed;
                ygame -= 4;
        
            }
        }
        if(this.sKey.isDown){
            if(ygame < 510){
                game.player.y += yspeed;
                ygame += 4;
            }
        }
        if(this.dKey.isDown){
            game.player.x += xspeed;
        }
    
        //Colisiones
        game.physics.arcade.collide(game.player, game.rival, collision);
        game.physics.arcade.collide(trap, game.rival, lighttrap);
        game.physics.arcade.collide(trap2, game.player, lighttrap2);
    
        //Si el jugador o el rival llegan al final del mapa, hay un empate
        if(game.player.x >= 16000 || game.rival.x >= 16000){
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
        if(game.time.now >= lucestime + 3000){
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
            xspeed = 4;
        }

        //
        if(this.pKey.isDown){
            if(hasjump){
                jumppow();
                hasjump = false;
            }
        }
        
        if(game.player2.trap == true && trap2 == null){
        	trap2 = game.add.sprite(game.rival.x, game.rival.y, 'trap');
            trap2.scale.setTo(sizeR, sizeR);
            game.physics.enable(trap2, Phaser.Physics.ARCADE);
        }

        putPlayer();

        getPlayer(function(data){
        	game.player2 = JSON.parse(JSON.stringify(data));
        	game.rival.x = game.player2.x;
        	game.rival.y = game.player2.y;
        });
        
    },

    getWorld: function (callback) {
        $.ajax({
            url: (window.location.href + '/game/world'),
            async: false,
        }).done(function (data) {
            game.map = data;
            callback(data);
        })
    }
}

//Si el jugador y el rival colisionan, se acaba la partida y se pasa a endState
//Si el jugador y el rival colisionan, se acaba la partida y se pasa a endState
function  collision() {
	if(game.player.x < game.rival.x){
        ganar = true;
    }else{
    	ganar = false;
    }
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
    xspeed = 5;
}

//Se destruye el icono de la bomba y se activa, aumentando la velocidad del jugador
function bombpow(){
    bomba.pendingDestroy = true;
    xspeed = 8;
    bombatime = game.time.now;
}
    
//Se usa el poder del teletransporte
function jumppow(){
    salto.pendingDestroy = true;
    game.player.x = game.player.x + 150;
}
    
//Se destruye la trampa y la pantalla se pone en negro
function lighttrap(){
    trap.destroy();        
}

function lighttrap2(){
    trap2.destroy();        
    pantallazo = game.add.sprite(0, 0, 'blackscreen');
    lucestime = game.time.now;
}
//Suelta la trampa de luz, destruye el icono y genera el sprite de la trampa en el mismo lugar de donde estaba
//el jugador. Se activan las físicas en la trampa
function droptrap(){
	game.player1.trap = true;
    luces.pendingDestroy = true;
    trap = game.add.sprite(game.player.x, game.player.y, 'trap');
    trap.scale.setTo(size, size);
    game.physics.enable(trap, Phaser.Physics.ARCADE);
}

//Selecciona y devuelve una de los sprites de hierbas que hay disponibles
function selectHerb(i){
    switch(i){
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

//Selecciona y devuelve una de los sprites de rocas que hay disponibles
function selectRock(i){
    switch(i){
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

function putPlayer() {
    game.player1.x = game.player.x;
    game.player1.y = game.player.y;
    $.ajax({
        method: "PUT",
        url: (window.location.href + '/game/') + game.player1.id,
        data: JSON.stringify(game.player1),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
        if(game.player1.trap == true){
        	game.player1.trap = false;
        }
    })
}

function getPlayer(callback) {
    $.ajax({
        method: "GET",
        url: (window.location.href + '/game/') + game.player2.id,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.player2 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
}

function getPlayerSync(callback) {
    $.ajax({
        method: "GET",
        url: (window.location.href + '/game/') + game.player2.id,
        async: false,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.player2 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
}