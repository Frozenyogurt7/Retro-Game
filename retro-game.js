

//get Canvas
var spiel = document.getElementById('game');
var context = spiel.getContext('2d');


//set images
    sprites = new Image();
    sprites.src = 'assets/frogger.png'; 
    sprites.onload = function() {       //after images are load

for(i=0;i<3;i++){
car[i] = new car(50*i,0,5)

}
for(i=3;i<5;i++){
   car[i] = new car(50*i,1,10)
}
   
    inter= setInterval(game_loop, 85);      //loop //85 mileseconds = ~ 12 FPS (motion human able to see)
    


    };



//-----------------------loop event---------------------------

var game_loop = function(){

    drawBackground();
    context.drawImage(sprites, 12, 369, 23, 17, frog.x , frog.y, 23, 17);
    
    for(i=0;i<5;i++){
    car[i].move();                //loop through all cars
    car[i].checkCrash();
    }
  
      //  clearInterval(inter)
   
}

//----------------------------draw background------------

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



//---------------keydown event------------------------

    document.body.onkeydown = function(event){
      
       if(event.keyCode==38 && frog.y -100 > 0){ 
        frog.y = frog.y - 35;

       }else if(event.keyCode == 40 && frog.y  < spiel.height -80){
        console.log(frog.y)
        frog.y = frog.y + 35;
       }
       else if(event.keyCode == 37){
        frog.x = frog.x - 42;
       }
       else if(event.keyCode == 39){
        frog.x = frog.x + 42;
       }
         
        
    };






    //-----------------------------------------classes-----------------



    class car{
        

          
        constructor(x,row,speed){      //parameter x y bzw row and speed have to be given
            this.x = x
            this.row = row
            this.y = 460 - row * 30
            this.speed = speed
                       
            
            
        }
    
        move(){
           
            this.x <= spiel.width + 20 ? this.x = (this.x + this.speed) : this.x = -20;
          
            switch(this.row){
                case 0:context.drawImage(sprites, 8, 265, 30, 22, this.x, this.y, 30, 22);
                        break;
                case 1:context.drawImage(sprites, 44, 265, 30, 22, this.x , this.y, 30, 22);
                        break;
            }
            
        }
        checkCrash(){
           
            //if in hitbox of frog alert crash
            if(frog.x+10 >= this.x && frog.x-10 <= this.x && frog.y <= this.y +10 && frog.y >= this.y -10 ){
                alert("crash");
            }

        }
    
        }


        var frog = {
            x:spiel.width / 2 -15,
            y:spiel.height -55
            };






	
	
	





//-----------------------cars

//context.drawImage(sprites, 8, 265, 30, 22, (carpos + 100 )% spiel.width, 460, 30, 22);       
    ///context.drawImage(sprites, 8, 265, 30, 22, (carpos + 200 )% spiel.width, 460, 30, 22); 
    //context.drawImage(sprites, 8, 265, 30, 22, (carpos + 300 )% spiel.width, 460, 30, 22); 

    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - (carpos % spiel.width), 420, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - ((carpos + 100) % spiel.width), 420, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - ((carpos + 200) % spiel.width), 420, 30, 22);
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - ((carpos + 300) % spiel.width), 420, 30, 22);
   
    //context.drawImage(sprites, 8, 265, 30, 22, carpos % spiel.width, 380, 30, 22);
    
    //context.drawImage(sprites, 8, 265, 30, 22, spiel.width - (carpos % spiel.width), 340, 30, 22);