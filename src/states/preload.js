NoName.preloadState = function(game) {

}

NoName.preloadState.prototype = {

    preload: function() {
        //Loading Text
        var text = "- Phaser -\n Cargando Assets.";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        var t = game.add.text(game.world.centerX-300, 0, text, style);

        //Load Assets
    },

    create: function() {
        game.state.start('menuState');
    },

    update: function() {

    }
}