/**
 * Devuelve un elemento solicitado
 * @param {string} el elemento a obtener 
 * @returns el elemento solicitado
 */
function elemento(el) {
    return document.querySelector(el);
}

/**
 * Crea un elemento nuevo dentro de un elemento padre con o sin contenido
 * @param {string} elemento a crear
 * @param {string} padre elemento dentro de donde se creará el elemento
 * @param {string} contenido que contendrá el nuevo elemento (opcional)
 * @returns el elemento añadido
 */
function nuevo(elemento, padre, contenido = null) {
    el = document.querySelector(padre);
    nuevo = document.createElement(elemento);
    if (contenido) nuevo.innerHTML = contenido;
    return el.appendChild(nuevo);
}

/**
 * Añade contenido dentro de un elemento
 * @param {string} elemento donde añadir contenido
 * @param {string} contenido a añadir, ya sea texto o HTML
 * @param {boolean} borra o no el contenido previo (opcional)
 */
function html(elemento, contenido, borra = false) {
    borra ? elemento.innerHTML = contenido : elemento.innerHTML += contenido;
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
function btnInactivo(boton, estado) {
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

    if (estado && !intervalo) {
        intervalo = setInterval(compruebaSpin, 300);
        elZona.showModal();
    }
}

/**
 * Comprueba si 'spin' ha llegado a cero y desactiva esta comprobación
 */
function compruebaSpin() {
    if (!spin) {
        clearInterval(intervalo);
        intervalo = 0;
        elZona.close(); 
    }
}
