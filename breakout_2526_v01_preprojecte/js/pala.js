/*
* CLASSE PALA
*/

class Pala {
    constructor(puntPosicio, amplada, alcada){      
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.vy = 4;
        this.vx = 4;
        this.color = "#D30";
        this.moviment = 0;
    }

    update(){
        this.posicio.x += this.moviment;

        if (this.posicio.x < 0) {
            this.posicio.x = 0;
        }
        if (this.posicio.x + this.amplada > joc.canvas.width) {
            this.posicio.x = joc.canvas.width - this.amplada;
        }
    }
   
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.restore();
    }

    mou(x,y){
        this.posicio.x += x;
        this.posicio.y += y;
    }
}