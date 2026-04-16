var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=4, nColumnes=4;
const tauler= document.getElementById("tauler");
const cartesT=nFiles*nColumnes;

var jocCartes = [
    'carta14', 
];


$(function(){
    const ampladaCarta = 80; 
    const alcadaCarta = 120;
    const separacioH = 20;
    const separacioV = 20;

    let cartasLevantadas = [];
    let bloquearTablero = false;

    $("#btn-iniciar").on("click", function() {
        let dimensions = $("#nivell").val().split("x");
        let files = parseInt(dimensions[0]);
        let columnes = parseInt(dimensions[1]);
        
        generarJoc(files, columnes);
    });

    generarJoc(4, 4);

    function generarJoc(nFiles, nColumnes) {
        const tauler = $("#tauler");
        tauler.empty(); 
        
        cartasLevantadas = [];
        bloquearTablero = false;

        let ampladaTotal = (nColumnes * (ampladaCarta + separacioH)) + separacioH;
        let alcadaTotal = (nFiles * (alcadaCarta + separacioV)) + separacioV;
        
        tauler.css({
            "width" : ampladaTotal + "px",
            "height": alcadaTotal + "px"
        });

        let totalCartes = nFiles * nColumnes;
        let totalParelles = totalCartes / 2;
        let jocCartes = [];

        for (let i = 1; i <= totalParelles; i++) {
            jocCartes.push(i); 
            jocCartes.push(i); 
        }

        jocCartes.sort(() => Math.random() - 0.5);

        let indexCarta = 0;
        for (let f = 1; f <= nFiles; f++) {
            for (let c = 1; c <= nColumnes; c++) {
                let idCarta = jocCartes[indexCarta]; 
                indexCarta++;

                
                let cartaHTML = $(`
                    <div class="carta" id="f${f}c${c}" data-id="${idCarta}">
                        <div class="cara darrera"></div>
                        <div class="cara davant"></div>
                    </div>
                `);

                cartaHTML.css({
                    "left" : ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                    "top"  : ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
                });

                let colImatge = (idCarta - 1) % 13;
                let filaImatge = Math.floor((idCarta - 1) / 13);
                let posX = -(colImatge * 80);
                let posY = -(filaImatge * 120);
                
                cartaHTML.find(".davant").css("background-position", `${posX}px ${posY}px`);

                tauler.append(cartaHTML);
            }
        }

        
        $(".carta").on("click", function(){
            // Si el tablero está bloqueado o la carta ya está girada, no hacemos nada
            if (bloquearTablero || $(this).hasClass("carta-girada")) return;

         
            $(this).addClass("carta-girada");
            cartasLevantadas.push($(this));

            if (cartasLevantadas.length === 2) {
                let carta1 = cartasLevantadas[0];
                let carta2 = cartasLevantadas[1];

                // Comparamos los data-id
                if (carta1.data("id") === carta2.data("id")) {
                   
                    cartasLevantadas = [];
                } else {
                   
                    bloquearTablero = true;
                    
                    setTimeout(() => {
                        carta1.removeClass("carta-girada");
                        carta2.removeClass("carta-girada");
                        
                        // Reseteamos todo para el siguiente turno
                        cartasLevantadas = [];
                        bloquearTablero = false;
                    }, 1000); // 1000 milisegundos = 1 segundo de espera
                }
            }
        });
    }
});