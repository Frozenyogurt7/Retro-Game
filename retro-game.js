//get Canvas
var spiel = document.getElementById('game'); //game Object
var context = spiel.getContext('2d'); //get Canvas

var theme = document.createElement('audio');
theme.setAttribute('src', 'assets/musik.mp3'); //noisy music
theme.setAttribute('loop', 'true');

var jumpSound = document.createElement('audio'); //jump sound
jumpSound.setAttribute('src', 'assets/jump3.mp3');

var waterSplashSound = document.createElement('audio') //dead water Sound
waterSplashSound.setAttribute('src', 'assets/waterSplash.mp3')

var crashSound = document.createElement('audio') //car crash sound
crashSound.setAttribute('src', 'assets/crash.mp3')
areSoundsActive = true;

var difficulty = 1
//theme.play();

//frog json
var frog = {
    x: spiel.width / 2 - 15, //frog json. Frog is drawn from this object
    y: spiel.height - 55,
    picture: "up"
};

var star = new Star();

var waterObj = [] //arrays of water and street objects
var vehicle = []

var isPlayerAlive = true //check variables
var lives = 4
var music = true
var win = [false, false, false, false, false]
var keyPressed = false //keypressed prevent of holding keys
var isInMenu = true;

try {

    highscore = localStorage.getItem('highscore') //use of local storage to save own highsore. IE needs xampp for local Storage
    if (highscore == null) {
        highscore = 0 //most browsers return null if localstorage is not set
    }
} catch (exception) {
    highscore = 0 //IE gets error if localstroage object not existing
}



var score = 0
//set images
sprites = new Image();
sprites.src = 'assets/frogger.png'; //frogger template with all objects
sprites.onload = function () { //after images are load

    deadSprite = new Image() //dead frog image
    deadSprite.src = 'assets/dead_frog.png'
   
};



//-----------------------loop event---------------------------
var counter = 0
var fx = 1


var game_loop = function () { //game loop 16 times a seconed executed


    drawBackground(); //have to be orderd. Backgrouds position behind all others  


    moveObjects();
    if (!frog.picture.includes("way")) { //if frog is not in animaton
        if (!checkWin()) {
            if (checkWater()) {
                if (!checkOnSaveObject() || frog.x > spiel.width - 20 || frog.x < -10) { //If frog is in water and not on an object or to close to the side
                    areSoundsActive ? waterSplashSound.play() : null //play dead sound 
                    drawBackground(); //have to be orderd. Backgrouds position behind all others  
                    moveObjects();
                    dead();
                    

                }
            }

        }
    }
    star.drawStar();
    checkScore(); //check if score have to be increased
    drawFrog(); //have to be on the end because on top of all images
}

//----------------------------draw background------------ 


var loadContent = function () {

}

var checkOnSaveObject = function () {
console.log(Object.keys(waterObj).length)
    for (i = 0; i < Object.keys(waterObj).length; i++) { //for all water objects
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
        
        waterObj[x].move(); //move all waterObjects

        if (waterObj[x].checkOn()) {
            waterObj[x].direction == "right" ? frog.x = frog.x + waterObj[x].speed : frog.x = frog.x - waterObj[x].speed
            //if frog on oject frog moves with object

        }

        counter == 450 || counter == 0 ? fx = fx * -1 : null


   
        if (counter % 50 == 0 && waterObj[x].ObjPicture.includes("turtle")) {
            waterObj[x].ObjPicture = "turtle" + (counter / 50)
            //check counter... counter goes ip to 600 and then down to 0 and again... on different numbers the pictture of the tutles change

        }


        if (waterObj[x].ObjPicture.includes("crocodile") && counter < 400) {
            waterObj[x].ObjPicture = "crocodile1" //crocodile save 2/3 of time
        } else if (waterObj[x].ObjPicture.includes("crocodile") && counter >= 400) {
            waterObj[x].ObjPicture = "crocodile2" //crocodie not sace 1/3 of time
        }

    }

    for (i = 0; i < Object.keys(vehicle).length; i++) {
        vehicle[i].move(); //loop through all cars
        if (vehicle[i].checkOn()) {
            areSoundsActive ? crashSound.play() : null //crash with car, play sound
            dead();
        }
    }
}

var checkScore = function () {
    if ((505 - frog.y) / 35 * 100 > score && !frog.picture.includes("way")) {
        score = (505 - frog.y) / 35 * 100 //new score   //every new step take a look how far the frog is gone. Increase if frogs position is higher then score
    }
    if (frog.x + 25 >= star.x && frog.x - 25 <= star.x  && frog.y <= star.y + 25 && frog.y >= star.y - 25) {
        score = score +50
        star.newStar();
    }
}


var checkWater = function () {

    if (frog.y <= spiel.height / 2) {
        return true
    } //iif over the middle return true
    return false
}


