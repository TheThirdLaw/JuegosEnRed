NoName.menuState = function(game) {

}

var eKey;

NoName.menuState.prototype = {

    preload: function() {
        //Start Menu
        var text = "- CatCatcher -\n Pulse la tecla 'E' \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX-200, 0, text, style);
        this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    },

    create: function() {

    },

    update: function() {
        if(this.eKey.isDown){
            game.state.start('levelState');
        }
    }
}