NoName.countState = function(game){

}

var txt;
var cont = 3;

NoName.countState.prototype = {

    preload: function(){
        
    },

    create: function(){
        txt = game.add.text(game.world.centerX-300, game.world.centerY-100, "¡Te toca perseguir!\n 3", {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });

        game.time.events.loop(Phaser.Timer.SECOND, countdown, this);
    },

    update: function(){
    }
}

function countdown(){
    if(cont > 1){
        cont--;
        txt.setText('¡Te toca perseguir!\n' +cont);
    }else{
        game.state.start('levelState');
    }
    
}