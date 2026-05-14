/*
* CLASSE JOC
*/

let filesMur = 3;
let columnesMur = 10;
class Joc{
    constructor(canvas,ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;
       

        this.bola = new Bola(new Punt(this.canvas.width/2,this.canvas.height/2),3);
        this.pala = new Pala(new Punt((this.canvas.width-60)/2,this.canvas.height-15),60,4);
        this.totxo = new Totxo(new Punt((this.canvas.width-120)/2,(this.canvas.height-20)/3), 120, 20, "#0ad");  // només posem un totxo gegant
        crearMur();

        this.key = {
            LEFT:{code:37, pressed:false},
            RIGHT:{code:39, pressed:false}
        };      
    }

    draw(){
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);


    }
    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }

    inicialitza(){
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);
        $(document).on("keydown",{joc:this}, function(e){
           //Moviment de la pala
        });
        $(document).on("keyup", {joc:this}, function(e){
            //Moviment de la pala
        });

        
    }

    update(){
        this.bola.update(this.canvas, this.mur);
        this.pala.update();
        this.draw();       

    }

    crearMur(totxo){
        this.mur = Array<Totxo> [];
        for(let j; j<filesMur; j++) {
            for(let i; i<columnesMur; i++){
                this.mur += new Totxo (new Punt (this.canvas.width/columnesMur * i, this.canvas.height/10 * j), this.totxoamplada, this.totxoalcada);
            }
        }
    }
}