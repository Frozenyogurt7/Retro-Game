//get Canvas
var spiel = document.getElementById('game');    //game Object
var context = spiel.getContext('2d');           //get Canvas

var theme = document.createElement('audio');
theme.setAttribute('src', 'assets/musik.mp3');  //noisy music
theme.setAttribute('loop', 'true');

var jumpSound = document.createElement('audio');    //jump sound
jumpSound.setAttribute('src', 'assets/jump3.mp3');

var waterSplashSound = document.createElement('audio')      //dead water Sound
waterSplashSound.setAttribute('src','assets/waterSplash.mp3')

var crashSound = document.createElement('audio')        //car crash sound
crashSound.setAttribute('src','assets/crash.mp3')
areSoundsActive = false

//theme.play();

//frog json
var frog = {
    x: spiel.width / 2 - 15,            //frog json. Frog is drawn from this object
    y: spiel.height - 55,
    picture: "up"
};

var waterObj = []                       //arrays of water and street objects
var vehicle = []

var isPlayerAlive = true                //check variables
var lives = 4
var music = false
var win = [false, false, false, false, false]
var keyPressed = false                  //keypressed prevent of holding keys

try {

    highscore = localStorage.getItem('highscore')   //use of local storage to save own highsore. IE needs xampp for local Storage
    if (highscore == null) {
        highscore = 0                               //most browsers return null if localstorage is not set
    }
} catch (exception) {
    highscore = 0                                   //IE gets error if localstroage object not existing
}



var score = 0
//set images
sprites = new Image();
sprites.src = 'assets/frogger.png';     //frogger template with all objects
sprites.onload = function () { //after images are load

    deadSprite = new Image()            //dead frog image
    deadSprite.src = 'assets/dead_frog.png'
    createObjects();
    //Create Cars
    loop = setInterval(game_loop, 16); //loop //85 mileseconds = ~  30 FPS (motion human able to see)

};



//-----------------------loop event---------------------------
var counter = 0
var fx = 1


var game_loop = function () {   //game loop 16 times a seconed executed


    drawBackground();           //have to be orderd. Backgrouds position behind all others  
    moveObjects();              
    if (!frog.picture.includes("way")) {    //if frog is not in animaton
        if (!checkWin()) {
            if (checkWater()) {
                if (!checkOnSaveObject() || frog.x > spiel.width - 20 || frog.x < -10) {    //If frog is in water and not on an object or to close to the side
                    areSoundsActive ? waterSplashSound.play() : null    //play dead sound 
                    dead();
                    
                }
            }

        }
    }

    checkScore();   //check if score have to be increased
    drawFrog(); //have to be on the end because on top of all images
}

//----------------------------draw background------------ 

var drawBackground = function () {
    context.beginPath()             //!important for performance. erases the already drawn pixels?
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
        context.stroke();   //draw circle
        context.fillStyle = 'green';
        context.fill() //set green style of circles
    }

    drawLine(5, 460) //recursive function just because I can



    context.font = 'bold 12pt arial';
    context.fillText('Score: ', 100, 550);      //crate labels on the bottom
    context.fillText('Highscore: ', 240, 550);
    context.fillText(score, 155, 550);
    context.fillText(highscore, 330, 550);
    for (i = 0; i < lives; i++) {
        context.drawImage(sprites, 13, 334, 17, 23, 5 + i * 20, 538, 11, 15); //draw lives
    }

    for (i = 0; i < 5; i++) {
        if (win[i] == true) {
            context.drawImage(sprites, 12, 369, 23, 20, 15 + (i * 85), 82, 23, 20)  //if player has one win the frog will be drawn all the time on the lilly
        }
    }


};

var loadContent = function (){
    
}

var checkOnSaveObject = function () {

    for (i = 0; i < Object.keys(waterObj).length; i++) {    //for all water objects
        //every

        if (waterObj[i].checkOn() && waterObj[i].ObjPicture != "turtle9" && waterObj[i].ObjPicture != "crocodile2") {

            return true //return if save. Turtles and crocodiles are not always save

        }
    }

    return false


}

