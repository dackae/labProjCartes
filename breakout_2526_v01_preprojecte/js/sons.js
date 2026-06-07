const sons = {
    "victoria":   new Audio("sounds/victoria.wav"),
    "rebote":     new Audio("sounds/rebote.wav"),
    "perder":     new Audio("sounds/perder.wav"),
    "totxo":  new Audio("sounds/totxo.wav"),
};

function playSound(nom) {
    const so = sons[nom];
    if (!so) return;
    so.currentTime = 0;
    so.play().catch(() => {});
}