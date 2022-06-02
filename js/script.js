let intervalo = spin = 0;
let aciertos = 0;

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


function jugar() {
    muestra(elBienven, false);
    muestra(elCuestio, true);
}

function final() {
    html(elPuntua, aciertos, true);
    muestra(elCuestio, false);
    muestra(elResulta, true);
}

function inicio() {
    muestra(elResulta, false);
    muestra(elBienven, true);
}
