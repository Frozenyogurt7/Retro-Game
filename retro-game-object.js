var createObjects = function () {
    //level one  creation of all objects
                                //X Coor, Y coor, object type, speed, direction, lenght
    vehicle[0] = new gameObject(50, 465, "pink car", 2+difficulty, "left",1)
    vehicle[1] = new gameObject(100, 465, "pink car", 2+difficulty, "left",1)
    vehicle[2] = new gameObject(150, 465, "pink car", 2+difficulty, "left",1)

    vehicle[3] = new gameObject(50, 432, "red car", 4+difficulty, "right",1)
    vehicle[4] = new gameObject(100, 432, "red car", 4+difficulty, "right",1)

    vehicle[5] = new gameObject(50, 396, "white LKW", 1+ difficulty, "left", 1.2)
    vehicle[6] = new gameObject(100, 396, "white LKW", 1+ difficulty, "left", 1.2)

    vehicle[7] = new gameObject(100, 360, "bagger", 2+difficulty, "right",1)
    vehicle[8] = new gameObject(140, 360, "bagger", 2+difficulty, "right",1)
    vehicle[9] = new gameObject(180, 360, "bagger", 2+difficulty, "right",1)
    vehicle[10] = new gameObject(220, 360, "bagger", 2+difficulty, "right",1)

    vehicle[11] = new gameObject(40, 325, "blue car", 2+difficulty, "left",1)
    vehicle[12] = new gameObject(80, 325, "blue car", 2+difficulty, "left",1)


    waterObj[0] = new gameObject(120, 250, "wood line", 0.5 +difficulty, "left", 2.5)
    waterObj[1] = new gameObject(240, 250, "wood line", 0.5 +difficulty, "left", 2.5)
    waterObj[19] = new gameObject(360, 250, "wood line", 0.5 +difficulty, "left", 2.5)
    waterObj[20] = new gameObject(480, 250, "wood line", 0.5 +difficulty, "left", 2.5)


    waterObj[2] = new gameObject(120, 217, "wood line", 1+difficulty, "right", 2.5)
    waterObj[3] = new gameObject(240, 217, "wood line", 1+difficulty, "right", 2.5)
    waterObj[21] = new gameObject(360, 217, "wood line", 1+difficulty, "right", 2.5)
    waterObj[22] = new gameObject(480, 217, "wood line", 1+difficulty, "right", 2.5)

    waterObj[4] = new gameObject(50, 182, "turtle1", 0.1 + difficulty, "left",1)
    waterObj[5] = new gameObject(80, 182, "turtle1", 0.1 + difficulty, "left",1)
    waterObj[6] = new gameObject(110, 182, "turtle1", 0.1 + difficulty, "left",1)

    waterObj[7] = new gameObject(170, 182, "turtle1", 0.1 + difficulty, "left",1)
    waterObj[8] = new gameObject(200, 182, "turtle1", 0.1 + difficulty, "left",1)
    waterObj[9] = new gameObject(230, 182, "turtle1", 0.1 + difficulty, "left",1)

    waterObj[10] = new gameObject(300, 182, "turtle1", 0.1 + difficulty, "left",1)
    waterObj[11] = new gameObject(330, 182, "turtle1", 0.1 + difficulty, "left",1)
    waterObj[12] = new gameObject(360, 182, "turtle1", 0.1 + difficulty, "left",1)

    waterObj[13] = new gameObject(100, 148, "crocodile1", 0.8, "right", 2.5)
    waterObj[14] = new gameObject(200, 148, "crocodile1", 0.8, "right", 2.5)
    waterObj[23] = new gameObject(350, 148, "wood line", 0.8, "right", 2.5)
    waterObj[24] = new gameObject(450, 148, "wood line", 0.8, "right", 2.5)

    waterObj[17] = new gameObject(120, 112, "wood line", 0.1 + difficulty, "left", 2.5)
    waterObj[18] = new gameObject(240, 112, "wood line", 0.1 + difficulty, "left", 2.5)
    waterObj[15] = new gameObject(360, 112, "wood line", 0.1 + difficulty, "left", 2.5)
    waterObj[16] = new gameObject(480, 112, "wood line", 0.1 + difficulty, "left", 2.5)
}

var gameObject = function (x, y, ObjPicture, speed, direc, length) { //parameter x y bzw row and speed have to be given
    this.x = x
    this.y = y
    this.ObjPicture = ObjPicture
    this.speed = speed
    this.direction = direc
    this.lenght = length 


    this.move = function () {
        //move the object method. check if out of bound and then move position to the other bound
        switch (this.direction) {
            case "right":
                this.x <= spiel.width + this.lenght * 40 ? this.x = (this.x + this.speed) : this.x = -this.lenght * 40; //move right // if out of cound move to other side
                break;
            case "left":
                this.x >= (-40 * this.lenght) ? this.x = (this.x - this.speed) : this.x = spiel.width + this.lenght * 40; //move left  // if out of cound move to other side
        }

        //all pictures of objects drawn on there positions
        switch (this.ObjPicture) { //draw objects
            case "pink car":
                                //(picture,oldx,oldy,oldWidth,oldLenght,newX,newY,newWidth,newLenght=
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
                context.drawImage(sprites, 155, 330, 90, 35, this.x, this.y - 7, 90, 35); //crocodile2
                break;
            case "turtle0":
            case "turtle1":
            case "turtle2": //fall through for longer tutrle 4
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
     
        if (frog.x  < (this.x + this.lenght*30) && frog.x +15 > this.x   && frog.y <= this.y + 10 && frog.y >= this.y - 10) {
            //true if frog in hitbox
            return true

        }


    }
}

