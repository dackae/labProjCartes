/*
* CLASSE TOTXO
*/
class Totxo {

    constructor(
        puntPosicio,
        amplada,
        alcada,
        vida,
        punts,
        color
    ){
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.vida = vida;
        this.punts = punts;
        this.color = color;
        this.tocat = false;
    }
    get area(){

        return this.amplada * this.alcada;
    }

    draw(ctx){

        if(this.tocat){
            return;
        }
        if(this.vida == 3){

            this.color = "#e74c3c";
        }
        else if(this.vida == 2){

            this.color = "#f39c12";
        }
        else if(this.vida == 1){

            this.color = "#2ecc71";
        }
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(

            this.posicio.x,

            this.posicio.y,

            this.amplada,

            this.alcada
        );

        ctx.strokeStyle = "black";

        ctx.lineWidth = 2;

        ctx.strokeRect(

            this.posicio.x,

            this.posicio.y,

            this.amplada,

            this.alcada
        );
        ctx.fillStyle = "white";

        ctx.font = "bold 14px Arial";

        ctx.textAlign = "center";

        ctx.fillText(

            this.vida,

            this.posicio.x + this.amplada / 2,

            this.posicio.y + 14
        );

        ctx.restore();
    }

    puntInteriorRectangle(punt){

        return (

            punt.x >= this.posicio.x &&

            punt.x <= this.posicio.x + this.amplada &&

            punt.y >= this.posicio.y &&

            punt.y <= this.posicio.y + this.alcada
        );
    }
    colisionar(){

        this.vida--;

        if(this.vida <= 0){

            this.tocat = true;

            return this.punts;
        }

        return 0;
    }
}