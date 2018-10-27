NoName.endState = function(game){

}

var info;

NoName.endState.prototype = {

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 800, 600);

        if(player.x < rival.x){
            info = game.add.text(game.world.centerX-230, game.world.centerY-200, "¡Has ganado!", {
                font: "65px Arial",
                fill: "#ff0044",
                align: "center"
            });
        }
        else if(rival.x < player.x){
            info = game.add.text(game.world.centerX-230, game.world.centerY-200, "Has perdido...", {
                font: "65px Arial",
                fill: "#ff0044",
                align: "center"
            });
        }

        
        game.add.button(game.world.centerX-150, game.world.centerY+50, 'play', backtomenu, this, 1, 0, 2);
    },

    update: function(){

    }
}

    function backtomenu(){
        game.state.start('menuState');
    }