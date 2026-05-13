class Menu {

    constructor() {

        this.nick = document.getElementById("nick");

        this.dificultat = document.getElementById("dificultat");

        this.btnIniciar = document.getElementById("btnIniciar");

        this.menuMissatgeFinal =
            document.getElementById("menuMissatgeFinal");

        this.inicialitzar();
    }

    inicialitzar() {

        this.mostrarResultatAnterior();

        this.btnIniciar.addEventListener("click", () => {

            this.comencarJoc();
        });
    }

    mostrarResultatAnterior() {

        let resultat = localStorage.getItem("resultat");

        let punts = localStorage.getItem("punts");

        if(resultat !== null){

            this.menuMissatgeFinal.innerHTML =

            `
                <h2>${resultat}</h2>
                <p>Puntuació: ${punts}</p>
            `;
        }
    }

    comencarJoc() {

        let nick = this.nick.value.trim();

        if(nick === ""){

            alert("Introdueix un nickname");

            return;
        }

        let dificultat = this.dificultat.value;

        localStorage.setItem("nick", nick);

        localStorage.setItem("dificultat", dificultat);

        window.location.href = "index.html";
    }
}

window.onload = () => {

    new Menu();
};