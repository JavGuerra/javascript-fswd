let intervalo = spin = 0;
let aciertos = 0;
let puntuaciones = [];

const elDialogo = el('#error'  );
const elMsgErr  = el('#msgErr' );
const btnAcepta = el('#aceptar');
const elZona    = el('#zona'   );
const elBienven = el('#bienven');
const elCuestio = el('#cuestio');
const elResulta = el('#resulta');
const elPuntua  = el('#puntos' );
const btnJugar  = el('#jugar'  );
const btnFinal  = el('#final'  );
const btnInicio = el('#inicio' );

btnAcepta.onclick = cierraDialogo;
btnJugar.onclick  = jugar;
btnFinal.onclick  = final;
btnInicio.onclick = inicio;


// Pruebas:
// abreDialogo('Mensaje de ejemplo.');

// ponSpin(true);
// setTimeout(() => ponSpin(false), 5000);

// consultaAPI('html://dsdsfsfs.ssd', () => {console.log('hecho')});

if(existeClave('puntuaciones')) tablaDePuntuaciones();

function jugar() {
    muestra(elBienven, false);
    muestra(elCuestio, true);
    aciertos = Math.floor(Math.random() * (10 - 0)) + 0;
}

function final() {
    html(elPuntua, aciertos, true);
    muestra(elCuestio, false);
    muestra(elResulta, true);
    guardarPuntuacion();
}

function inicio() {
    muestra(elResulta, false);
    muestra(elBienven, true);
    if(existeClave('puntuaciones')) tablaDePuntuaciones();
}

function tablaDePuntuaciones() {
    puntuaciones = JSON.parse(localStorage.puntuaciones);
    //Mostrar datos//
    for (let i = 0; i < puntuaciones.length; i++) {
        console.log(puntuaciones[i].aciertos, puntuaciones[i].fechaHora);
    }
}

function guardarPuntuacion() {
    let hoy = new Date();
    let fecha = `${digitos(hoy.getDate())}-${digitos(hoy.getMonth() + 1)}-${hoy.getFullYear()}`;
    let hora = `${digitos(hoy.getHours())}:${digitos(hoy.getMinutes())}:${digitos(hoy.getSeconds())}`;
    let fechaHora = fecha + ' ' + hora;
    let puntuacion = {'aciertos': aciertos, 'fechaHora': fechaHora};
    if(existeClave('puntuaciones')) {
        puntuaciones = JSON.parse(localStorage.puntuaciones);
    }
    puntuaciones.push(puntuacion);
    localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones));    
}