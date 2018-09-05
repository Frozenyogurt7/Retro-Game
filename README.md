# Frogger Retro-Game
Retro Frogger-Spiel mit zusätzlichen Features 

## Download Frogger

```
git clone https://gitlab.com/Frozenyogurt7/bglTour.git
```

Die retro-game.html Datei startet das Spiel



## Authors

* **Dirk Soltenborn** Konzept und Planung
* **Yannik Kasper** Programmierung 
* **Georg Westbomke** Design und Menu



#### Versionsnummer:
1.1 Bei Anmerkungen oder Fragen bitte an ykasper84@gmail.com wenden
#### Datum: 29.08.2018

## Spezifikation:
##
#### Ziel:            
Nachbildung des Retrospiels Frogger mit unterschiedlichen Schwierigkeitsgraden und neueren Features
#### Verwendete Mittel: 
HTML5, CSS, JavaScrpit
#### Lauffähig auf:   
Chrome, Firefox, Opera
#### Nicht lauffähig auf IE aufgrund der folgenden Funktionaliäten:
* Animationen durch Async Functions und "Await" Keyword
* Verwendung mehererer JavaScript Dokumente zur Übersichtlichkeit
* Verwendung von LocalStorage ohne Xampp
* Verwendung des Keywords "Include"



## Verwendete Mittel:
* Nachgebildetes Frogger Template -> (eigen Erstellung)
* Nachgebildetes Totenkopf Bild   -> (eigen Erstellung)  
* Frog Sound:                     -> http://soundbible.com/about.php
* Car crash Sound:                -> http://soundbible.com/about.php
* Water Sound:                    -> http://soundbible.com/about.php
* Musik:                          -> https://www.youtube.com/watch?v=bhWRYaGkqMw


## Dokumentation

### Klassen und Methoden 
* move()
* checkOn()

### Functionen
* createObjects()			  -> Objekterstellung Levelspezifisch
  
* soundsOff()                 -> Ein und ausschalten von Sounds
* playSound()                 -> Abspielen des Frosch Sounds
* dead()                      -> Bei Tot ausgeführte Function
* checkWin()                  -> Prüfung auf Gewinn
* sleep()                     -> Wait Function durch Pomiss return
* document.body.onkeydown()   -> tastatur Eingabe
* document.body.onkeyup()     -> tastatur Eingabe
* checkWater()                -> Prüfung ob Frosch im Wasser
* drawFrog()                  -> Zeichnen des Frosches
* drawLine()                  -> Linien zwischen den Autos malen
* checkScore()                -> Prüfung ob neuer Score erreicht wurde
* moveObjects()               -> Bewegung aller Objecte
* checkOnSaveObject()         -> Prüfung ob Forsch auf Wasser Object ist
* drawBackground()            -> Zeichnen des Hintergrundes
* gameLoop()                  -> Schleife für Zeichnung und Prüfung ??? retro-game.js 75
* Star()                      -> Stern der eingesammelt werden kann
* drawStar()                  -> Zeichnen des Sterns
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

### Objekte
* Frog Json Object
* Spiel object
* content Canvas Objekt
* Theme Bild Object
* JumpSound Sound Object
* WaterSplasch Sound Object
* Crash Sound Object
