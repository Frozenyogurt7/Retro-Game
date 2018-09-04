var drawBackground = function () {
    context.beginPath() //!important for performance. erases the already drawn pixels?
    context.fillStyle = '#191970'; //color blue
    context.fillRect(0, 0, 400, 284); //fill syle
    context.fillStyle = '#000000'; //new color black after first 
    context.fillRect(0, 284, 400, 283); //
    // image,x old, y old, width old, height old, x new, y new, width new, height new
    context.drawImage(sprites, 0, 0, 399, 113, 0, 0, 399, 113); // yelow on top of page
    context.drawImage(sprites, 0, 119, 399, 34, 0, 283, 400, 38); //lila between water and street
    context.drawImage(sprites, 0, 119, 399, 34, 0, 490, 400, 38); //lila at the beginnng



    for (i = 0; i < 5; i++) {
        context.beginPath()
        context.arc(27 + i * 85, 90, 10, 0, 2 * Math.PI); //water lily
        
        context.stroke(); //draw circle
        context.fillStyle = 'green';
        context.fill() //set green style of circles
    }

    drawLine(5, 460) //recursive function just because I can
    drawScore();


   


};
var drawScore = function(){


    context.font = 'bold 12pt arial';
    context.fillText('Score: ', 100, 550); //crate labels on the bottom
    context.fillText('Highscore: ', 240, 550);
    context.fillText(score+starScore, 155, 550);
    context.fillText(highscore[1].punkte, 330, 550);
    for (i = 0; i < lives; i++) {
        context.drawImage(sprites, 13, 334, 17, 23, 5 + i * 20, 538, 11, 15); //draw lives
    }

    for (i = 0; i < 5; i++) {
        if (win[i] == true) {
            context.drawImage(sprites, 12, 369, 23, 20, 15 + (i * 85), 82, 23, 20) //if player has one win the frog will be drawn all the time on the lilly
        }
    }

}

var drawLine = function (x, y) { //recursive function just because I can
    //draw the lines between the vehicles

    context.beginPath() //recursive function just because I can
    context.moveTo(x, y)
    context.lineTo(x + 30, y)
    context.strokeStyle = "white"
    context.lineWidth = 2;
    context.stroke()

    if (x < 326) {
        drawLine(x = x + 40, y = y) //selfcall of function for next line
        return;
    } else if (y > 355) {
        drawLine(x = 5, y = y - 35) //street finished next street line habe to be drawn
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
                context.drawImage(sprites, 45, 365, 23, 26, frog.x, frog.y, 23, 26); // draw frog upway
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