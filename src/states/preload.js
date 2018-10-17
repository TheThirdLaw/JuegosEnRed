NoName.preloadState = function(game) {

}

NoName.preloadState.prototype = {

    preload: function() {

        //Load Assets
        game.load.image('background', 'assets/menu/rsz_Background.png');
        game.load.image('settings', 'assets/menu/rsz_SettingsButton.png');
        game.load.image('play', 'assets/menu/rsz_PlayButton.png');
        game.load.image('shop', 'assets/menu/rsz_ShopButton.png');
        //Loading Text
        var text = "Cargando Assets...";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        var t = game.add.text(game.world.centerX-300, game.world.centerY, text, style);

    },

    create: function() {
        game.add.tileSprite(0, 0, 800, 600, 'background');
        game.state.start('menuState');
    },

    update: function() {

    }
}