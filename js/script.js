let intervalo = spin = 0;

const elDialogo = elemento('#error'  );
const elMsgErr  = elemento('#msgErr' );
const btnAcepta = elemento('#aceptar');
const elZona    = elemento('#zona'   );

const elBienven = elemento('#bienven');
const elCuestio = elemento('#cuestio');
const elResulta = elemento('#resulta');

btnAcepta.onclick = cierraVentanaModal;


// abreVentanaModal('Mensaje de ejemplo.');

ponSpin(true);
setTimeout(() => ponSpin(false), 5000);