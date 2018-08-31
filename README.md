# Frogger Retro-Game

### Autoren: Dirk Soltenborn, Gerorg Westbomke, Yannik Kasper
### Versionsnummer: 0.9
### Datum: 29.08.2018

## Spezifikation:

#### Ziel:            Nachbildung des Retrospiels Frogger mit unterschiedlichen Schwierigkeitsgraden und neueren Features
#### Verwendete       Mittel: HTML5, CSS, JavaScrpit
#### Lauffähig auf:   Chrome, Firefox, Opera
#### Nicht lauffähig auf IE aufgrund der folgenden Funktionaliäten:
* Animationen durch Async Functions und "Await" Keyword
* Verwendung mehererer JavaScript Dokumente zur Übersichtlichkeit
* Verwendung von LocalStorage ohne Xampp
* Verwendung des Keywords "Include"



## Verwendete Mittel:
* Nachgebildetes Frogger Template (eigen Erstellung)
* Nachgebildetes Totenkopf Bild   (eigen Erstellung)  
* Frog Sound:                     http://soundbible.com/about.php
* Car crash Sound:                http://soundbible.com/about.php
* Water Sound:                    http://soundbible.com/about.php
* Musik:                          https://www.youtube.com/watch?v=bhWRYaGkqMw


## Dokumentation

### Klassen und Methoden
* gameObject
* move()
* checkOn()

### Functionen
* createObjects()             Objekterstellung Levelspezifisch
* soundsOff()                 Ein und ausschalten von Sounds
* playSound()                 Abspielen des Frosch Sounds
* dead()                      Bei Tot ausgeführte Function
* checkWin()                  Prüfung auf Gewinn
* sleep()                     Wait Function durch Pomiss return
* document.body.onkeydown()   tastatur Eingabe
* document.body.onkeyup()     tastatur Eingabe
* checkWater()                Prüfung ob Frosch im Wasser
* drawFrog()                  Zeichnen des Frosches
* drawLine()                  Linien zwischen den Autos malen
* checkScore()                Prüfung ob neuer Score erreicht wurde
* moveObjects()               Bewegung aller Objecte
* checkOnSaveObject()         Prüfung ob Forsch auf Wasser Object ist
* drawBackground()            Zeichnen des Hintergrundes
* gameLoop()                  Schleife für Zeichnung und Prüfung ??? retro-game.js 75
* Star()                      Stern der eingesammelt werden kann
* drawStar()                  Zeichnen des Sterns
* newStar()                   
* gameObjekt()
* move()
* checkOn()
* loadContent()               retro-game.js 105
* reset()
* onKeyDown()
* onkeyup()
* deathMenu()
* musicOff()
* startGame()
* retry()
* setDifficulty()
* getHighscore()
* setHighscore()

### Objecte
* Frog Json Object
* Spiel object
* content Canvas Objekt
* Theme Bild Object
* JumpSound Sound Object
* WaterSplasch Sound Object
* Crash Sound Object
