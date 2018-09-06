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



### Version
1.1 Bei Anmerkungen oder Fragen bitte an ykasper84@gmail.com wenden
#### Datum: 06.09.2018

## Spezifikation:

### Ziel:            
Nachbildung des Retrospiels Frogger mit unterschiedlichen Schwierigkeitsgraden und neueren Features
### Verwendete Mittel: 
HTML5, CSS, JavaScript
### Lauffähig auf:   
Chrome, Firefox, Opera
### Nicht lauffähig auf IE aufgrund der folgenden Funktionaliäten:
* Animationen durch Async Functions und "Await" Keyword
* Verwendung mehrerer JavaScript Dokumente zur Übersichtlichkeit
* Verwendung von LocalStorage ohne Xampp
* Verwendung des Keywords "Include"



## Verwendete Mittel:
#### Credentials.txt
* Nachgebildetes Frogger Template -> (eigen Erstellung)
* Nachgebildetes Totenkopf Bild   -> (eigen Erstellung)  
* Frog Sound:                     -> http://soundbible.com/about.php
* Car crash Sound:                -> http://soundbible.com/about.php
* Water Sound:                    -> http://soundbible.com/about.php
* Musik:                          -> http://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Skate
* Hintergrung                     -> https://www.pexels.com/photo/led-light-signage-1293269/


## Features
* Ein Stern der auf dem Weg eingesammelt werden kann und zusätzliche Punkte gibt.
* Vorher festgelegte Schwierigkeiten. Höhere Schwierigkeiten geben mehr Punkte
* Ein Leaderbord für die locale Anwendung
* Schildkröten tauchen ab. (Erst seit neueren Froggern inclusive)
* Rutschen auf glitschigen Schildkröten. (Kein runterfallen)

## Lizenz und Datenschutz

#### Lizenz
```
LICENCE  (Apache)
```

#### Datenschutz
```
Datenschutz.html
```

## Dokumentation

### Methoden der Object Klasse
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
* gameLoop()                  -> Schleife für Zeichnung und Prüfung 
* Star()                      -> Stern der eingesammelt werden kann
* drawStar()                  -> Zeichnen des Sterns
* newStar()                   -> Die Koordinaten des Sterns ändern sich
* gameObjekt()				  -> Level Initialisierung. Objecte werden erstellt
* move()					  -> Object wird mit seinen Eigenschaften bewegt
* checkOn()					  -> Prüfung ob sich der Frosch auf einem Object befindet
* reset()				      -> Bereitet alles vor für einen neuen Versuch		
* onKeyDown()				  -> Tastaur Eingabe abfangen und verarbeiten
* onkeyup()					  -> Zur Prüfung ob die Taste nicht gehalten wird
* deathMenu()				  -> Zeigt das Todes Menü an	
* musicOff()				  -> Schaltet die Musik aus
* startGame()				  -> Lässt das Menü verschwinden um zu spielen
* retry()					  -> Lässt das Todes Menü veschwinden um erneut zu spielen
* setDifficulty()			  -> Setzt die Schwierigkeit und animiert das Menü
* getHighscore()			  -> Holt sich den Highscore aus dem LocalStorage
* setHighscore()			  -> Setzt den Highscore in den LocalStorage	

### Objekte
* Frog Json Object
* Spiel object
* content Canvas Objekt
* Theme Bild Object
* JumpSound Sound Object
* WaterSplasch Sound Object
* Crash Sound Object