var moveObjects = function () {

    //creazy alorithm to change the picture and behavior of turtles and crodociles
    counter = (counter + 2 * fx) % 602
    for (x = 0; x < Object.keys(waterObj).length; x++) {
        waterObj[x].move();         //move all waterObjects

        if (waterObj[x].checkOn()) {
            waterObj[x].direction == "right" ? frog.x = frog.x + waterObj[x].speed : frog.x = frog.x - waterObj[x].speed
            //if frog on oject frog moves with object

        }

        counter == 450 || counter == 0 ? fx = fx * -1 : null
        if (counter % 50 == 0 && waterObj[x].ObjPicture.includes("turtle")) {
            waterObj[x].ObjPicture = "turtle" + (counter / 50 )
            //check counter... counter goes ip to 600 and then down to 0 and again... on different numbers the pictture of the tutles change

        }

        if(waterObj[x].ObjPicture.includes("crocodile") && counter < 400){
            waterObj[x].ObjPicture = "crocodile1"   //crocodile save 2/3 of time
        }else if(waterObj[x].ObjPicture.includes("crocodile") && counter >= 400){
            waterObj[x].ObjPicture = "crocodile2"   //crocodie not sace 1/3 of time
        }

    }

    for (i = 0; i < Object.keys(vehicle).length; i++) {
        vehicle[i].move(); //loop through all cars
        if (vehicle[i].checkOn()) {
            areSoundsActive ? crashSound.play() : null  //crash with car, play sound
            dead();
        }
    }
}

var checkScore = function () {
    if ((505 - frog.y) / 35 * 100 > score && !frog.picture.includes("way")) {
        score = (505 - frog.y) / 35 * 100 //new score   //every new step take a look how far the frog is gone. Increase if frogs position is higher then score
    }
}

