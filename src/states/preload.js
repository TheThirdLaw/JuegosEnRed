NoName.preloadState = function(game) {

}

NoName.preloadState.prototype = {

    preload: function() {

        //Load Assets
        game.load.image('background', 'assets/menu/rsz_backgroundtileable.png');
        game.load.spritesheet('settings', 'assets/botones 2.0/rsz_bconf.png', 143, 98);
        game.load.spritesheet('play', 'assets/botones 2.0/rsz_bplay.png', 249, 149);
        game.load.spritesheet('shop', 'assets/botones 2.0/rsz_bshop.png', 143, 99);
        game.load.image('title', 'assets/menu/rsz_Title.png');

        game.load.spritesheet('playpregame', 'assets/botones 2.0/rsz_bplaypregame.png', 160, 96);
        game.load.image('bomb', 'assets/botones 2.0/rsz_bbomba.png');
        game.load.image('flechad', 'assets/botones 2.0/rsz_bflechadcha.png');
        game.load.image('flechai', 'assets/botones 2.0/rsz_bflechaizq.png');
        game.load.image('lightsout', 'assets/botones 2.0/rsz_bfundidonegro.png');
        game.load.image('morderbloq', 'assets/botones 2.0/rsz_bmorderbloq.png');
        game.load.image('interfacecartas', 'assets/botones 2.0/rsz_bniinterfacecartas.png');
        game.load.image('salto', 'assets/botones 2.0/rsz_bsalto.png');
        game.load.spritesheet('menu', 'assets/botones 2.0/rsz_bmenu.png', 249, 149);        

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