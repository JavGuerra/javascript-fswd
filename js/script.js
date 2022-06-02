let intervalo = spin = 0;
let aciertos = 9;

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

btnJugar.onclick  = jugar;
btnFinal.onclick  = final;
btnInicio.onclick = inicio;
btnAcepta.onclick = cierraVentanaModal;



// abreVentanaModal('Mensaje de ejemplo.');

// ponSpin(true);
// setTimeout(() => ponSpin(false), 5000);



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
