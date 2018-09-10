window.onload = function(){
    var input = document.getElementById("rankingname");

    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13 && setHighscore==true) { // On Enter if new Highscore
            setName();
        }
    });

}


var drawBackground = function () {
    context.beginPath() //important for performance. erases the already drawn pixels
    context.fillStyle = '#191970'; //color blue
    context.fillRect(0, 0, 400, 284); //fill syle
    context.fillStyle = '#000000'; //new color black 
    context.fillRect(0, 284, 400, 283); 
    // image,x old, y old, width old, height old, x new, y new, width new, height new
    context.drawImage(sprites, 0, 0, 399, 113, 0, 0, 399, 113); // yellow on top of page
    context.drawImage(sprites, 0, 119, 399, 34, 0, 283, 400, 38); //purple between water and street
    context.drawImage(sprites, 0, 119, 399, 34, 0, 490, 400, 38); //purple at the beginnng



    for (i = 0; i < 5; i++) {
        context.beginPath()
        context.arc(27 + i * 85, 90, 10, 0, 2 * Math.PI); //water lily pad
                  //  (x,y,radius,startpoint, circumference)
        context.stroke(); //draw circle
        context.fillStyle = 'green';
        context.fill() //set green style of circles
    }

    drawLine(5, 460) //recursive function
    drawScore();


   


};
var drawScore = function(){


    context.font = 'bold 12pt arial';
    context.fillText('Score: ', 100, 550); //create labels on the bottom
    context.fillText('Highscore: ', 240, 550);
    context.fillText(score+starScore, 155, 550);
    context.fillText(highscore[1].punkte, 330, 550);
    for (i = 0; i < lives; i++) {
        context.drawImage(sprites, 13, 334, 17, 23, 5 + i * 20, 538, 11, 15); //draw lives
    }

    for (i = 0; i < 5; i++) {
        if (win[i] == true) {
            context.drawImage(sprites, 12, 369, 23, 20, 15 + (i * 85), 82, 23, 20) //if player has reached a lily it will remain on that spot
        }
    }

}

//draw the lines between the vehicles
var drawLine = function (x, y) { //recursive function 

    context.beginPath() //recursive function
    context.moveTo(x, y)
    context.lineTo(x + 30, y)
    context.strokeStyle = "white"
    context.lineWidth = 2;
    context.stroke()

    if (x < 326) {
        drawLine(x = x + 40, y = y) //selfcall of function for next line
        return;
    } else if (y > 355) {
        drawLine(x = 5, y = y - 35) //street finished next street line have to be drawn
    }

}

var drawFrog = function () {
    if (isPlayerAlive != false) {


        switch (frog.picture) { //draw frog on his position and direction , all pictures including way are for animation

            case "up":
                context.drawImage(sprites, 12, 369, 23, 20, frog.x, frog.y, 23, 20); // draw frog up
                break;
            case "down":
                context.drawImage(sprites, 80, 369, 23, 20, frog.x, frog.y, 23, 20); // draw frog down
                break;
            case "left":
                context.drawImage(sprites, 78, 337, 23, 20, frog.x, frog.y, 23, 20); // draw frog left
                break;
            case "right":
                context.drawImage(sprites, 12, 335, 23, 22, frog.x, frog.y, 23, 22); // draw frog right
                break;
            case "leftway":
                context.drawImage(sprites, 110, 338, 26, 22, frog.x, frog.y, 26, 22); // draw left way
                break;
            case "upway":
                context.drawImage(sprites, 45, 365, 23, 26, frog.x, frog.y, 23, 26); // draw frog up way
                break;
            case "rightway":
                context.drawImage(sprites, 43, 335, 26, 22, frog.x, frog.y, 26, 22); // draw right way
                break;
            case "downway":
                context.drawImage(sprites, 115, 365, 25, 26, frog.x, frog.y, 25, 26); // draw down way
                break;
        }
    } else {
        context.drawImage(deadSprite, 0, 0, 30, 30, frog.x, frog.y - 10, 30, 30);
        //if not alive draw dead on position
    }
}

var Star = function(){
    //Place star on a random position on the playing field
    this.x= Math.round(Math.random()* 360 +20)//20 to 380
    this.y=Math.round(Math.random()* 370 +100) // 100 to 470

    this.newStar = function(){
        this.x= Math.round(Math.random()* 360 +20)//20 to 380
        this.y=Math.round(Math.random()* 370 +100) // 100 to 470

    }
    this.drawStar = function(){
  
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x+2.5,this.y+5);
        context.lineTo(this.x+7.5,this.y+5);
    
        context.lineTo(this.x+2.5,this.y+10);
        context.lineTo(this.x+5,this.y+15);
        context.lineTo(this.x,this.y+12.5);
        context.lineTo(this.x-5,this.y+15);
        context.lineTo(this.x-2.5,this.y+10);
        context.lineTo(this.x-7.5,this.y+5);
    
        context.lineTo(this.x-7.5,this.y+5);
        context.lineTo(this.x-2.5,this.y+5);
        context.lineTo(this.x,this.y);
    
        context.strokeStyle="yellow"
        context.fillStyle = 'yellow';
        context.fill()
        context.stroke();
        
    }
}


// Draw the final screen on game end
var drawStop =  function(winlose){
      context.globalAlpha = 0.5;
     context.fillStyle = "black"
     context.fillRect(0,0,400,560);  //background getting transparent and
     context.globalAlpha =1;
     
     context.font = 'bold 72pt arial';
     context.fillStyle =  '#FFFFFF';
     if (winlose=="lose"){
        context.fillText('GAME', 60, 150);  //game over screen
        context.fillText('OVER', 60, 300);
     }else{
        context.fillText('Won', 60, 150);  //win screen
        context.fillText('Game', 60, 300);
     }
     document.getElementById("rankingname").style.display="block"
     document.getElementById("highscoreInfo").style.display="block"
     document.getElementById("enterMessage").style.display="block"
     setHighscore=true
}


var setName= function(){

    var name =  document.getElementById("rankingname").value;       //get input field value
 
    if(name.length<12){     //if text is short enough
        sort(name);
        //set highscore
        
        localStorage.setItem("highscore", JSON.stringify(highscore));       //write highscore in local Stroage
        score = 0               //reset variables
        starScore=0
        lives = 4
        drawScore();
        deathMenu();

        document.getElementById("rankingname").style.display="none"     //disable input fields
        document.getElementById("highscoreInfo").style.display="none"
        document.getElementById("enterMessage").style.display="none"
       
        setHighscore=false      //block event Listener
        document.getElementById("rankingname").value=""     //reset Inputs
        document.getElementById("highscoreInfo").innerHTML="Bitte gib deinen Namen ein (Max 11 Zeichen)"
    }else{
        document.getElementById("highscoreInfo").innerHTML="Neue Eingabe: Name zu lang (Max 11 Zeichen)" //Error Message
    }

   }



    


    