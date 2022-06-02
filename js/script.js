let intervalo = spin = 0;
let aciertos = 0;

const elDialogo = elemento('#error'  );
const elMsgErr  = elemento('#msgErr' );
const elZona    = elemento('#zona'   );

const elBienven = elemento('#bienven');
const elCuestio = elemento('#cuestio');
const elResulta = elemento('#resulta');
const elPuntua  = elemento('#puntos' );

const btnJugar  = elemento('#jugar'  );
const btnFinal  = elemento('#final'  );
const btnInicio = elemento('#inicio' );
const btnAcepta = elemento('#aceptar');

btnAcepta.onclick = cierraDialogo;
btnJugar.onclick  = jugar;
btnFinal.onclick  = final;
btnInicio.onclick = inicio;


// Pruebas:
// abreVentanaModal('Mensaje de ejemplo.');

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
