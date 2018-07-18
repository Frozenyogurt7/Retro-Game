//get Canvas
var spiel = document.getElementById('game');
var context = spiel.getContext('2d');

//localStorage.setItem('highscore',0)
//console.log(localStorage.getItem('highscore'))      //personal highscore!?
var theme = document.createElement('audio');
theme.setAttribute('src', 'assets/musik.mp3');
theme.setAttribute('loop', 'true');

var jumpSound = document.createElement('audio');
jumpSound.setAttribute('src', 'assets/jump3.mp3');
areSoundsActive = true
theme.play();

//frog json
var frog = {
    x: spiel.width / 2 - 15,
    y: spiel.height - 55,
    picture: "up"
};

var plane = []
var vehicle = []
var isPlayerAlive = true
var lives = 4
var music = true

try {

    highscore = localStorage.getItem('highscore')
    if (highscore == null) {
        highscore = 0
    }
} catch (exception) {
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
        vehicle[i] = new gameObject(50 * i, 465, "pink car", 4, "right")

    }
    for (i = 3; i < 5; i++) {
        vehicle[i] = new gameObject(50 * i, 432, "red car", 6, "left")
    }

    for (i = 5; i < 7; i++) {
        vehicle[i] = new gameObject(50 * i, 396, "white LKW", 4, "right", 1.2)

    }
    for (i = 7; i < 11; i++) {
        vehicle[i] = new gameObject(40 * (i - 4), 360, "bagger", 4, "left")

    }
    for (i = 11; i < 13; i++) {
        vehicle[i] = new gameObject(40 * (i - 6), 325, "blue car", 4, "right")

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



    if (checkWater() && !frog.picture.includes("way")) {
        var isPlayerOnSafeObject = false
        for (i = 0; i < Object.keys(plane).length; i++) {
            //every
            if (plane[i].checkOn() && !isPlayerOnSafeObject) {
                isPlayerOnSafeObject = true
                break;
            } else {
                isPlayerOnSafeObject = false
            }
        }
        if (!isPlayerOnSafeObject) {
            dead()
        }


    }

    if ((505 - frog.y) / 35 * 100 > score && !frog.picture.includes("way")) {
        score = (505 - frog.y) / 35 * 100 //new score  
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
    context.drawImage(sprites, 0, 0, 399, 113, 0, 0, 399, 113); // yelow on top of page
    context.drawImage(sprites, 0, 119, 399, 34, 0, 283, 400, 38); //lila between water and street
    context.drawImage(sprites, 0, 119, 399, 34, 0, 490, 400, 38); //lila at the beginning

    for (i = 0; i < 5; i++) {
        context.beginPath()
        context.arc(27 + i * 85, 90, 10, 0, 2 * Math.PI); //water lily
        context.stroke();
        context.fillStyle = 'green';
        context.fill()
    }

    drawLine(5, 460)        //recursive function just because I can
  


    context.font = 'bold 12pt arial';
    context.fillText('Score: ', 100, 550);
    context.fillText('Highscore: ', 240, 550);
    context.fillText(score, 155, 550);
    context.fillText(highscore, 330, 550);
    for (i = 0; i < lives; i++) {
        context.drawImage(sprites, 13, 334, 17, 23, 5 + i * 20, 538, 11, 15);
    }


};

var drawLine = function (x, y) {        

    context.beginPath()     //recursive function just because I can
    context.moveTo(x, y)
    context.lineTo(x + 30, y)
    context.strokeStyle = "white"
    context.stroke()

    if (x < 326) {
        drawLine(x = x + 40, y = y)
        return;
    } else if (y > 355) {
        drawLine(x = 5, y = y - 35)
    }

}


var drawFrog = function () {
    if (isPlayerAlive != false) {

        
        switch (frog.picture) {
            
            case "up":
                context.drawImage(sprites, 12, 369, 23, 20, frog.x, frog.y, 23, 20); // draw frog up
                break;
            case "down":
                context.drawImage(sprites, 80, 369, 23, 20, frog.x, frog.y, 23, 20); // draw frog down
                break;
            case "left":
                context.drawImage(sprites, 75, 337, 23, 20, frog.x, frog.y, 23, 20); // draw frog left
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
    }
}

var checkWater = function () {
    if (frog.y <= spiel.height / 2) {
        return true
    }
}


//---------------keydown event------------------------

document.body.onkeydown = async function (event) { //async because we want to await

    if (isPlayerAlive != false) { //if crashed then press key to reload
        playSound()
        if (event.keyCode == 38 && frog.y - 100 > 0) { //move and change picture while jumping 100 ms
            
            frog.picture = "upway"; //frog up
            frog.y = frog.y - 25;
            await sleep(100)
            frog.picture = "up"; //frog left
            frog.y = frog.y - 10;

        } else if (event.keyCode == 40 && frog.y < spiel.height - 80) {
            frog.picture = "downway"; //frog down
            frog.y = frog.y + 20;
            await sleep(100)
            frog.picture = "down"; //frog left
            frog.y = frog.y + 15;

        } else if (event.keyCode == 37 && frog.x > 40) {
            frog.picture = "leftway"; //frog left
            frog.x = frog.x - 21;
            await sleep(100)
            frog.picture = "left"; //frog left
            frog.x = frog.x - 21;

        } else if (event.keyCode == 39 && frog.x < spiel.width - 50) {
            frog.picture = "rightway"; //frog right
            frog.x = frog.x + 21;
            await sleep(100)
            frog.picture = "right"; //frog left
            frog.x = frog.x + 21;
        }
    } else {
        isPlayerAlive = true
        frog = frog = {
            x: spiel.width / 2 - 15,
            y: spiel.height - 55,
            picture: "up"
        };
        loop = setInterval(game_loop, 16)
    }

};

//sleep function returns and promise after x miliseconds so a async function can wait while executing
var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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
    isPlayerAlive = false
    lives = lives - 1
    clearInterval(loop)
    if (lives == 0) {

        alert("lose game")
        if (highscore < score) {

            localStorage.setItem('highscore', score.toString())
            highscore = score

        }
        score = 0
        lives = 4

    }
}

var musicOff = function(){
    var musicButton = document.getElementById("musicBtn")
    if(music==true){
        theme.pause()
        musicButton.innerHTML = "Music an"
        music = false
    }else{
        theme.play()
        musicButton.innerHTML = "Music aus"
        music = true
    }



}

var playSound = function(){
    console.log("play")
    if(areSoundsActive == true){
        console.log("play2")
        jumpSound.load()
        jumpSound.play()
    }
   

}
var soundsOff = function(){
    var soundsButton = document.getElementById("soundsBtn")
   if(areSoundsActive==true){
        areSoundsActive = false 
        soundsButton.innerHTML="Sounds an"
   }else{
        areSoundsActive = true
        soundsButton.innerHTML="Sounds aus"
   } 
}