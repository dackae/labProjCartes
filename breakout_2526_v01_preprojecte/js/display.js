class Display {

    static gameOver(punts) {

        localStorage.setItem("resultat", "GAME OVER");

        localStorage.setItem("punts", punts);

        window.location.href = "menu.html";
    }

    static victoria(punts) {

        localStorage.setItem("resultat", "YOU WIN");

        localStorage.setItem("punts", punts);

        window.location.href = "menu.html";
    }
}

function tornarMenu(){

    window.location.href = "menu.html";
}