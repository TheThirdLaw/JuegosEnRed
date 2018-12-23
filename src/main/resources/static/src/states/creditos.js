NoName.creditosState = function(game){

}

NoName.creditosState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);
        game.add.tileSprite(0, 0, 800, 600, 'creditos');

        //Menu button
        menuB = game.add.button(625, 475, 'menu', backtomenu, this, 1, 0, 2);
        menuB.scale.setTo(0.5, 0.5);
    },

    update: function(){

    }
}

    function backtomenu(){
        game.state.start('menuState');
    }