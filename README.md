# Frogger Retro-Game
Retro Frogger-Spiel mit zusätzlichen Features 

## Download Frogger

```
git clone https://github.com/Frozenyogurt7/Retro-Game.git
```

Die retro-game.html Datei startet das Spiel



## Authors

* **Dirk Soltenborn** Konzept, Planung, Datenschutz, Lizenz, Impressum, Readme, Musik/Bild Lizenzen
* **Yannik Kasper** Programmierung: Spieldynamik, Animationen, Highscore, LocalStorage, Canvas
* **Georg Westbomke** Design, Menu, Schriften, HTML navigation, Icons



### Version
1.1 Bei Anmerkungen oder Fragen bitte an ykasper84@gmail.com wenden
#### Datum: 10.09.2018

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
* credentials.html


## Features
* Ein Stern der auf dem Weg eingesammelt werden kann und zusätzliche Punkte gibt.
* Vorher festgelegte Schwierigkeiten. Höhere Schwierigkeiten geben mehr Punkte
* Ein Leaderbord für die lokale Anwendung
* Schildkröten tauchen ab. (Erst seit neueren Froggern inklusive)
* Rutschen auf glitschigen Schildkröten. (Kein runterfallen)

## Zusätzliches
* Springen zwischen Wasserobjekten beim Treffen der Kante. Gelassen, weil die Schwierigkeit schon hoch genug ist.

## Lizenz und Datenschutz

#### Lizenz
```
License.html  (Apache)
```

#### Datenschutz
```
Datenschutz.html
```

#### Credentials
```
Credentials.html
```

#### Impressum
```
Impressum.html
```

## Dokumentation

### Methoden der Object Klasse
* move()
* checkOn()

### Functionen
* createObjects()			  -> Objekterstellung levelspezifisch
  
* soundsOff()                 -> Ein- und Ausschalten von Sounds
* playSound()                 -> Abspielen des Frosch Sounds
* dead()                      -> Bei Tot ausgeführte Funktion
* checkWin()                  -> Prüfung auf Gewinn
* sleep()                     -> Wait Funktion durch Promiss return
* document.body.onkeydown()   -> Tastatur Eingabe
* document.body.onkeyup()     -> Tastatur Eingabe
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
* newStar()                   -> Die Koordinaten des Sterns ändern 
* gameObjekt()				  -> Level Initialisierung. Objecte werden erstellt
* move()					  -> Object wird mit seinen Eigenschaften bewegt
* checkOn()					  -> Prüfung ob sich der Frosch auf einem Object befindet
* reset()				      -> Bereitet alles vor für einen neuen Versuch		
* onKeyDown()				  -> Tastatur Eingabe abfangen und verarbeiten
* onkeyup()					  -> Zur Prüfung ob die Taste nicht gehalten wird
* deathMenu()				  -> Zeigt das Todes Menü an	
* musicOff()				  -> Schaltet die Musik aus
* startGame()				  -> Lässt das Menü verschwinden um zu spielen
* retry()					  -> Lässt das Todes Menü veschwinden um erneut zu spielen
* setDifficulty()			  -> Setzt die Schwierigkeit und animiert das Menü
* getHighscore()			  -> Holt sich den Highscore aus dem LocalStorage
* setHighscore()			  -> Setzt den Highscore in den LocalStorage	
* setName()                   -> Prüft den eingegebenen Namen auf die Länge
* window.onload()             -> Prüft ob Dokument geladen ist und setzt einen Event Listener

### Objekte
* Frog Json Object
* Spiel object
* Content Canvas Objekt
* Theme Bild Object
* JumpSound Sound Object
* WaterSplasch Sound Object
* Crash Sound Object
