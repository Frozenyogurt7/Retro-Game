
export class car{
          
    constructor(){
        this.x = 0
        this.speed = 5
                   
        context.drawImage(sprites, 8, 265, 30, 22, this.x, 460, 30, 22);
    }

    move(){
        console.log(this.x)
        this.x = (this.x + this.speed) % spiel.width
        context.drawImage(sprites, 8, 265, 30, 22, this.x, 460, 30, 22);
    }

    }