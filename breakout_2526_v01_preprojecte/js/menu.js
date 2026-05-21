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

    // Guardamos datos
    localStorage.setItem("nick", nick);
    localStorage.setItem("dificultat", dificultat);

    // Vidas según dificultad
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

    // puntuación inicial
    localStorage.setItem("punts", 0);

    window.location.href = "index.html";
}
}

window.onload = () => {

    new Menu();
};