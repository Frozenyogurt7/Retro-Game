(function(){


var spiel = document.getElementById('game');
var frog = {
    x:spiel.width / 2 -20,
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
    inter= setInterval(game_loop, 50);
    


    };

    var carpos = 0

var game_loop = function(){
    drawBackground();
    context.drawImage(sprites, 12, 369, 23, 17, frog.x , frog.y -40, 23, 17);
    drawCars()
    
    //console.log(carpos % spiel.width & "," &  "460")
    console.log(frog.y-50)
    if(carpos % spiel.width +10 >= frog.x && carpos % spiel.width <= frog.x && 460  == frog.y-50) {

        clearInterval(inter)
    }
}

var drawCars = function(){


    context.drawImage(sprites, 8, 265, 30, 22, carpos % spiel.width, 460, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, (carpos + 100 )% spiel.width, 460, 30, 22);       
    ///context.drawImage(sprites, 8, 265, 30, 22, (carpos + 200 )% spiel.width, 460, 30, 22); 
    //context.drawImage(sprites, 8, 265, 30, 22, (carpos + 300 )% spiel.width, 460, 30, 22); 

    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - (carpos % spiel.width), 420, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - ((carpos + 100) % spiel.width), 420, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - ((carpos + 200) % spiel.width), 420, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - ((carpos + 300) % spiel.width), 420, 30, 22);
   
    //context.drawImage(sprites, 8, 265, 30, 22, carpos % spiel.width, 380, 30, 22);
    
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - (carpos % spiel.width), 340, 30, 22);
    carpos = carpos + 2


}





    document.body.onkeydown = function(event){
        console.log(event)
       if(event.code=="ArrowUp" && frog.y -100 > 0){ 
        frog.y = frog.y - 35;

       }else if(event.code == "ArrowDown" && frog.y  < spiel.height){

        frog.y = frog.y + 35;
       }
       else if(event.code == "ArrowLeft"){
        frog.x = frog.x - 42;
        console.log("test")
       }
       else if(event.code == "ArrowRight"){
        frog.x = frog.x + 42;
       }
         
        
    };




})();
	
	
	

