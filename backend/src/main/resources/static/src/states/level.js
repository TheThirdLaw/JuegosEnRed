CatCatcher.levelState = function(game) {
}

var cat;
var bg;
var catCatcher; 

CatCatcher.levelState.prototype = {

	// Determinamos el id del jugador para saber qué id tiene nuestro rival.
	// De esta forma creamos un "JSON" con la id y podemos aprovechar 
	// this.getPlayer sin hacer cambios evidentes.
	init() {
		if (game.player1.id == 1) {
			game.player2 = {id: 2}
		} else {
			game.player2 = {id: 1}
		}
	},
	
    //Funciones de Level (preload, create y update)
    preload: function() {
    	console.log(JSON.stringify(game.player1))
    },

    create: function() {

        //  Register the keys.
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Creamos variable puntuacion a 0
        puntuacion = 0;

        //Añadimos sprites al escenario
        bg = game.add.sprite(0, 0, 'backGround');
        
        // getCat hace un GET de la posición del gato, y UNA VEZ obtiene dicho dato (newCat)
        // crea el objeto game.cat donde irá el gato. Si no ponemos el callback, no daría
        // tiempo a que this.getCat trajera el dato de la posición del gato, y al crear
        // game.cat nos diría que es undefined.
        this.getCat(function (newCat) {
        	game.cat = game.add.sprite(newCat.x, newCat.y, 'cat');
            game.physics.enable(game.cat, Phaser.Physics.ARCADE);
            //console.log("CAT IS IN --> x: " + game.cat.x + ", y: " + game.cat.y);
        })
        
        catCatcher = game.add.sprite(game.player1.x, game.player1.y, 'catCatcher');
        game.physics.enable(catCatcher, Phaser.Physics.ARCADE);
        
        // Obtenemos la posición del jugador 2 y lo pintamos. No nos importa la física, ya que será
        // el otro jugador en su propia pantalla el que gestione dicho dato. Sólo necesitamos pintarlo
        // para verlo. Utilizamos un callback (player2Data) para que UNA VEZ tengamos la posición
        // del player 2, la pintemos en escenario y así evitar un undefined.
        this.getPlayer(function (player2Data) {
        	game.player2 = JSON.parse(JSON.stringify(player2Data));
        	catCatcher2 = game.add.sprite(game.player2.x, game.player2.y, 'catCatcher');
        	console.log(JSON.stringify(game.player2))
        })

        //Declaración de la variable para poder eliminarla adecuadamente
        //Pintamos puntuacion en la esquina superior derecha
        text = "Puntuacion: ";
        style = { font: "18px Arial", fill: "#FFFFFF", align: "center" };
        // Podríamos pintar también la puntuación de nuestro rival, pero para ello, tendríamos que tener cuidado
        // de no hacerlo "antes de tiempo" e incurrir en un undefined
        t = game.add.text(game.world.centerX-60, 0, text + game.player1.score, style);
    },

    update: function() {
        //Pulsar teclas:
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

        //Comprobamos colisión y activamos función de colisión en caso de true
        var colGato = game.physics.arcade.collide(catCatcher, game.cat);

        // Si hay colisión, recalcula marcadores, y pinta un nuevo gato. Si no,
        // actualiza la posición del gato, ya que pudiera ser que player 2 lo haya cazado
        if(colGato) {
        	game.cat.destroy();
        	game.player1.score++;
        	t.destroy();
            t = game.add.text(game.world.centerX-60, 0, text + game.player1.score, style);
            //Pasamos al estado ending si la puntuacion es 3. Da igual si es la del jugador 1 o el
            // jugador 2. Habría que definirlo en código, pero para el propósito del uso de API Rest
            // y por simplicidad del ejemplo, no nos importa.
            if(game.player1.score == 3 || game.player2.score == 3) { game.state.start('endingState'); }
            // llamada POST que devuelve la posición de un nuevo gato
            this.newCat();
        } else {
        	// llamada GET que UNA VEZ tiene la posición del gato del servidor, actualiza la posición. 
        	this.getCat(function (updateCat) {
        		game.cat.x = updateCat.x;
                game.cat.y = updateCat.y;
        	});
        }
        
        // Manda al servidor la posición actualizada de player 1 para que el otro jugador pueda actualizarla.
        this.putPlayer();
        
        // Obtiene mediante GET la posición de player 2. Usa un callback para que UNA VEZ tenga su posición,
        // pinte su ubicación.
        this.getPlayer( function (updatePlayer2) {
        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
        	catCatcher2.x = game.player2.x;
        	catCatcher2.y = game.player2.y;
        	catCatcher2.score = game.player2.score;
        	//console.log("Posicion de player 2: " + game.player2 + " actualizada");
        })
    },

    // Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2)
    getPlayer(callback) {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/game/' + game.player2.id,
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            game.player2 = JSON.parse(JSON.stringify(data));
            callback(data);
        })
    },
    
    // Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2
    putPlayer() {
    	game.player1.x = catCatcher.x;
    	game.player1.y = catCatcher.y;
        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/game/' + game.player1.id,
            data: JSON.stringify(game.player1),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
        	//console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
        })
    },
    
    getCat(callback) {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/cat',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            callback(data)
        })
    },
    
    // Al crear el nuevo gato, debemos volver a crear las físicas y el sprite asociado al gato.
    // Si no lo hiciéramos, corremos el peligro de que obtener la nueva posición del gato
    // del servidor, sea más lento que el game loop, y el jugador pueda apuntarse varias colisiones
    // con el gato.
    newCat: function () {
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/cat',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
        	game.cat = game.add.sprite(data.x, data.y, 'cat');
            game.physics.enable(game.cat, Phaser.Physics.ARCADE);
        })
    }
}

//Funciones globales de mi programa
