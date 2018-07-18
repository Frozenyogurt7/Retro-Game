

//get Canvas
var spiel = document.getElementById('game');
var context = spiel.getContext('2d');

//localStorage.setItem('highscore',0)
//console.log(localStorage.getItem('highscore'))      //personal highscore!?



//frog json
var frog = {
    x: spiel.width / 2 - 15,
    y: spiel.height - 55,
    picture: 0
};

var plane = []
var vehicle = []
var gameStatus = true
var lives = 4

try{
    
    highscore = localStorage.getItem('highscore')
    if(highscore == null){
        highscore = 0
    }
}catch(exception){
    highscore = 0
}



var score = 0
//set images
sprites = new Image();
sprites.src = 'assets/frogger.png';
sprites.onload = function () { //after images are load

    deadSprite = new Image()
    deadSprite.src = 'assets/dead_frog.png'




    //Create Cars
    for (i = 0; i < 3; i++) {
        vehicle[i] = new gameObject(50 * i, 460, "pink car", 4, "right")

    }
    for (i = 3; i < 5; i++) {
        vehicle[i] = new gameObject(50 * i, 428, "red car", 6, "left")
    }

    for (i = 5; i < 7; i++) {
        vehicle[i] = new gameObject(50 * i, 396, "white LKW", 4, "right", 1.2)

    }
    for (i = 7; i < 11; i++) {
        vehicle[i] = new gameObject(40 * (i-4), 364, "bagger", 4, "left")

    }
    for (i = 11; i < 13; i++) {
        vehicle[i] = new gameObject(40 * (i-6), 332, "blue car", 4, "right")

    }
    for (x = 0; x < 2; x++) {
        plane[x] = new gameObject(120 * x, 250, "wood line", 4, "left", 4)
    }
    for (x = 2; x < 4; x++) {
        plane[x] = new gameObject(120 * (x - 2), 220, "wood line", 3, "right", 4)
    }

    loop = setInterval(game_loop, 16); //loop //85 mileseconds = ~  30 FPS (motion human able to see)

};



//-----------------------loop event---------------------------

var game_loop = function () {
    context.beginPath()

    drawBackground();


    for (x = 0; x < Object.keys(plane).length; x++) {

        plane[x].move();
        if (plane[x].checkOn()) {

            plane[x].direction == "left" ? frog.x = frog.x + plane[x].speed : frog.x = frog.x - plane[x].speed
        }


    }


    for (i = 0; i < Object.keys(vehicle).length; i++) {
        vehicle[i].move(); //loop through all cars
        if (vehicle[i].checkOn()) {
            dead();
        }
    }


    if (checkWater()) {
        var bool = false
        for (i = 0; i < Object.keys(plane).length; i++) {
            //every
            if (plane[i].checkOn() && !bool) {
                bool = true
                break;
            } else {
                bool = false
            }
        }
        if (!bool) {
            dead()
        }


    }






    drawFrog(); //have to be on the end because on top of all images
}

//----------------------------draw background------------ 

var drawBackground = function () {
    context.fillStyle = '#191970'; //color
    context.fillRect(0, 0, 399, 284); //fill syle
    context.fillStyle = '#000000'; //new color after first 
    context.fillRect(0, 284, 399, 283); //fill style
    // image,x old, y old, width old, height old, x new, y new, width new, height new
    context.drawImage(sprites, 0, 0, 399, 113, 0, 0, 399, 113); // lila on top of page
    context.drawImage(sprites, 0, 119, 399, 34, 0, 283, 399, 34); //lila between water and street
    context.drawImage(sprites, 0, 119, 399, 34, 0, 495, 399, 34); //lila at the beginning

    context.arc(112, 90, 10, 0, 2 * Math.PI); //water lily
    context.stroke();
    context.fillStyle = 'green';
    context.fill()

    context.font = 'bold 12pt arial';
    context.fillText('Score: ', 100, 550);
    context.fillText('Highscore: ', 240, 550);
    context.fillText(score, 155 , 550);
    context.fillText(highscore, 330 , 550);
    
    

    for (i = 0; i < lives; i++) {
        context.drawImage(sprites, 13, 334, 17, 23, 5 + i * 20, 538, 11, 15);
    }


};

