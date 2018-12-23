NoName.creditosState = function(game){

}

var info;

NoName.configState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);
        game.add.tileSprite(0, 0, 800, 600, 'creditos');

        //Menu button
        game.add.button(500, 400, 'menu', backtomenu, this, 1, 0, 2);
    },

    update: function(){

    }
}

    function backtomenu(){
        game.state.start('menuState');
    }