//---------------keydown event------------------------

document.body.onkeydown = async function (event) { //async because we want to await
    if (keyPressed == false && isInMenu == false) {
        if (isPlayerAlive != false) { //if crashed then press key to reload
            playSound()
            keyPressed = true
            if (event.keyCode == 38 && frog.y - 100 > 0) { //move and change picture while jumping 100 ms

                frog.picture = "upway"; //frog up
                frog.y = frog.y - 25;
                await sleep(100) //sleep function for animation wait 0.1 seconds to it looks like the frog is moving slowly
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
            loop = setInterval(game_loop, 16) //new loop beaucse the orher one was cleared
            
            star.newStar();
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

var checkWin = function () {
    //check if frog is on lilly if yes move frog to the beginning
    for (i = 0; i < 5; i++) {
        if (frog.y < 100 && frog.x > 5 + (85 * i) && frog.x < 30 + (85 * i)) {
            win[i] = true
            //score = score +200
            frog.x = spiel.width / 2 - 15
            frog.y = spiel.height - 55
            score = score +500
            star.newStar();
            return true
        }
    }

    //if frog is on all lillys player has won the whole game
    if (win.every(function (elemet) {
            return elemet == true
        })) {
        alert("won game") //great alert
        return true
    }
    return false

}

var dead = function () {
    isPlayerAlive = false
    lives = lives - 1
    clearInterval(loop)
    if (lives == 0) { //if dead with no lives
        win = [false, false, false, false, false]
        // context.globalAlpha = 0.2;
        // context.fillStyle = "white"
        // context.fillRect(0,0,400,560);  //background getting transperent and
        // context.globalAlpha =1;
        // context.font = 'bold 72pt arial';

        // context.fillStyle = '#38fe14';
        // context.fillText('GAME', 60, 150);  //image game over
        // context.fillText('OVER', 60, 300);
        if (highscore < score) {

            localStorage.setItem('highscore', score.toString())
            highscore = score //if dead set new highscore if nececcary

        }
        score = 0
        lives = 4
        deathMenu();

    }
}

var musicOff = function () {
    var musicButton = document.getElementsByClassName("musicBtn")
    var imageName= "";
    musicImage = musicButton[0].childNodes[1];
    if (music == true) {
        theme.pause()
        imageName = "soundOff";
        musicButton.innerHTML = "Music anschalten"
        music = false
    } else {
        theme.play()
        imageName = "soundOn";
        musicButton.innerHTML = "Music ausschalten"
        music = true
    }

    musicImage.style.background = "url('assets/"+imageName+".png') 100% 100% no-repeat";
    musicImage.style.backgroundSize = "40px";

}

var playSound = function () {

    if (areSoundsActive == true) {

        jumpSound.load() //if Sounds are enables make sound by every jump
        jumpSound.play()
    }


}
var soundsOff = function () {
    var soundsButton = document.getElementsByClassName("soundBtn");
    console.log(soundsButton);
    var imageName="";
    soundImage = soundsButton[0].childNodes[1];
    if (areSoundsActive == true) {
        areSoundsActive = false;
        imageName = "soundOff";
        //soundsButton.innerHTML = "Sounds anschalten" //change html to switch of and on musik/sound
    } else {
        areSoundsActive = true;
        imageName = "soundOn";
        //soundsButton.innerHTML = "Sounds ausschalten"
    }

    soundImage.style.background = "url('assets/"+imageName+".png') 100% 100% no-repeat";
    soundImage.style.backgroundSize = "40px";
}





// Menu Options

function startGame() {
    createObjects();
    //Create Cars
    loop = setInterval(game_loop, 16); //loop //85 mileseconds = ~  30 FPS (motion human able to see)

    document.getElementById("gameMenu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    isInMenu = false;
}

function deathMenu() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("deathMenu").classList.remove("hidden");
    isInMenu = true;
}

function showMainMenu() {
    document.getElementById("deathMenu").classList.add("hidden");
    document.getElementById("gameMenu").classList.remove("hidden");
    isInMenu = true;
}

function retry() {
    document.getElementById("deathMenu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    isInMenu = false;
}

function showHighscore(){
    document.getElementById("gameMenu").classList.add("hidden");
    document.getElementById("highscoreView").classList.remove("hidden");
}

function backFromHighscore(){
    document.getElementById("gameMenu").classList.remove("hidden");
    document.getElementById("highscoreView").classList.add("hidden");
}

function setDifficulty(val){
    difficulty = val;
    console.log(val);
    var difficultyOptions = document.getElementsByClassName("difficultyNumber");
    for(var i = 0, length = difficultyOptions.length; i < length; i++) {
        difficultyOptions[i].classList.remove("selected");
     }
    document.getElementById("difficulty"+val).classList.add("selected");

}