var drawFrog = function () {
    if (gameStatus != false) {


        switch (frog.picture) {
            case 0:
                context.drawImage(sprites, 12, 369, 23, 20, frog.x, frog.y, 23, 20); // draw frog up
                break;
            case 1:
                context.drawImage(sprites, 80, 369, 23, 20, frog.x, frog.y, 23, 20); // draw frog down
                break;
            case 2:
                context.drawImage(sprites, 75, 337, 23, 20, frog.x, frog.y, 23, 20); // draw frog left
                break;
            case 3:
                context.drawImage(sprites, 12, 335, 23, 22, frog.x, frog.y, 23, 22); // draw frog right
                break;
        }
    } else {
        context.drawImage(deadSprite, 0, 0, 40, 30, frog.x, frog.y - 10, 40, 30);
    }
}

var checkWater = function () {
    if (frog.y <= spiel.height / 2) {
        return true
    }
}


//---------------keydown event------------------------

document.body.onkeydown = function (event) {
    console.log(frog.y)
    if (gameStatus != false) { //if crashed then press key to reload
        if (event.keyCode == 38 && frog.y - 100 > 0) {
            frog.picture = 0; //frog up
            frog.y = frog.y - 35;
     
            if((505 - frog.y) / 35 *100 > score){
            
                score = (505 - frog.y) / 35 *100 
               
            } 
        } else if (event.keyCode == 40 && frog.y < spiel.height - 80) {
            frog.picture = 1; //frog down
            frog.y = frog.y + 35;
        } else if (event.keyCode == 37 && frog.x > 40) {
            frog.picture = 2; //frog left
            frog.x = frog.x - 42;
        } else if (event.keyCode == 39 && frog.x < spiel.width - 50) {
            frog.picture = 3; //frog right
            frog.x = frog.x + 42;
        }
    } else {
        gameStatus = true
        frog = frog = {
            x: spiel.width / 2 - 15,
            y: spiel.height - 55,
            picture: 0
        };
        loop = setInterval(game_loop, 16)
    }

};



//-----------------------------------------classes-----------------




var gameObject = function (x, y, vehicle, speed, direc, length) { //parameter x y bzw row and speed have to be given
    this.x = x
    this.y = y
    this.vehicle = vehicle
    this.speed = speed
    this.direction = direc
    this.lenght = length || 1


    this.move = function () {

        switch (this.direction) {
            case "left":

                this.x <= spiel.width + this.lenght * 20 ? this.x = (this.x + this.speed) : this.x = -this.lenght * 20; //move right
                break;
            case "right":
                this.x >= (-20 * this.lenght) ? this.x = (this.x - this.speed) : this.x = spiel.width + this.lenght * 20; //move left
        }


        switch (this.vehicle) { //draw objects
            case "pink car":
                context.drawImage(sprites, 8, 265, 30, 22, this.x, this.y, 30, 22); //green car
                break;
            case "red car":
                context.drawImage(sprites, 44, 265, 30, 22, this.x, this.y, 30, 22); //red car
                break;
            case "white LKW":
                context.drawImage(sprites, 100, 300, 60, 22, this.x, this.y, 60, 22); //LKW
                break;
            case "bagger":
                context.drawImage(sprites, 8, 300, 30, 22, this.x, this.y, 32, 22); //bagger
                break;
            case "blue car":
                context.drawImage(sprites, 82, 265, 32, 24, this.x, this.y, 36, 24); //blue car
                break;
            case "wood line":
                context.drawImage(sprites, 10, 225, 85, 28, this.x, this.y, 85, 28); //wood
                break;
            case "crocodile":
                context.drawImage(sprites, 155, 370, 90, 25, this.x, this.y, 90, 25); //crocodile
                break;
                
          
                

        }

    }
    this.checkOn = function () {

        if (frog.x + 10 >= this.x && frog.x - 10 <= this.x + this.lenght * 20 && frog.y <= this.y + 10 && frog.y >= this.y - 10) {
            //true if frog in hitbox
            return true

        }


    }
}

var dead = function () {
    gameStatus = false
    lives = lives - 1
    clearInterval(loop)
    if (lives == 0) {
        
        alert("lose game")
        if(highscore<score){
           
            localStorage.setItem('highscore',score.toString())
            highscore=score
            
        }
        score =0
        lives = 4
     
    }
}