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
    mostrarMensajeFinal() {

        let resultat =
            localStorage.getItem("resultat");

        let punts =
            localStorage.getItem("punts");

        let nick =
            localStorage.getItem("nick");

        if(resultat === null){
            return;
        }
        console.log(resultat, punts, nick);
        const mensaje = document.createElement("div");

        mensaje.classList.add("mensaje-final");

        mensaje.innerHTML = `

            <div class="mensaje-contenido">

                <h2>${resultat}</h2>

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

        document.body.appendChild(mensaje);

        document
            .getElementById("btn-jugar")
            .addEventListener("click", () => {

                localStorage.removeItem("resultat");

                localStorage.removeItem("punts");

                window.location.href = "index.html";
            });

        document
            .getElementById("btn-cerrar")
            .addEventListener("click", () => {

                mensaje.remove();

                localStorage.removeItem("resultat");

                localStorage.removeItem("punts");
            });
    }

    comencarJoc() {

        let nick = this.nick.value.trim();

        if(nick === ""){

            alert("Introdueix un nickname");

            return;
        }

        let dificultat =
            this.dificultat.value;

        localStorage.setItem("nick", nick);

        localStorage.setItem(
            "dificultat",
            dificultat
        );

        let vides = 3;

        if(dificultat == "facil"){

            vides = 5;
        }
        else if(dificultat == "normal"){

            vides = 3;
        }
        else if(dificultat == "dificil"){

            vides = 1;
        }

        localStorage.setItem("vides", vides);

        localStorage.setItem("punts", 0);

        window.location.href = "index.html";
    }
}

window.onload = () => {

    new Menu();
};