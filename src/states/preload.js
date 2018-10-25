NoName.preloadState = function(game) {

}

NoName.preloadState.prototype = {

    preload: function() {

        //Load Assets
        game.load.image('background', 'assets/menu/rsz_Background.png');
        game.load.image('settings', 'assets/botones 2.0/rsz_bconfreposo.png');
        game.load.image('play', 'assets/botones 2.0/rsz_bplayreposo.png');
        game.load.image('shop', 'assets/botones 2.0/rsz_bshopreposo.png');
        game.load.image('title', 'assets/menu/rsz_Title.png');

        game.load.image('example_char', 'assets/personajes 2.0/P1aA.png');
        game.load.image('example_enem', 'assets/personajes 2.0/P1nA.png');

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