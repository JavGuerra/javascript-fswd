let haySpins = spin = 0;
let aciertos = 0;
let puntuaciones = [];

const elDialogo = el('#error'  );
const elMsgErr  = el('#msgErr' );
const btnAcepta = el('#aceptar');
const elZona    = el('#zona'   );

const elBienven = el('#bienven');
const elTabla   = el('#tabla'  );
const elCuestio = el('#cuestio');
const elResulta = el('#resulta');
const elPuntua  = el('#puntos' );
const btnJuego  = el('#juego'  );
const btnFinal  = el('#final'  );
const btnInicio = el('#inicio' );

btnAcepta.onclick = cierraDialogo;

btnJuego.onclick  = juego;
btnFinal.onclick  = final;
btnInicio.onclick = inicio;

if(localStorage.puntuaciones) muestraPuntuaciones();

/**
 * Inicia las acciones relacionadas con el cuestionario
 */
function juego() {
    muestra(elBienven, false);
    muestra(elCuestio, true);
    aciertos = Math.floor(Math.random() * (10 - 0)) + 0;
}

/**
 * Inicia las acciones relacionadas con el final del juego
 */
function final() {
    ponAguja(aciertos);
    ponHTML(elPuntua, aciertos, true);
    muestra(elCuestio, false);
    muestra(elResulta, true);
    guardaPuntuacion();
}

/**
 * Inicia las acciones relacionadas con el inicio del juego tras una partida
 */
function inicio() {
    ponHTML(elTabla, '', true);
    muestra(elResulta, false);
    muestra(elBienven, true);
    if(localStorage.puntuaciones) muestraPuntuaciones();
}

/**
 * Muestra la tabla de puntuaciones almacenadas en localStorage
 */
function muestraPuntuaciones() {
    ponSpin(true);
    ponBtnInactivo(btnJuego, true);

    puntuaciones = JSON.parse(localStorage.puntuaciones);

    // Tabla para mostrar datos //
    for (let i = 0; i < puntuaciones.length; i++) {

        // Sustituir la línea siguiente por la tabla //
        console.log(puntuaciones[i].aciertos, puntuaciones[i].fechaHora);

        // La tabla debe ponerse dentro del elemento 'elTabla' (ver línea 11).
    }

    ponSpin(false);
    ponBtnInactivo(btnJuego, false);
}

/**
 * Guarda la puntuación del cuestionario realizado
 */
function guardaPuntuacion() {
    ponSpin(true);
    ponBtnInactivo(btnInicio, true);

    let fechaHora  = fechaHoraActual();
    let puntuacion = {'aciertos': aciertos, 'fechaHora': fechaHora};

    if(localStorage.puntuaciones) {
        puntuaciones = JSON.parse(localStorage.puntuaciones);
    }
    puntuaciones.push(puntuacion);
    localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones)); 
    
    ponSpin(false);
    ponBtnInactivo(btnInicio, false);
}