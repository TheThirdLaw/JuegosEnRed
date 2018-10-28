NoName.tieState = function(game){

}

var tie;

NoName.tieState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);

        //Tie
        tie = game.add.text(game.world.centerX-300, game.world.centerY-200, "Ha habido un empate", {
            font: "65px Arial",
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