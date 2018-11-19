game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')

var odioJS;

game.global = {
	player1: null,
	player2: null,
	cat: null,
	numPlayers: 0
}

game.state.add('bootState', CatCatcher.bootState)
game.state.add('preloadState', CatCatcher.preloadState)
game.state.add('menuState', CatCatcher.menuState)
game.state.add('matchmakingState', CatCatcher.matchmakingState)
game.state.add('levelState', CatCatcher.levelState)
game.state.add('endingState', CatCatcher.endingState)
  
game.state.start('bootState')
