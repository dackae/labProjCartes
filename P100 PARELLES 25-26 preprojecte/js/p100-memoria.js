$(function(){
    let ampladaCarta = 0;
    let alcadaCarta = 0;
    let separacioH = 0;
    let separacioV = 0;
    let columnaPerBaralla= 0;

    let cartasLevantadas = [];
    let bloquearTablero = false;
    let juegoTerminado = false;

    let parejasEncontradas = 0;
    let totalParejas = 0;
    let contadorClicks = 0;
    let maxClicks = 0;

    let tiempoRestante = 0;
    let temporizador = null;

    let nFilesActual = 4;
    let nColumnesActual = 4;

    $("#btn-iniciar").on("click", iniciarDesdeSelector);

    let mensajeInicial = $("#mensajeInicial");
    let baralla;

    function iniciarDesdeSelector() {
        let dimensions = $("#nivell").val().split("x");
        baralla = $("#cartes").val();
        console.log(baralla);

        switch (baralla) {
            case "deck": {
                ampladaCarta = 80;
                alcadaCarta = 120;
                separacioH = 20;
                separacioV = 20;
                columnaPerBaralla = 13;
                break;
            }

            case "poker1": {
                ampladaCarta = 79;
                alcadaCarta = 120;
                separacioH = 20;
                separacioV = 20;
                columnaPerBaralla = 13;
                break;
            }

            case "pokemon": {
                ampladaCarta = 111;
                alcadaCarta = 111;
                separacioH = 20;
                separacioV = 20;
                columnaPerBaralla = 7;
                break;
            }
        }
        console.log(ampladaCarta);

        generarJoc(parseInt(dimensions[0]), parseInt(dimensions[1]));
    }

    function generarJoc(nFiles, nColumnes) {

        if (mensajeInicial) {
            mensajeInicial.remove();
        }

        juegoTerminado = false;

        nFilesActual = nFiles;
        nColumnesActual = nColumnes;

        resetEstado();
        configurarTauler(nFiles, nColumnes);

        let jocCartes = crearCartes(nFiles, nColumnes);
        pintarCartes(nFiles, nColumnes, jocCartes);

        totalParejas = (nFiles * nColumnes) / 2;
        parejasEncontradas = 0;

        inicializarContador(nFiles, nColumnes);
        iniciarTemporizador(nFiles, nColumnes);

        asignarEventos();
    }

    function resetEstado() {
        cartasLevantadas = [];
        bloquearTablero = false;
        $("#tauler").empty();
        $(".mensaje-final").remove();
        clearInterval(temporizador);
    }

    function configurarTauler(nFiles, nColumnes) {
        let ampladaTotal = (nColumnes * (ampladaCarta + separacioH)) + separacioH;
        let alcadaTotal = (nFiles * (alcadaCarta + separacioV)) + separacioV;

        $("#tauler").css({
            width: ampladaTotal + "px",
            height: alcadaTotal + "px",
            position: "relative"
        });

        document.documentElement.style.setProperty("--amplada-carta", ampladaCarta + "px");
        document.documentElement.style.setProperty("--alcada-carta", alcadaCarta + "px");

    }

    function crearCartes(nFiles, nColumnes) {
        let totalParelles = (nFiles * nColumnes) / 2;
        let cartes = [];

        for (let i = 1; i <= totalParelles; i++) {
            cartes.push(i, i);
        }

        return cartes.sort(() => Math.random() - 0.5);
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
                <div class="cara darrera ` + baralla + `"></div>
                <div class="cara davant ` + baralla + `"></div>
            </div>
        `);
        
        carta.css({
            position: "absolute",
            left: ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
            top: ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
        });

        let col = (idCarta - 1) % columnaPerBaralla;
        let fila = Math.floor((idCarta - 1) / columnaPerBaralla);

        carta.find(".davant").css("background-position", 
            `${-(col * ampladaCarta)}px ${-(fila * alcadaCarta)}px`
        );


        return carta;
    }

    function asignarEventos() {
        $(".carta").off("click").on("click", manejarClickCarta);
    }

    function manejarClickCarta() {
        if (bloquearTablero || juegoTerminado || $(this).hasClass("carta-girada")) return;

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

            actualizarMarcador();

            setTimeout(() => {
                carta1.addClass("solucionado");
                carta2.addClass("solucionado");
            }, 400);

            comprobarVictoria();
        } else {
            bloquearTablero = true;

            setTimeout(() => {
                if (juegoTerminado) return;

                carta1.removeClass("carta-girada");
                carta2.removeClass("carta-girada");

                cartasLevantadas = [];
                bloquearTablero = false;
            }, 900);
        }
    }

    function comprobarVictoria() {
        if (parejasEncontradas === totalParejas) {
            mostrarMensajeFinal("Has ganado ¿quieres volver a jugar?");
        }
    }

    function inicializarContador(nFiles, nColumnes) {
        maxClicks = (nFiles * nColumnes) * 3;
        contadorClicks = 0;
        actualizarMarcador();
    }

    function registrarClick() {
        contadorClicks++;
        actualizarMarcador();

        if (contadorClicks >= maxClicks) {
            setTimeout(() => {
                animacionDerrota("Has perdido. Demasiados clicks");
            }, 300);
        }
    }
    function actualizarMarcador() {
        $("#parelles").text(parejasEncontradas);
        $("#clics").text(contadorClicks);
        $("#clics-restants").text(maxClicks - contadorClicks);
    }

    // ---------- TEMPORIZADOR ----------
    function iniciarTemporizador(nFiles, nColumnes) {
        clearInterval(temporizador);

        tiempoRestante = (nFiles * nColumnes) * 5;
        $("#tiempo").text(tiempoRestante);

        temporizador = setInterval(() => {
            if (juegoTerminado) return;

            tiempoRestante--;
            $("#tiempo").text(tiempoRestante);

            if (tiempoRestante <= 0) {
                clearInterval(temporizador);
                animacionDerrota("Se ha acabado el tiempo");
            }
        }, 1000);
    }
   
    function mostrarCartasEnCascada() {
        let cartas = $(".carta").not(".solucionado");

        cartas.each(function(index) {
            setTimeout(() => {
                $(this).addClass("carta-girada");
            }, index * 80); 
        });
    }
    function animacionDerrota(texto) {
        if (juegoTerminado) return;

        juegoTerminado = true;
        bloquearTablero = true;
        clearInterval(temporizador);

        mostrarCartasEnCascada();

        setTimeout(() => {
            mostrarMensajeFinal(texto);
        }, $(".carta").length * 80);
    }

    function mostrarMensajeFinal(texto) {
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