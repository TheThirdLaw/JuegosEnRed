NoName.endState = function(game){

}
NoName.endState.prototype = {

    preload: function(){
        
    },

    create: function(){
        
        if(player.x < rival.x){
            console.log('El jugador 1 gana');
        }
        else if(rival.x < player.x){
            console.log('El jugador 1 pierde');
        }
    },

    update: function(){

    }
}