class Menu {

    constructor() {

        this.nick = document.getElementById("nick");

        this.dificultat =
            document.getElementById("dificultat");

        this.btnIniciar =
            document.getElementById("btnIniciar");

        this.inicialitzar();
    }

    inicialitzar() {

        this.mostrarRecords();
        this.mostrarMensajeFinal();

        this.btnIniciar.addEventListener("click", () => {

            this.comencarJoc();
        });
    }
    mostrarRecords(){

    let records =
        JSON.parse(
            localStorage.getItem("records")
        ) || [];

    let contenidor =
        document.getElementById("menuRecords");

    contenidor.innerHTML = "";
    if(records.length == 0){

        contenidor.innerHTML =
            "<p>No hi ha records</p>";

        return;
    }
    for(let r of records){

        contenidor.innerHTML += `

            <p>

                ${r.nick} - ${r.punts}

            </p>
        `;
    }
}
    mostrarMensajeFinal(){

    let resultat =
        localStorage.getItem("resultat");

    let punts =
        localStorage.getItem("punts");

    let nick =
        localStorage.getItem("nick");

    if(resultat === null){
        return;
    }

    const mensaje =
        document.createElement("div");

    mensaje.classList.add("mensaje-final");


    if(resultat === "VICTORIA"){

        let dificultat =
            localStorage.getItem("dificultat");

        let seguentNivell = "";

        if(dificultat === "facil"){

            seguentNivell = "NORMAL";
        }
        else if(dificultat === "normal"){

            seguentNivell = "DIFICIL";
        }

        if(dificultat === "dificil"){

            mensaje.innerHTML = `

                <div class="mensaje-contenido">

                    <h2>HAS COMPLETAT EL JOC!</h2>

                    <p>Jugador: ${nick}</p>

                    <p>Puntuació Final: ${punts}</p>

                    <div class="botones-final">

                        <button id="btn-cerrar">

                            Tancar

                        </button>

                    </div>

                </div>
            `;
        }
        else{

            mensaje.innerHTML = `

                <div class="mensaje-contenido">

                    <h2>HAS GUANYAT!</h2>

                    <p>Jugador: ${nick}</p>

                    <p>Puntuació: ${punts}</p>

                    <p>

                        Vols passar al nivell
                        ${seguentNivell}?

                    </p>

                    <div class="botones-final">

                        <button id="btn-seguent">

                            Següent nivell

                        </button>

                        <button id="btn-cerrar">

                            Tancar

                        </button>

                    </div>

                </div>
            `;
        }
    }

    else{

        mensaje.innerHTML = `

            <div class="mensaje-contenido">

                <h2>GAME OVER</h2>

                <p>Jugador: ${nick}</p>

                <p>Puntuació: ${punts}</p>

                <div class="botones-final">

                    <button id="btn-jugar">

                        Tornar a jugar

                    </button>

                    <button id="btn-cerrar">

                        Tancar

                    </button>

                </div>

            </div>
        `;
    }

    document.body.appendChild(mensaje);


    let btnJugar =
        document.getElementById("btn-jugar");

        if(btnJugar){

    btnJugar.addEventListener("click", () => {

        let puntsGuardats =

            parseInt(
                localStorage.getItem(
                    "puntsNivellAnterior"
                )
            ) || 0;
        localStorage.setItem(
            "punts",
            puntsGuardats
        );

        localStorage.removeItem(
            "resultat"
        );

        window.location.href =
            "index.html";
    });
}

    let btnSeguent =
        document.getElementById("btn-seguent");

    if(btnSeguent){

       btnSeguent.addEventListener("click", () => {

    let dificultat =
        localStorage.getItem(
            "dificultat"
        );

    if(dificultat === "facil"){

        localStorage.setItem(
            "dificultat",
            "normal"
        );

        localStorage.setItem(
            "vides",
            3
        );
    }
    else if(dificultat === "normal"){

        localStorage.setItem(
            "dificultat",
            "dificil"
        );

        localStorage.setItem(
            "vides",
            2
        );
    }

    localStorage.setItem(
        "continuarPartida",
        "true"
    );

    localStorage.removeItem(
        "resultat"
    );

    window.location.href =
        "index.html";
});
    }

    let btnCerrar =
        document.getElementById("btn-cerrar");

    if(btnCerrar){

        btnCerrar.addEventListener("click", () => {

            mensaje.remove();

            localStorage.removeItem("resultat");
        });
    }
}

    comencarJoc() {

    let nick = this.nick.value.trim();

    if(nick === ""){

        alert("Introdueix un nickname");

        return;
    }

    let dificultat =
        this.dificultat.value;

    localStorage.setItem(
        "nick",
        nick
    );

    localStorage.setItem(
        "dificultat",
        dificultat
    );

    let vides = 3;

    if(dificultat === "facil"){

        vides = 5;
    }
    else if(dificultat === "normal"){

        vides = 3;
    }
    else if(dificultat === "dificil"){

        vides = 2;
    }
    localStorage.setItem(
        "vides",
        vides
    );
    localStorage.setItem(
        "punts",
        0
    );
    localStorage.removeItem(
        "puntsNivellAnterior"
    );

    localStorage.removeItem(
        "resultat"
    );

    window.location.href =
        "index.html";
}
    passarSeguentNivell(){

    let dificultat =
        localStorage.getItem("dificultat");

    if(dificultat == "facil"){

        localStorage.setItem(
            "dificultat",
            "normal"
        );

        localStorage.setItem(
            "vides",
            3
        );
    }

    else if(dificultat == "normal"){

        localStorage.setItem(
            "dificultat",
            "dificil"
        );

        localStorage.setItem(
            "vides",
            1
        );
    }

    else{

        alert("Has completat el joc!");

        localStorage.removeItem("resultat");

        return;
    }

    localStorage.removeItem("resultat");

    window.location.href = "index.html";
}
}

window.onload = () => {

    new Menu();
};