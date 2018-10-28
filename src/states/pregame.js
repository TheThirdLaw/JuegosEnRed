NoName.pregameState = function(game){

}

var bombrsz;
var LOrsz;
var jumprsz;

var hasbomb;
var hasjump;
var haslight;

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
    game.state.start('countState');
}

function flechaD() {

}

function flechaI() {

}

function bomb() {
    bombrsz = game.add.button(283, 352, 'bomb', outSprite1, this);
    bombrsz.scale.setTo(0.535);
    hasbomb = true;
}

function lightsOut() {
    LOrsz = game.add.button(365, 353, 'lightsout', outSprite2, this);
    LOrsz.scale.setTo(0.535);
    haslight = true;
}

function morderbloq() {

}

function salto() {
    jumprsz = game.add.button(447, 352, 'salto', outSprite3, this);
    jumprsz.scale.setTo(0.535);
    hasjump = true;
}

function outSprite1() {
    bombrsz.pendingDestroy = true;
}

function outSprite2() {
    LOrsz.pendingDestroy = true;
}

function outSprite3() {
    jumprsz.pendingDestroy = true;
}