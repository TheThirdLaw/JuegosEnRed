NoName.preloadState = function(game) {

}

NoName.preloadState.prototype = {

    preload: function() {

        //Load Assets
        game.load.image('background', 'assets/menu/rsz_backgroundtileable.png');
        game.load.spritesheet('settings', 'assets/botones 2.0/rsz_bconf.png', 142, 98);
        game.load.spritesheet('play', 'assets/botones 2.0/rsz_bplay.png', 247, 148);
        game.load.spritesheet('shop', 'assets/botones 2.0/rsz_bshop.png', 142, 98);
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