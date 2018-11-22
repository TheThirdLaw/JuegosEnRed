NoName.pregameState = function(game){

}

var bombrsz;
var LOrsz;
var jumprsz;

var hasbomb;
var hasjump;
var haslight;

var time;

NoName.pregameState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.add.tileSprite(0, 0, 800, 600, 'background');
        game.add.tileSprite(13, 20, 774, 460, 'interfacecartas');
        game.add.button(710, 165, 'flechad', flechaD, this);
        game.add.button(45, 165, 'flechai', flechaI, this);
        game.add.button(100, 159, 'bomb', bomb, this);
        game.add.button(256, 160, 'lightsout', lightsOut, this);
        game.add.button(412, 159, 'morderbloq', morderbloq, this);
        game.add.button(568, 159, 'salto', salto, this);
        game.add.button(320, 483, 'playpregame', playPregame, this);
        time = game.time.events.add(Phaser.Timer.SECOND * 15, playPregame, this);

    },

    update: function(){

    }
}

function playPregame() {
    game.time.events.remove(time);
    game.state.start('matchState');
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
    hasbomb = false;
}

function outSprite2() {
    LOrsz.pendingDestroy = true;
    haslight = false;
}

function outSprite3() {
    jumprsz.pendingDestroy = true;
    hasjump = false;
}