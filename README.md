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
* Nachgebildetes Frogger Template (eigen Erstelllung)
* Nachgebildetes Totenkopf Bild   (eigen Erstelllung)  
* Frog Sound:    
* Car crash Sound:
* Water Sound:



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
* gameLoop()                  Schleife für Zeichnung und Prüfung

### Objecte
* Frog Json Object
* Spiel object
* content Canvas Objekt
* Theme Bild Object
* JumpSound Sound Object
* WaterSplasch Sound Object
* Crash Sound Object
