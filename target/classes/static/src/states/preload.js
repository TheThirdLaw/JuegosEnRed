NoName.preloadState = function(game) {

}

NoName.preloadState.prototype = {

    preload: function() {

        //Load Assets
        game.load.image('background', 'assets/menu/rsz_backgroundtileable.png');
        game.load.image('lvlbackground', 'assets/images/rsz_lv_back.png');
        game.load.image('lvlground', 'assets/images/rsz_lv_ground.png');
        game.load.image('loading', 'assets/images/rsz_loading.png');
        game.load.image('match', 'assets/images/rsz_esperandojugador.png');
        game.load.spritesheet('settings', 'assets/botones 2.0/rsz_bconf.png', 143, 98);
        game.load.spritesheet('play', 'assets/botones 2.0/rsz_bplay.png', 249, 149);
        game.load.spritesheet('shop', 'assets/botones 2.0/rsz_bshop.png', 143, 99);
        game.load.image('title', 'assets/menu/rsz_Title.png');
        game.load.image('blackscreen', 'assets/images/blackscreen.png');
        game.load.image('settingsscreen', 'assets/images/rsz_bniinterfaceajustes.png');
        game.load.image('shopscreen', 'assets/images/rsz_bniinterfaceshop.png');
        game.load.image('creditos', 'assets/images/rsz_creditos.png');
        game.load.spritesheet('credsbutton', 'assets/botones 2.0/rsz_bcreditos.png', 270, 177);

        game.load.spritesheet('playpregame', 'assets/botones 2.0/rsz_bplaypregame.png', 160, 96);
        game.load.image('bomb', 'assets/botones 2.0/rsz_bbomba.png');
        game.load.image('flechad', 'assets/botones 2.0/rsz_bflechadcha.png');
        game.load.image('flechai', 'assets/botones 2.0/rsz_bflechaizq.png');
        game.load.image('lightsout', 'assets/botones 2.0/rsz_bfundidonegro.png');
        game.load.image('morderbloq', 'assets/botones 2.0/rsz_bmorderbloq.png');
        game.load.image('interfacecartas', 'assets/botones 2.0/rsz_bniinterfacecartas.png');
        game.load.image('salto', 'assets/botones 2.0/rsz_bsalto.png');
        game.load.image('powers', 'assets/botones 2.0/rsz_bnicartas.png');
        game.load.spritesheet('menu', 'assets/botones 2.0/rsz_bmenu.png', 249, 149);        

        game.load.image('example_char', 'assets/personajes 2.0/P1aA.png');
        game.load.image('example_enem', 'assets/personajes 2.0/P1nA.png');
        game.load.image('trap', 'assets/personajes 2.0/P1vA.png');

        //Piedras
        game.load.image('Pi1', 'assets/scenarios/piedras/Pi1.png');
        game.load.image('Pi2', 'assets/scenarios/piedras/Pi2.png');
        game.load.image('Pi3', 'assets/scenarios/piedras/Pi3.png');
        game.load.image('Pi4', 'assets/scenarios/piedras/Pi4.png');
        game.load.image('Pi5', 'assets/scenarios/piedras/Pi5.png');
        game.load.image('Pi6', 'assets/scenarios/piedras/Pi6.png');
        game.load.image('Pi7', 'assets/scenarios/piedras/Pi7.png');
        game.load.image('Pi8', 'assets/scenarios/piedras/Pi8.png');
        game.load.image('Pi9', 'assets/scenarios/piedras/Pi9.png');
        game.load.image('Pi10', 'assets/scenarios/piedras/Pi10.png');
        game.load.image('Pi11', 'assets/scenarios/piedras/Pi11.png');
        game.load.image('Pi12', 'assets/scenarios/piedras/Pi12.png');
        game.load.image('Pi13', 'assets/scenarios/piedras/Pi13.png');
        game.load.image('Pi14', 'assets/scenarios/piedras/Pi14.png');

        //Hierbas
        game.load.image('Hi1', 'assets/scenarios/hierbas/Hi1.png');
        game.load.image('Hi2', 'assets/scenarios/hierbas/Hi2.png');
        game.load.image('Hi3', 'assets/scenarios/hierbas/Hi3.png');
        game.load.image('Hi4', 'assets/scenarios/hierbas/Hi4.png');
        game.load.image('Hi5', 'assets/scenarios/hierbas/Hi5.png');
        game.load.image('Hi6', 'assets/scenarios/hierbas/Hi6.png');
        game.load.image('Hi7', 'assets/scenarios/hierbas/Hi7.png');
        game.load.image('Hi8', 'assets/scenarios/hierbas/Hi8.png');
        game.load.image('Hi9', 'assets/scenarios/hierbas/Hi9.png');
        game.load.image('Hi10', 'assets/scenarios/hierbas/Hi10.png');
        game.load.image('Hi11', 'assets/scenarios/hierbas/Hi11.png');
        game.load.image('Hi12', 'assets/scenarios/hierbas/Hi12.png');
        game.load.image('Hi13', 'assets/scenarios/hierbas/Hi13.png');
        game.load.image('Hi14', 'assets/scenarios/hierbas/Hi14.png');
        
        //Loading Text
    },

    create: function() {
        game.add.tileSprite(0, 0, 800, 600, 'loading');
        game.state.start('menuState');
    },

    update: function() {

    }
}