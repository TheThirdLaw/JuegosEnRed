NoName.pregameState = function(game){

}
NoName.pregameState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.add.tileSprite(0, 0, 800, 600, 'background');
        game.add.tileSprite(13, 20, 774, 460, 'interfacecartas');
        game.add.button(710, 165, 'flechad', flechaD, this, 1, 0, 2);
        game.add.button(45, 165, 'flechai', flechaI, this, 1, 0, 2);
        game.add.button(100, 159, 'bomb', bomb, this, 1, 0, 2);
        game.add.button(256, 160, 'lightsout', lightsOut, this, 1, 0, 2);
        game.add.button(412, 159, 'morderbloq', morderbloq, this, 1, 0, 2);
        game.add.button(568, 159, 'salto', salto, this, 1, 0, 2);
        game.add.button(320, 483, 'playpregame', playPregame, this, 1, 0, 2);
    },

    update: function(){
        setTimeout(playPregame, 30000);
    }
}

function playPregame() {
    game.state.start('levelState');
}

function flechaD() {

}

function flechaI() {

}

function bomb() {

}

function lightsOut() {

}

function morderbloq() {

}

function salto() {

}

