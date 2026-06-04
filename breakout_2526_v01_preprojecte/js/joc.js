/*
* CLASSE JOC
*/

class Joc {

    constructor(canvas, ctx){
        this.ultimaColisioTotxo = Date.now();
        this.potReiniciarBola = false;
        this.canvas = canvas;

        this.ctx = ctx;
        this.punts =
            parseInt(
                localStorage.getItem("punts")
            ) || 0;

        this.vides =
            parseInt(
                localStorage.getItem("vides")
            ) || 3;

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

        let dificultat =
            localStorage.getItem("dificultat");

        for(let f = 0; f < files; f++){
             

            for(let c = 0; c < columnes; c++){

                let x =
                    offsetLeft +
                    c * (amplada + separacio);

                let y =
                    offsetTop +
                    f * (alcada + separacio);

                let vida = 1;

                let punts = 10;

                let color = "#2ecc71";

                if(dificultat === "facil"){

                    vida = 1;

                    punts = 10;

                    color = "#2ecc71";
                }

                else if(dificultat === "normal"){

                    vida = 2;

                    punts = 20;

                    color = "#f39c12";
                }


                else if(dificultat === "dificil"){

                    vida = 3;

                    punts = 30;

                    color = "#e74c3c";
                }

                let totxo = new Totxo(

                    new Punt(x, y),

                    amplada,

                    alcada,

                    vida,

                    punts,

                    color
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
                if(e.keyCode == 82){ // R

                if(joc.potReiniciarBola){

                    joc.reiniciarBola();
                }
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
    }
    actualitzarHUD(){

    document.getElementById(
        "hudPunts"
    ).textContent = this.punts;

    document.getElementById(
        "hudVides"
    ).textContent = this.vides;

    document.getElementById(
        "hudNivell"
    ).textContent =
        localStorage.getItem(
            "dificultat"
        ).toUpperCase();

    if(this.potReiniciarBola){

        document.getElementById(
            "hudReset"
        ).textContent = "PREM R";
    }
    else{

        let segons = Math.max(

            0,

            10 -
            Math.floor(
                (Date.now() -
                this.ultimaColisioTotxo)
                /1000
            )
        );

        document.getElementById(
            "hudReset"
        ).textContent =
            segons + "s";
    }
}

   update(){
    this.bola.update();
    this.pala.update(this.canvas);
    localStorage.setItem(
        "punts",
        this.punts
    );
    if(
        Date.now() -
        this.ultimaColisioTotxo >
        10000
    ){

        this.potReiniciarBola = true;
    }
    else{

        this.potReiniciarBola = false;
    }
    this.actualitzarHUD();
    this.draw();
}

    start(){

        const loop = () => {

            this.update();

            requestAnimationFrame(loop);
        };

        loop();
    }

    reiniciarBola(){

    this.bola.posicio.x =
        this.canvas.width / 2;

    this.bola.posicio.y =
        this.canvas.height / 2;

    let velocitat = 4;

    let angle =

        (Math.random() * Math.PI / 2) +

        Math.PI / 4;

    this.bola.vx =
        Math.cos(angle) * velocitat;

    this.bola.vy =
        -Math.abs(
            Math.sin(angle) * velocitat
        );

    this.ultimaColisioTotxo =
        Date.now();

    this.potReiniciarBola = false;
}
}