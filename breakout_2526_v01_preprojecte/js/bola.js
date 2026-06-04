/*
* CLASSE BOLA
*/

class Bola {

    constructor(puntPosicio, radi){

        this.radi = radi;

        this.posicio = puntPosicio;

        this.vx = 3;

        this.vy = -3;

        this.color = "#fff";
    }

    draw(ctx){

        ctx.beginPath();

        ctx.fillStyle = this.color;

        ctx.arc(

            this.posicio.x,

            this.posicio.y,

            this.radi,

            0,

            2 * Math.PI
        );

        ctx.fill();

        ctx.closePath();
    }

    update(){

        let puntActual = this.posicio;

        let puntSeguent = new Punt(

            this.posicio.x + this.vx,

            this.posicio.y + this.vy
        );

        let trajectoria = new Segment(

            puntActual,

            puntSeguent
        );


        if(puntSeguent.y - this.radi < 0){

            this.vy = -this.vy;
        }

        if(puntSeguent.x - this.radi < 0){

            this.vx = -this.vx;
        }

        if(
            puntSeguent.x + this.radi >
            joc.canvas.width
        ){

            this.vx = -this.vx;
        }


        if(
            puntSeguent.y + this.radi >
            joc.canvas.height
        ){

            joc.vides--;

            if(joc.vides <= 0){

                Display.gameOver(joc.punts);

                return;
            }
            this.posicio.x =
                joc.canvas.width / 2;

            this.posicio.y =
                joc.canvas.height / 2;

            this.vx = 3;

            this.vy = -3;

            return;
        }

        if(

            this.vy > 0 &&

            puntSeguent.y + this.radi >=
            joc.pala.posicio.y &&

            puntSeguent.y - this.radi <=
            joc.pala.posicio.y +
            joc.pala.alcada &&

            puntSeguent.x >=
            joc.pala.posicio.x &&

            puntSeguent.x <=
            joc.pala.posicio.x +
            joc.pala.amplada
        ){

            this.posicio.y =
                joc.pala.posicio.y -
                this.radi - 1;

            this.vy = -Math.abs(this.vy);
        }

        for(let totxo of joc.totxos){

            if(!totxo.tocat){

                let colis =

                    this.interseccioSegmentRectangle(

                        trajectoria,

                        totxo
                    );

                if(colis){

                    joc.ultimaColisioTotxo =
                        Date.now();

                    joc.potReiniciarBola = false;
                    let puntsGuanyats =
                        totxo.colisionar();

                    joc.punts += puntsGuanyats;

                    if(

                        colis.vora == "superior" ||

                        colis.vora == "inferior"
                    ){

                        this.vy = -this.vy;
                    }

                    if(

                        colis.vora == "esquerra" ||

                        colis.vora == "dreta"
                    ){

                        this.vx = -this.vx;
                    }

                    break;
                }
            }
        }

        this.posicio.x += this.vx;

        this.posicio.y += this.vy;


        let totsEliminats = true;

        for(let totxo of joc.totxos){

            if(!totxo.tocat){

                totsEliminats = false;
            }
        }

        if(totsEliminats){
        localStorage.setItem(
            "puntsNivellAnterior",
            joc.punts
        );

        Display.victoria(joc.punts);

        return;
}
    }

    interseccioSegmentRectangle(
        segment,
        rectangle
    ){

        let puntI;

        let distanciaI;

        let puntIMin;

        let distanciaIMin = Infinity;

        let voraI;

        let segmentSuperior = new Segment(

            rectangle.posicio,

            new Punt(

                rectangle.posicio.x +
                rectangle.amplada,

                rectangle.posicio.y
            )
        );

        let segmentInferior = new Segment(

            new Punt(

                rectangle.posicio.x,

                rectangle.posicio.y +
                rectangle.alcada
            ),

            new Punt(

                rectangle.posicio.x +
                rectangle.amplada,

                rectangle.posicio.y +
                rectangle.alcada
            )
        );

        let segmentEsquerra = new Segment(

            rectangle.posicio,

            new Punt(

                rectangle.posicio.x,

                rectangle.posicio.y +
                rectangle.alcada
            )
        );

        let segmentDreta = new Segment(

            new Punt(

                rectangle.posicio.x +
                rectangle.amplada,

                rectangle.posicio.y
            ),

            new Punt(

                rectangle.posicio.x +
                rectangle.amplada,

                rectangle.posicio.y +
                rectangle.alcada
            )
        );

        let vores = [

            {
                nom:"superior",
                seg:segmentSuperior
            },

            {
                nom:"inferior",
                seg:segmentInferior
            },

            {
                nom:"esquerra",
                seg:segmentEsquerra
            },

            {
                nom:"dreta",
                seg:segmentDreta
            }
        ];

        for(let v of vores){

            puntI =
                segment.puntInterseccio(v.seg);

            if(puntI){

                distanciaI =

                    Punt.distanciaDosPunts(

                        segment.puntA,

                        puntI
                    );

                if(
                    distanciaI <
                    distanciaIMin
                ){

                    distanciaIMin =
                        distanciaI;

                    puntIMin = puntI;

                    voraI = v.nom;
                }
            }
        }
        if(voraI){

            return {

                pI: puntIMin,

                vora: voraI
            };
        }

        return null;
    }
}