//get Canvas
var spiel = document.getElementById('game'); //game Object
var context = spiel.getContext('2d'); //get Canvas

var theme = document.createElement('audio');
theme.setAttribute('src', 'assets/musik.mp3') //noisy music
//http://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Skate
theme.setAttribute('loop', 'true');
theme.volume=0.15

// Load sounds
var winSound = document.createElement('audio')
winSound.setAttribute("src","assets/win.mp3")


var loseSound = document.createElement('audio')
loseSound.setAttribute("src","assets/lose.mp3")


var jumpSound = document.createElement('audio');
jumpSound.setAttribute('src', 'assets/jump.mp3');
jumpSound.volume=0.3

var waterSplashSound = document.createElement('audio')
waterSplashSound.setAttribute('src', 'assets/waterSplash.mp3')
waterSplashSound.volume=0.5

var crashSound = document.createElement('audio')
crashSound.setAttribute('src', 'assets/crash.mp3')
crashSound.volume=0.4

areSoundsActive = true;

var difficulty = 0.5
var setHighscore=false

//frog object. Frog is drawn from this object
var frog = {
    x: spiel.width / 2 - 15, 
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
// Conters for animations
var turtleCounter = 0
var crocodileCounter = 0
var fx = 1

//use of local storage to save own highsore. IE needs xampp for local Storage
try {
    if(localStorage.getItem("highscore") == null || localStorage.getItem("highscore") == undefined){  
      newScoreListe();
    }
    highscore = JSON.parse(localStorage.getItem('highscore')); 
} catch (exception) {
    newScoreListe();
}

//localStorage.removeItem('highscore')

//set images
sprites = new Image();
sprites.src = 'assets/frogger.png'; //frogger template with all objects
deadSprite = new Image() //dead frog image
deadSprite.src = 'assets/dead_frog.png'

function newScoreListe(){  //Generate new highscore object and pass it into the LocalStorage
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

var game_loop = function () { //game loop every 16ms


    drawBackground(); //have to be ordered. Background position behind all others  


    moveObjects();
    if (!frog.picture.includes("way")) { //if frog is not in animaton
        if (!checkWin()) {
            if (checkWater()) { // If frog is in water region
                if (!checkOnSaveObject() || frog.x > spiel.width - 20 || frog.x < -10) { //If frog is in water and not on an object or to close to the side
                    areSoundsActive ? waterSplashSound.play() : null //play dead sound 
                    drawBackground();
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



// Frog on any save water object
var checkOnSaveObject = function () {

    for (i = 0; i < Object.keys(waterObj).length; i++) { //for all water objects
        if (waterObj[i].checkOn() && waterObj[i].ObjPicture != "turtle9" && waterObj[i].ObjPicture != "crocodile2") {

            return true //return if save. Turtles and crocodiles are not always save

        }
    }

    return false


}

var moveObjects = function () {

    //algorithm to change the picture and behaviour of turtles and crocodiles
    var difficultyFactor // can be 1 / 2 / 5
    (difficulty*2) <=2 ? difficultyFactor=difficulty*2 : difficultyFactor=5
    turtleCounter = (turtleCounter + difficultyFactor* fx)
    crocodileCounter = (crocodileCounter + difficultyFactor * fx)
    for (x = 0; x < Object.keys(waterObj).length; x++) {
        
        waterObj[x].move(); //move all waterObjects

        if (waterObj[x].checkOn()) {
            waterObj[x].direction == "right" ? frog.x = frog.x + waterObj[x].speed : frog.x = frog.x - waterObj[x].speed  //if frog on oject frog moves with object
        }

        turtleCounter == 450 || turtleCounter == 0 ? fx = fx * -1 : null


   
        if (turtleCounter % 50 == 0 && waterObj[x].ObjPicture.includes("turtle")) {
            waterObj[x].ObjPicture = "turtle" + (turtleCounter / 50)
            //check turtleCounter... turtleCounter goes up to 450 and then down to 0 and again... on different numbers the pictture of the tutles change

        }
        

        if (waterObj[x].ObjPicture.includes("crocodile") && (crocodileCounter < 300 || crocodileCounter >350)) {
            waterObj[x].ObjPicture = "crocodile1" //crocodile save
        } else if (waterObj[x].ObjPicture.includes("crocodile")) {
            waterObj[x].ObjPicture = "crocodile2" //crocodie not save
        }

    }

    for (i = 0; i < Object.keys(vehicle).length; i++) {
        vehicle[i].move(); //loop through all cars
        if (vehicle[i].checkOn()) {
            if(areSoundsActive){
                crashSound.load();
                crashSound.play()
            }//crash with car, play sound
            dead();
        }
    }
}


// 505 = Y length of Canvas
// How far the frog has gone, also if any stars collected
var checkScore = function () {
    if ((505 - frog.y) / 35 * 100 * (difficulty/2)> score && !frog.picture.includes("way")) {
        score = (505 - frog.y) / 35 * 100  * (difficulty/2) //new score   //every new step take a look how far the frog is gone. Increase if frogs position is higher then score
    }
    if (frog.x + 25 >= star.x && frog.x - 25 <= star.x  && frog.y <= star.y + 25 && frog.y >= star.y - 25) {
        starScore = starScore +50
        star.newStar();
    }
}

// Is frog at water region
var checkWater = function () {

    if (frog.y <= spiel.height / 2) {
        return true
    } //if over the middle return true
    return false
}


//---------------keydown event------------------------

document.body.onkeydown = async function (event) { //async because we want to await
    if (keyPressed == false && isInMenu == false) {
        if (isPlayerAlive != false) { //if crashed then press key to reload
            playSound()
            keyPressed = true
            if (event.keyCode == 38 && frog.y - 100 > 0) { //move and change picture while jumping 100 ms

                frog.picture = "upway"; //frog up way
                frog.y = frog.y - 25;
                await sleep(100) //sleep function for animation wait 0.1 seconds to it looks like the frog is moving slowly
                frog.picture = "up"; //frog up
                frog.y = frog.y - 10;

            } else if (event.keyCode == 40 && frog.y < spiel.height - 80) {
                frog.picture = "downway"; //frog down way
                frog.y = frog.y + 20;
                await sleep(100)
                frog.picture = "down"; //frog down
                frog.y = frog.y + 15;

            } else if (event.keyCode == 37 && frog.x > 40) {
                frog.picture = "leftway"; //frog left way
                frog.x = frog.x - 21;
                await sleep(100)
                frog.picture = "left"; //frog left
                frog.x = frog.x - 21;

            } else if (event.keyCode == 39 && frog.x < spiel.width - 50) {
                frog.picture = "rightway"; //frog right way
                frog.x = frog.x + 21;
                await sleep(100)
                frog.picture = "right"; //frog right
                frog.x = frog.x + 21;
            }
        } else {
            reset();
          
        }
    }
};

//prevents holding key
document.body.onkeyup = function () {
    keyPressed = false
}

//sleep function returns and promise after x miliseconds so a async function can wait while executing
var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    //returns a promise to in async function its possible to "await" a command.
}
//-----------------------------------------classes-----------------

var checkWin = function () {
    //check if frog is on lily if yes move frog to the beginning
    for (i = 0; i < 5; i++) {
        if (frog.y < 100 && frog.x > 5 + (85 * i) && frog.x < 30 + (85 * i)) {
            //hitbox
            
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

    //if frog is on all lilys, player has won the whole game
    if (win.every(function (elemet) {
            return elemet == true
        })) {
        clearInterval(loop)
        areSoundsActive ? winSound.play(): null
        drawStop('won')
        win = [false, false, false, false, false] //reset win array so promt only shows up once
        return true
    }
    return false

}

//if player is dead
var dead =  function () {
    isPlayerAlive = false
    lives = lives - 1
       clearInterval(loop)      //stop animations
     
    if (lives == 0) { //if dead with no lives
        win = [false, false, false, false, false]
        isInMenu=true
        drawStop('lose');   
        console.log("test")
        areSoundsActive ?  loseSound.play() : null
    }
}

var sort=function(name){        //sorts the highscore objects and places new score if high enough
    var points = score + starScore
    var bufferPoints 
  
    
    name=="" || name == null ? name="noname": null
    if(name.length > 11){                               //check if user added a name if not
        name=name.substring(0,11);                      //take "Noname"
    }
    var bufferName                                      //performaz:
                                                        //object no array. Kind of bubble sort with just one round
    for(i=1;i<=Object.keys(highscore).length;i++){      //starts at the top 
      
        if (points > highscore[i].punkte){
                                                        //if new highscore is higher
            bufferPoints = highscore[i].punkte;            //load old in buffer and repleace. Next step
            bufferName = highscore[i].name;                 //buffer also name

            highscore[i].punkte=points
            highscore[i].name=name

            points = bufferPoints
            name = bufferName
        }
    }

}
var displayHighscore = function(){      //creates highscore html with loop
    var positionElement = '<div class="scoreHeader">&nbsp;</div>';
    var nameElement = '<div class="scoreHeader">Name:</div>';
    var scoreElement = '<div class="scoreHeader">Score:</div>';
    for(i=1;i<11;i++){
        positionElement += '<div class="highscorePositionRow">'+i+'.</div>';
        nameElement += '<div class="highscoreNameRow">'+highscore[i].name+'</div>';
        scoreElement += '<div class="highscoreScoreRow">'+highscore[i].punkte+'</div>';
    }
    document.getElementById("positionContainer").innerHTML = positionElement;
    document.getElementById("nameContainer").innerHTML = nameElement;   //past highscores
    document.getElementById("scoreContainer").innerHTML = scoreElement;

}
var musicOff = function () {        //switch on / off music and change image
    var musicButton = document.getElementsByClassName("musicBtn")
    var imageName= "";
    musicImage = musicButton[0].childNodes[1];
    if (music == false) {
        theme.pause()
        imageName = "soundOff";
        music = true
    } else {
        theme.play()
        imageName = "soundOn";
        music = false
    }
    //change picture
    musicImage.style.background = "url('assets/"+imageName+".png') 100% 100% no-repeat";
    musicImage.style.backgroundSize = "40px";

}

var playSound = function () {

    if (areSoundsActive == true) {

        //load because of often use //if Sounds are enables make sound by every jump
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
    } 
    else {
        areSoundsActive = true;
        imageName = "soundOn";
    }
    // change images
    soundImage.style.background = "url('assets/"+imageName+".png') 100% 100% no-repeat";
    soundImage.style.backgroundSize = "40px";
}





// Menu Options // show relevant screens and hide others

function startGame() {
    reset();
    createObjects();
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
  //sets frog to bottom creates a new star and starts the loop again
    isPlayerAlive = true
    
    frog = frog = {
        x: spiel.width / 2 - 15,
        y: spiel.height - 55,
        picture: "up"
    }
    loop = setInterval(game_loop, 16) //new loop beaucse the other one was cleared
    star.newStar();

}

//val can be 1 2 3
function setDifficulty(val){
    difficulty = val / 2;
    //set difficultly factor to 0,5 / 1 / 1,5 so it can be used
    var difficultyOptions = document.getElementsByClassName("difficultyNumber");
    for(var i = 0, length = difficultyOptions.length; i < length; i++) {
        difficultyOptions[i].classList.remove("selected");
        //remove css class from old selected
     }
    document.getElementById("difficulty"+val).classList.add("selected");
     //assign selected css class to chosen difficulty
}



function setHighscore(){

    var name =  document.getElementById("rankingname");
 
    if(name.length<12){
        sort(name);
        //set highscore
        localStorage.setItem("highscore", JSON.stringify(highscore));
        score = 0
        starScore=0
        lives = 4
        drawScore();
        deathMenu();
       
        setHighscore=false
        
    }

   }