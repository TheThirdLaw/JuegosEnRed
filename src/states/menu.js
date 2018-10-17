NoName.menuState = function(game) {

}

var eKey;

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
        game.add.tileSprite(0, 0, 800, 600, 'settings');
        game.add.tileSprite(0, 0, 800, 600, 'play');
        game.add.tileSprite(0, 0, 800, 600, 'shop');
    },

    update: function() {
        if(this.eKey.isDown){
            game.state.start('levelState');
        }
    }
}