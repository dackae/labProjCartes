$(function(){
    const ampladaCarta = 80; 
    const alcadaCarta = 120;
    const separacioH = 20;
    const separacioV = 20;

    let cartasLevantadas = [];
    let bloquearTablero = false;

    let parejasEncontradas = 0;
    let totalParejas = 0;
    let contadorClicks = 0;
    let maxClicks = 0;

    let nFilesActual = 4;
    let nColumnesActual = 4;

    $("#btn-iniciar").on("click", iniciarDesdeSelector);

    generarJoc(4, 4);

    function iniciarDesdeSelector() {
        let dimensions = $("#nivell").val().split("x");
        let files = parseInt(dimensions[0]);
        let columnes = parseInt(dimensions[1]);

        generarJoc(files, columnes);
    }

    function generarJoc(nFiles, nColumnes) {
        nFilesActual = nFiles;
        nColumnesActual = nColumnes;

        resetEstado();
        configurarTauler(nFiles, nColumnes);

        let jocCartes = crearCartes(nFiles, nColumnes);
        pintarCartes(nFiles, nColumnes, jocCartes);

        totalParejas = (nFiles * nColumnes) / 2;
        parejasEncontradas = 0;
        inicializarContador(nFiles, nColumnes);

        asignarEventos();
    }

    function resetEstado() {
        cartasLevantadas = [];
        bloquearTablero = false;
        $("#tauler").empty();
        $(".mensaje-final").remove();
    }

    function configurarTauler(nFiles, nColumnes) {
        let ampladaTotal = (nColumnes * (ampladaCarta + separacioH)) + separacioH;
        let alcadaTotal = (nFiles * (alcadaCarta + separacioV)) + separacioV;

        $("#tauler").css({
            width: ampladaTotal + "px",
            height: alcadaTotal + "px"
        });
    }

    function crearCartes(nFiles, nColumnes) {
        let totalParelles = (nFiles * nColumnes) / 2;
        let cartes = [];

        for (let i = 1; i <= totalParelles; i++) {
            cartes.push(i, i);
        }

        return barrejar(cartes);
    }

    function barrejar(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function pintarCartes(nFiles, nColumnes, jocCartes) {
        let indexCarta = 0;

        for (let f = 1; f <= nFiles; f++) {
            for (let c = 1; c <= nColumnes; c++) {
                let idCarta = jocCartes[indexCarta++];
                let carta = crearCartaHTML(f, c, idCarta);

                $("#tauler").append(carta);
            }
        }
    }

    function crearCartaHTML(f, c, idCarta) {
        let carta = $(`
            <div class="carta" data-id="${idCarta}">
                <div class="cara darrera"></div>
                <div class="cara davant"></div>
            </div>
        `);

        posicionarCarta(carta, f, c);
        asignarImagen(carta, idCarta);

        return carta;
    }

    function posicionarCarta(carta, f, c) {
        carta.css({
            left: ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
            top: ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
        });
    }

    function asignarImagen(carta, idCarta) {
        let col = (idCarta - 1) % 13;
        let fila = Math.floor((idCarta - 1) / 13);

        let posX = -(col * ampladaCarta);
        let posY = -(fila * alcadaCarta);

        carta.find(".davant").css("background-position", `${posX}px ${posY}px`);
    }

    function asignarEventos() {
        $(".carta").on("click", manejarClickCarta);
    }

    function manejarClickCarta() {
        if (bloquearTablero || $(this).hasClass("carta-girada")) return;

        registrarClick();

        $(this).addClass("carta-girada");
        cartasLevantadas.push($(this));

        if (cartasLevantadas.length === 2) {
            compararCartas();
        }
    }

    function compararCartas() {
        let [carta1, carta2] = cartasLevantadas;

        if (carta1.data("id") === carta2.data("id")) {
            parejasEncontradas++;
            cartasLevantadas = [];
            borrarCarta(carta1);
            borrarCarta(carta2);
            comprobarVictoria();
        } else {
            bloquearTablero = true;
            ocultarCartas(carta1, carta2);
        }
    }

    function ocultarCartas(carta1, carta2) {
        setTimeout(() => {
            carta1.removeClass("carta-girada");
            carta2.removeClass("carta-girada");

            cartasLevantadas = [];
            bloquearTablero = false;
        }, 1000);
    }

    function borrarCarta(carta) {
        setTimeout(() => {
            $(carta).addClass("solucionado");
        }, 1250);
    }
    function comprobarVictoria() {
        if (parejasEncontradas === totalParejas) {
            mostrarMensajeFinal("Has ganado quieres volver a jugar?");
        }
    }

    function inicializarContador(nFiles, nColumnes) {
        let totalCartes = nFiles * nColumnes;
        maxClicks = totalCartes * 3;
        contadorClicks = 0;
    }

    function registrarClick() {
        contadorClicks++;

        if (contadorClicks >= maxClicks) {
            mostrarMensajeFinal(" Has perdido. Demasiados intentos");
        }
    }
    function mostrarMensajeFinal(texto) {
        bloquearTablero = true;

        const mensaje = $(`
            <div class="mensaje-final">
                <h2>${texto}</h2>
                <button id="btn-reset">Volver a jugar</button>
            </div>
        `);

        $("body").append(mensaje);

        $("#btn-reset").on("click", function(){
            generarJoc(nFilesActual, nColumnesActual);
        });
    }
});

 