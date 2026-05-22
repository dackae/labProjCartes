/*
* CLASSE JOC
*/

class Joc {

    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.punts = 0;
        this.vides =
            parseInt(localStorage.getItem("vides")) || 3;
        this.bola = new Bola(
            new Punt(
                this.canvas.width / 2,
                this.canvas.height / 2
            ),
            6
        );


        this.pala = new Pala(
            new Punt(
                (this.canvas.width - 100) / 2,
                this.canvas.height - 20
            ),
            100,
            10
        );

        this.totxos = [];

        this.crearTotxos();

        this.key = {

            LEFT:{
                code:37,
                pressed:false
            },

            RIGHT:{
                code:39,
                pressed:false
            }
        };
    }


    crearTotxos(){
        let files = 4;
        let columnes = 8;
        let amplada = 70;
        let alcada = 20;
        let separacio = 10;
        let offsetTop = 50;
        let offsetLeft = 35;
        for(let f = 0; f < files; f++){
            for(let c = 0; c < columnes; c++){
                let x =
                    offsetLeft +
                    c * (amplada + separacio);
                let y =
                    offsetTop +
                    f * (alcada + separacio);
                let totxo = new Totxo(
                    new Punt(x,y),
                    amplada,
                    alcada
                );
                this.totxos.push(totxo);
            }
        }
    }

    inicialitza(){
        $(document).on(
            "keydown",
            {joc:this},
            function(e){
                let joc = e.data.joc;
                if(e.keyCode == 37){
                    joc.pala.moviment =
                        -joc.pala.vx;
                }

                if(e.keyCode == 39){
                    joc.pala.moviment =
                        joc.pala.vx;
                }
            }
        );
        $(document).on(
            "keyup",
            {joc:this},
            function(e){
                let joc = e.data.joc;
                if(
                    e.keyCode == 37 ||
                    e.keyCode == 39
                ){
                    joc.pala.moviment = 0;
                }
            }
        );
    }

    clearCanvas(){
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    draw(){
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        for(let totxo of this.totxos){

            totxo.draw(this.ctx);
        }
        this.ctx.fillStyle = "white";
        this.ctx.font = "16px Arial";
        this.ctx.fillText(
            "Punts: " + this.punts,
            10,
            20
        );

        this.ctx.fillText(
            "Vides: " + this.vides,
            10,
            40
        );
    }
    update(){
        this.bola.update(this.canvas, this.mur);
        this.pala.update(this.canvas);
        this.draw();
    }
    start(){

        const loop = () => {
            this.update();
            requestAnimationFrame(loop);
        };
        loop();
    }
}