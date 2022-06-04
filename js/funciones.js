/**
 * Devuelve un elemento solicitado
 * @param {string} el elemento a obtener 
 * @returns el elemento solicitado
 */
function el(el) {
    return document.querySelector(el);
}

/**
 * Crea un elemento nuevo dentro de un elemento padre con o sin contenido
 * @param {string} elemento a crear
 * @param {string} padre dentro de donde se creará el elemento
 * @param {string} contenido que contendrá el nuevo elemento (opcional)
 * @returns el elemento añadido
 */
function nuevoEl(elemento, padre, contenido = null) {
    let nuevo = document.createElement(elemento);
    if (contenido) nuevo.innerHTML = contenido;
    return el(padre).appendChild(nuevo);
}

/**
 * Añade contenido dentro de un elemento
 * @param {string} padre elemento donde añadir contenido
 * @param {string} contenido a añadir, ya sea texto o HTML
 * @param {boolean} borra o no el contenido previo (opcional)
 */
function ponHTML(padre, contenido, borra = false) {
    borra ? padre.innerHTML = contenido : padre.innerHTML += contenido;
}

/**
 * Consulta la API en la ruta dada y ejecuta la función callback
 * @param {string} ruta a la API
 * @param {function} callback consulta a ejecutar
 */
function consultaAPI(ruta, callback) {
    ponSpin(true);
    fetch(ruta)
        .then(respuesta => { // fetch() no maneja errores de conexión, luego...
            if (!respuesta.ok) throw Error(respuesta.statusText);
            return respuesta.json();
        })
        .then(data => callback(data))
        .catch(err => abreDialogo(err))
        .finally(ponSpin(false));
}

/**
 * Muestra u oculta un elemento dado
 * @param {object} elemento a cambiar
 * @param {boolean} status mostrar/ocultar
 */
function muestra(elemento, status) {
    elemento.style.display = status ? 'initial' : 'none';
}

/**
 * Cambia el estado activo/inactivo de un botón dado
 * @param {objeto} boton a cambiar
 * @param {boolean} estado al que cambia
 */
function ponBtnInactivo(boton, estado) {
    boton.disabled = estado;
    boton.setAttribute('aria-disabled', estado);
}

/**
 * Abre la ventana modal con un mensaje
 * @param {string} mensaje a mostrar
 */
function abreDialogo(mensaje) {
    html(elMsgErr, mensaje, true);
    elDialogo.showModal();
}

/**
 * Cierra la ventana de mensaje modal
 */
function cierraDialogo() {
    elDialogo.close()
};

/**
 * Activa o desactiva el spin por cada proceso asíncrono
 * @param {boolean} estado
 */
function ponSpin(estado) {
    estado ? spin++ : spin--;

    if (estado && !haySpins) {
        haySpins = setInterval(compruebaSpin, 300);
        elZona.showModal();
    }
}

/**
 * Comprueba si 'spin' ha llegado a cero y desactiva esta comprobación
 */
function compruebaSpin() {
    if (!spin) {
        clearInterval(haySpins);
        haySpins = 0;
        elZona.close(); 
    }
}

/**
 * Si el número es menor que 10, añade un cero delante
 * @param {Number} numero 
 * @returns numero formateado
 */
function dosDigitos(numero) {
    return numero < 10 ? '0' + numero : numero;
}

/**
 * Obtiene la fecha y hora actual
 * @returns fecha y hora formateada
 */
function fechaHoraActual() {
    let ahora = new Date();
    let fecha = `${dosDigitos(ahora.getDate())}-${dosDigitos(ahora.getMonth() + 1)}-${ahora.getFullYear()}`;
    let hora  = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}:${dosDigitos(ahora.getSeconds())}`;
    return fecha + ' ' + hora;
}

/**
 *  Pone la aguja del contador en la posición indicada según 'aciertos'
 * @param {Number} aciertos
 */
function ponAguja(aciertos) {
    const posicionAguja = [
        '0 -.28946 .28839 0 -139.16 -20.501',
        '.089449 -.2753 .27428 .089119 -107.1 -76.177',
        '.17014 -.23418 .23332 .16951 -59.407 -119.22',
        '.23418 -.17014 .16951 .23332 -.74583 -145.42',
        '.2753 -.089449 .089119 .27428 63.14 -152.21',
        '.28946 0 0 .28839 126 -138.93',
        '.2753 .089449 -.089119 .27428 181.67 -106.87',
        '.23418 .17014 -.16951 .23332 224.72 -59.174',
        '.17014 .23418 -.23332 .16951 250.92 -.51273',
        '.089449 .2753 -.27428 .089119 257.71 63.373',
        '0 .28946 -.28839 0 244.42 126.23'
    ]
    el('#aguja').setAttribute('transform', `matrix(${posicionAguja[aciertos]})`);
}