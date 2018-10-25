game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', NoName.bootState)
game.state.add('preloadState', NoName.preloadState)
game.state.add('menuState', NoName.menuState)
game.state.add('levelState', NoName.levelState)
game.state.add('endState', NoName.endState)
  
game.state.start('bootState')
