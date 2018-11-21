NoName.configState = function(game){

}

var info;

NoName.configState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);

        info = game.add.text(game.world.centerX-230, game.world.centerY-200, "Aquí va la configuración", {
            font: "50px Arial",
            fill: "#ff0044",
            align: "center"
        });

        //Menu button
        game.add.button(game.world.centerX-150, game.world.centerY+50, 'menu', backtomenu, this, 1, 0, 2);
    },

    update: function(){

    }
}

    function backtomenu(){
        game.state.start('menuState');
    }