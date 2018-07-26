# Frogger Retro-Game

### Autoren: Dirk Soltenborn, Gerorg Westbomke, Yannik Kasper

##Spezifikation:

###Ziel: Nachbildung des Retrospiels Frogger
###Verwendete Mittel: HTML5, CSS, JavaScrpit
###Lauffähig auf: Chrome, Firefox, Opera, InternetExplorer >=8.0 mit Xampp Server


##Verwendete Mittel:
-Nachgebildetes Frogger Template
-Nachgebildetes Totenkopf Bild
-Frog Sound:    
-Car crash Sound:
-Water Sound



##Dokumentation

###Klassen und Methoden
gameObject
move()
checkOn()

###Functionen
createObjects()             Objekterstellung Levelspezifisch
soundsOff()                 Ein und ausschalten von Sounds
playSound()                 Abspielen des Frosch Sounds
dead()                      Bei Tot ausgeführte Function
checkWin()                  Prüfung auf Gewinn
sleep()                     Wait Function durch Pomiss return
document.body.onkeydown()   tastatur Eingabe
document.body.onkeyup()     tastatur Eingabe
checkWater()                Prüfung ob Frosch im Wasser
drawFrog()                  Zeichnen des Frosches
drawLine()                  Linien zwischen den Autos malen
checkScore()                Prüfung ob neuer Score erreicht wurde
moveObjects()               Bewegung aller Objecte
checkOnSaveObject()         Prüfung ob Forsch auf Wasser Object ist
drawBackground()            Zeichnen des Hintergrundes
gameLoop()                  Schleife für Zeichnung und Prüfung

###Objecte
Frog Json Object
Spiel object
content Canvas Objekt
Theme Bild Object
JumpSound Sound Object
WaterSplasch Sound Object
Crash Sound Object