var drawLine = function (x, y) {
//draw the lines between the vehicles

    context.beginPath() //recursive function just because I can
    context.moveTo(x, y)
    context.lineTo(x + 30, y)
    context.strokeStyle = "white"
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

var checkWater = function () {

    if (frog.y <= spiel.height / 2) {
        return true
    }   //iif over the middle return true
    return false
}


//---------------keydown event------------------------

document.body.onkeydown = async function (event) { //async because we want to await
    if (keyPressed == false) {
        if (isPlayerAlive != false) { //if crashed then press key to reload
            playSound()
            keyPressed = true
            if (event.keyCode == 38 && frog.y - 100 > 0) { //move and change picture while jumping 100 ms

                frog.picture = "upway"; //frog up
                frog.y = frog.y - 25;
                await sleep(100)        //sleep function for animation wait 0.1 seconds to it looks like the frog is moving slowly
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
            loop = setInterval(game_loop, 16)       //new loop beaucse the orher one was cleared
        }
    }
};

document.body.onkeyup = function () {
    keyPressed = false
    //prevends holding key
}

//sleep function returns and promise after x miliseconds so a async function can wait while executing
var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    //returns a promise to in async function its ppossible to "await" a command.
}
//-----------------------------------------classes-----------------


//should be a class but IE does not support classes. Workawound with function and this parameters
var gameObject = function (x, y, ObjPicture, speed, direc, length) { //parameter x y bzw row and speed have to be given
    this.x = x
    this.y = y
    this.ObjPicture = ObjPicture
    this.speed = speed
    this.direction = direc
    this.lenght = length || 1


    this.move = function () {
//move the object method. check if out of bound and then move position to the other bound
        switch (this.direction) {
            case "right":
                this.x <= spiel.width + this.lenght * 40 ? this.x = (this.x + this.speed) : this.x = -this.lenght * 40; //move right
                break;
            case "left":
                this.x >= (-40 * this.lenght) ? this.x = (this.x - this.speed) : this.x = spiel.width + this.lenght * 40; //move left
        }

//all pictures of objects drawn on there positions
        switch (this.ObjPicture) { //draw objects
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
            case "crocodile1":
                context.drawImage(sprites, 155, 370, 90, 25, this.x, this.y, 90, 25); //crocodile
                break;
            case "crocodile2":
                context.drawImage(sprites, 155, 330, 90, 35, this.x, this.y-7, 90, 35); //crocodile2
                break;
            case "turtle0":
            case "turtle1":
            case "turtle2": //fall through for longer tutrle 0
            case "turtle3":
            case "turtle4":
                context.drawImage(sprites, 16, 405, 26, 22, this.x, this.y, 26, 22); //turtle 1
                break;
            case "turtle5":
                context.drawImage(sprites, 55, 405, 26, 24, this.x, this.y, 26, 24); //turtle2
                break;
            case "turtle6":
                context.drawImage(sprites, 92, 405, 30, 24, this.x, this.y, 30, 24); //turtle3
                break;
            case "turtle7":
                context.drawImage(sprites, 134, 405, 30, 24, this.x, this.y, 30, 24); //turtle4
                break;
            case "turtle8":
                context.drawImage(sprites, 180, 405, 20, 20, this.x, this.y, 20, 20); //turtle5
                break;
            case "turtle9":
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
var checkWin = function () {
//check if frog is on lilly if yes move frog to the beginning
    for (i = 0; i < 5; i++) {
        if (frog.y < 100 && frog.x > 5 + (85 * i) && frog.x < 30 + (85 * i)) {
            win[i] = true
            //score = score +200
            frog.x = spiel.width / 2 - 15
            frog.y = spiel.height - 55
            return true
        }
    }

    //if frog is on all lillys player has won the whole game
    if (win.every(function (elemet) {
            return elemet == true
        })) {
        alert("won game")   //great alert
        return true
    }
    return false

}

var dead = function () {
    isPlayerAlive = false
    lives = lives - 1
    clearInterval(loop)
    if (lives == 0) {   //if dead with no lives
        win = [false, false, false, false, false]
        context.globalAlpha = 0.2;
        context.fillStyle = "white"
        context.fillRect(0,0,400,560);  //background getting transperent and
        context.globalAlpha =1;
        context.font = 'bold 72pt arial';
      
        context.fillStyle = '#38fe14';
        context.fillText('GAME', 60, 150);  //image game over
        context.fillText('OVER', 60, 300);
        if (highscore < score) {

            localStorage.setItem('highscore', score.toString())
            highscore = score       //if dead set new highscore if nececcary

        }
        score = 0
        lives = 4

    }
}

var musicOff = function () {
    var musicButton = document.getElementById("musicBtn")
    if (music == true) {
        theme.pause()
        musicButton.innerHTML = "Music an"
        music = false
    } else {
        theme.play()
        musicButton.innerHTML = "Music aus"
        music = true
    }



}

var playSound = function () {

    if (areSoundsActive == true) {

        jumpSound.load()    //if Sounds are enables make sound by every jump
        jumpSound.play()
    }


}
var soundsOff = function () {
    var soundsButton = document.getElementById("soundsBtn")
    if (areSoundsActive == true) {
        areSoundsActive = false
        soundsButton.innerHTML = "Sounds anschalten"    //change html to switch of and on musik/sound
    } else {
        areSoundsActive = true
        soundsButton.innerHTML = "Sounds ausschalten"
    }
}

var createObjects = function () {
    //level one  creation of all objects
    vehicle[0] = new gameObject(50, 465, "pink car", 4, "left")
    vehicle[1] = new gameObject(100, 465, "pink car", 4, "left")
    vehicle[2] = new gameObject(150, 465, "pink car", 4, "left")

    vehicle[3] = new gameObject(50, 432, "red car", 6, "right")
    vehicle[4] = new gameObject(100, 432, "red car", 6, "right")

    vehicle[5] = new gameObject(50, 396, "white LKW", 4, "left", 1.2)
    vehicle[6] = new gameObject(100, 396, "white LKW", 4, "left", 1.2)

    vehicle[7] = new gameObject(100, 360, "bagger", 4, "right")
    vehicle[8] = new gameObject(140, 360, "bagger", 4, "right")
    vehicle[9] = new gameObject(180, 360, "bagger", 4, "right")
    vehicle[10] = new gameObject(220, 360, "bagger", 4, "right")

    vehicle[11] = new gameObject(40, 325, "blue car", 4, "left")
    vehicle[12] = new gameObject(80, 325, "blue car", 4, "left")


    waterObj[0] = new gameObject(120, 250, "wood line", 2, "right", 2.5)
    waterObj[1] = new gameObject(240, 250, "wood line", 2, "right", 2.5)

    waterObj[2] = new gameObject(120, 217, "wood line", 3, "left", 2.5)
    waterObj[3] = new gameObject(240, 217, "wood line", 3, "left", 2.5)


    waterObj[4] = new gameObject(50, 182, "turtle1", 2, "left")
    waterObj[5] = new gameObject(80, 182, "turtle1", 2, "left")
    waterObj[6] = new gameObject(110, 182, "turtle1", 2, "left")

    waterObj[7] = new gameObject(170, 182, "turtle1", 2, "left")
    waterObj[8] = new gameObject(200, 182, "turtle1", 2, "left")
    waterObj[9] = new gameObject(230, 182, "turtle1", 2, "left")

    waterObj[10] = new gameObject(300, 182, "turtle1", 2, "left")
    waterObj[11] = new gameObject(330, 182, "turtle1", 2, "left")
    waterObj[12] = new gameObject(360, 182, "turtle1", 2, "left")

    waterObj[13] = new gameObject(100, 148, "crocodile1", 1, "right", 2)
    waterObj[14] = new gameObject(200, 148, "crocodile1", 1, "right", 2)
    waterObj[15] = new gameObject(350, 148, "wood line", 1, "right", 2)
    waterObj[16] = new gameObject(450, 148, "wood line", 1, "right", 2)

    waterObj[17] = new gameObject(120, 112, "wood line", 1, "left", 2.5)
    waterObj[18] = new gameObject(240, 112, "wood line", 1, "left", 2.5)
}