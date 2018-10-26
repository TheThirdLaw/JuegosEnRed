NoName.menuState = function(game) {

}

NoName.menuState.prototype = {

    preload: function() {
        //Start Menu
        var text = "Pulsa E";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX-200, 0, text, style);
        this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    },

    create: function() {
        game.add.tileSprite(0, 0, 800, 600, 'background');
        game.add.tileSprite(0, 0, 800, 600, 'title');
        game.add.button(100, 200, 'play', playButton, this, 1, 0, 2);
        game.add.button(101, 370, 'settings', settingsButton, this, 1, 0, 2);
        game.add.button(245, 370, 'shop', shopButton, this, 1, 0, 2);
    },

    update: function() {

    }
}

function playButton() {
    game.state.start('levelState');
}

function shopButton() {

}

function settingsButton() {

}