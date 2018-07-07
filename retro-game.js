(function(){


var spiel = document.getElementById('game');
var frog = {
    x:spiel.width,
    y:spiel.height -15
    };
var context = spiel.getContext('2d');

var drawBackground = function() {
    context.fillStyle='#191970'; //color
    context.fillRect(0,0,399,284);  //fill syle
    context.fillStyle='#000000';       //new color after first 
    context.fillRect(0,284,399,283);    //fill style
                    // image,x old, y old, width old, height old, x new, y new, width new, height new
    context.drawImage(sprites, 0, 0, 399, 113, 0, 0, 399, 113);
    context.drawImage(sprites, 0, 119, 399, 34, 0, 283, 399, 34);
    context.drawImage(sprites, 0, 119, 399, 34, 0, 495, 399, 34);
   
  
};

    sprites = new Image();
    sprites.src = 'assets/frogger.png'; 
    sprites.onload = function() {
    setInterval(game_loop, 50);
    };


var game_loop = function(){
    drawBackground();
    context.drawImage(sprites, 12, 369, 23, 17, frog.x / 2 -20, frog.y -40, 23, 17);

}

    document.body.onkeydown = function(event){
       if(event.code=="ArrowUp"){
        frog.y = frog.y - 50;
       }else if(event.code == "ArrowDown"){
        frog.y = frog.y + 50;
       }
       else if(event.code == "ArrowLeft"){
        frog.x = frog.x - 50;
       }
       else if(event.code == "ArrowRight"){
        frog.x = frog.x + 50;
       }
         
        
    };




})();
	
	
	

