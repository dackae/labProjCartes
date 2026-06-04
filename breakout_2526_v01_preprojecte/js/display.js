class Display {

  static gameOver(punts) {

    let nick =
        localStorage.getItem("nick");

    let records =
        JSON.parse(
            localStorage.getItem("records")
        ) || [];

    let existent =
        records.find(
            r => r.nick === nick
        );

    if(existent){

        if(punts > existent.punts){

            existent.punts = punts;
        }
    }
    else{

        records.push({
            nick: nick,
            punts: punts
        });
    }

    records.sort(
        (a,b) => b.punts - a.punts
    );

    records = records.slice(0,5);

    localStorage.setItem(
        "records",
        JSON.stringify(records)
    );

    localStorage.setItem(
        "resultat",
        "GAME OVER"
    );

    localStorage.setItem(
        "punts",
        punts
    );

    window.location.href =
        "menu.html";
}
   static victoria(punts) {

    let dificultat =
        localStorage.getItem(
            "dificultat"
        );

    if(dificultat === "dificil"){

        let nick =
            localStorage.getItem(
                "nick"
            );

        let records =
            JSON.parse(
                localStorage.getItem(
                    "records"
                )
            ) || [];

        let existent =
            records.find(
                r => r.nick === nick
            );

        if(existent){

            if(punts > existent.punts){

                existent.punts = punts;
            }
        }
        else{

            records.push({
                nick:nick,
                punts:punts
            });
        }

        records.sort(
            (a,b) => b.punts - a.punts
        );

        records = records.slice(0,5);

        localStorage.setItem(
            "records",
            JSON.stringify(records)
        );
    }

    localStorage.setItem(
        "resultat",
        "VICTORIA"
    );

    localStorage.setItem(
        "punts",
        punts
    );

    window.location.href =
        "menu.html";
}
}

function tornarMenu(){

    window.location.href = "menu.html";
}



function guardarRecord(punts){

    let nick =
        localStorage.getItem("nick");
    let records =
        JSON.parse(
            localStorage.getItem("records")
        ) || [];
    let jugadorExiste = false;

    for(let r of records){

        if(r.nick == nick){

            jugadorExiste = true;


            if(punts > r.punts){

                r.punts = punts;
            }
        }
    }

    if(!jugadorExiste){

        records.push({

            nick: nick,

            punts: punts
        });
    }

    records.sort((a,b) => b.punts - a.punts);
    records = records.slice(0,5);

    localStorage.setItem(

        "records",

        JSON.stringify(records)
    );
}