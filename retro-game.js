//get Canvas
var spiel = document.getElementById('game'); //game Object
var context = spiel.getContext('2d'); //get Canvas

var theme = document.createElement('audio');
theme.setAttribute('src', 'assets/musik.mp3') //noisy music
//http://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Skate
theme.setAttribute('loop', 'true');



var jumpSound = document.createElement('audio'); //jump sound
jumpSound.setAttribute('src', 'assets/jump.mp3');

var waterSplashSound = document.createElement('audio') //dead water Sound
waterSplashSound.setAttribute('src', 'assets/waterSplash.mp3')

var crashSound = document.createElement('audio') //car crash sound
crashSound.setAttribute('src', 'assets/crash.mp3')
areSoundsActive = true;

var difficulty = 0.5


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
var highscore={}
var score = 0
var starScore = 0
var counter = 0
var counter2 = 0
var fx = 1

try {
    if(localStorage.getItem("highscore") == null || localStorage.getItem("highscore") == undefined){  
      newScoreListe();
    }
        highscore = JSON.parse(localStorage.getItem('highscore')); //use of local storage to save own highsore. IE needs xampp for local Storage
             
} catch (exception) {
    newScoreListe();
}


//localStorage.removeItem('highscore')

//set images
sprites = new Image();
sprites.src = 'assets/frogger.png'; //frogger template with all objects
sprites.onload = function () { //after images are load

    deadSprite = new Image() //dead frog image
    deadSprite.src = 'assets/dead_frog.png'
   
};



//-----------------------loop event---------------------------


function newScoreListe(){  //Generate new highscore object and past it into the LocalStorage
    highscore  = {
       "1":{
           name:"noname",
           punkte:0},
       "2":{
           name:"noname",
           punkte:0},
       "3":{
           name:"noname",
           punkte:0},
       "4":{
           name:"noname",
           punkte:0},
       "5":{
           name:"noname",
           punkte:0},
        "6":{
            name:"noname",
            punkte:0},
        "7":{
            name:"noname",
            punkte:0},
        "8":{
            name:"noname",
            punkte:0},
        "9":{
            name:"noname",
            punkte:0},
        "10":{
            name:"noname",
            punkte:0},
   }
   
   localStorage.setItem("highscore", JSON.stringify(highscore));
}

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




var checkOnSaveObject = function () {

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
    var difficultyFactor 
    (difficulty*2) <=2 ? difficultyFactor=difficulty*2 : difficultyFactor=5
    counter = (counter + difficultyFactor* fx) % 602
    counter2 = (counter2 + difficultyFactor * fx) % 600
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
        

        if (waterObj[x].ObjPicture.includes("crocodile") && (counter2 < 300 || counter2 >350)) {
            waterObj[x].ObjPicture = "crocodile1" //crocodile save 2/3 of time
        } else if (waterObj[x].ObjPicture.includes("crocodile")) {
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
    if ((505 - frog.y) / 35 * 100 * (difficulty/2)> score && !frog.picture.includes("way")) {
        score = (505 - frog.y) / 35 * 100  * (difficulty/2) //new score   //every new step take a look how far the frog is gone. Increase if frogs position is higher then score
    }
    if (frog.x + 25 >= star.x && frog.x - 25 <= star.x  && frog.y <= star.y + 25 && frog.y >= star.y - 25) {
        starScore = starScore +50
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
            reset();
          
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
            if(win[i]==false){
            starScore = starScore +score  + 500 * difficulty / 2
            score=0
            }
            win[i] = true
            frog.x = spiel.width / 2 - 15
            frog.y = spiel.height - 55
            
            star.newStar();
            return true
        }
    }

    //if frog is on all lillys player has won the whole game
    if (win.every(function (elemet) {
            return elemet == true
        })) {
        clearInterval(loop)
        drawStop('won')
        win = [false, false, false, false, false]
        return true
    }
    return false

}





var dead =  function () {
    isPlayerAlive = false
    lives = lives - 1
       clearInterval(loop)
     
    if (lives == 0) { //if dead with no lives
        win = [false, false, false, false, false]
        isInMenu=true
        drawStop('lose');
        console.log("test")
    }
}

var sort=function(name){
    var points = score + starScore
    var bufferPoints 
  
    
    name=="" || name == null ? name="noname": null
    if(name.length > 11){
        name=name.substring(0,11);
    }
    var bufferName
    for(i=1;i<=Object.keys(highscore).length;i++){
      
        if (points > highscore[i].punkte){
            
            bufferPoints = highscore[i].punkte;
            bufferName = highscore[i].name;

            highscore[i].punkte=points
            highscore[i].name=name

            points = bufferPoints
            name = bufferName
        }
    }

}
var displayHighscore = function(){
    var positionElement = '<div class="scoreHeader">&nbsp;</div>';
    var nameElement = '<div class="scoreHeader">Name:</div>';
    var scoreElement = '<div class="scoreHeader">Score:</div>';
    for(i=1;i<11;i++){
        positionElement += '<div class="highscorePositionRow">'+i+'.</div>';
        nameElement += '<div class="highscoreNameRow">'+highscore[i].name+'</div>';
        scoreElement += '<div class="highscoreScoreRow">'+highscore[i].punkte+'</div>';
    }
    document.getElementById("positionContainer").innerHTML = positionElement;
    document.getElementById("nameContainer").innerHTML = nameElement;
    document.getElementById("scoreContainer").innerHTML = scoreElement;

}
var musicOff = function () {
    var musicButton = document.getElementsByClassName("musicBtn")
    var imageName= "";
    musicImage = musicButton[0].childNodes[1];
    if (music == false) {
        theme.pause()
        imageName = "soundOff";
        musicButton.innerHTML = "Music anschalten"
        music = true
    } else {
        theme.play()
        imageName = "soundOn";
        musicButton.innerHTML = "Music ausschalten"
        music = false
    }

    musicImage.style.background = "url('assets/"+imageName+".png') 100% 100% no-repeat";
    musicImage.style.backgroundSize = "40px";

}

var playSound = function () {

    if (areSoundsActive == true) {

        //jumpSound.load() //if Sounds are enables make sound by every jump
        jumpSound.load()
        jumpSound.play()
    }


}
var soundsOff = function () {
    var soundsButton = document.getElementsByClassName("soundBtn");

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
    reset();
    createObjects();
    //Create Cars
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
    reset();

    document.getElementById("deathMenu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    isInMenu = false;
}

function showHighscore(){
    displayHighscore();
    document.getElementById("gameMenu").classList.add("hidden");
    document.getElementById("deathMenu").classList.add("hidden");
    document.getElementById("highscoreView").classList.remove("hidden");
}

function backFromHighscore(){
    document.getElementById("gameMenu").classList.remove("hidden");
    document.getElementById("highscoreView").classList.add("hidden");
}

function reset(){
  
    isPlayerAlive = true
    
    frog = frog = {
        x: spiel.width / 2 - 15,
        y: spiel.height - 55,
        picture: "up"
    }
    loop = setInterval(game_loop, 16) //new loop beaucse the orher one was cleared
    star.newStar();

}

function setDifficulty(val){
    difficulty = val / 2;

    var difficultyOptions = document.getElementsByClassName("difficultyNumber");
    for(var i = 0, length = difficultyOptions.length; i < length; i++) {
        difficultyOptions[i].classList.remove("selected");
     }
    document.getElementById("difficulty"+val).classList.add("selected");

}



