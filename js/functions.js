let spins = areSpins = 0;

const elDialog = el('#error' );
const elErrMsg = el('#errMsg');
const btnOK    = el('#ok'    );
const elZone   = el('#zone'  );
const elTotal  = el('#total' );
const elNumQ   = el('#numQ'  );
const elHand   = el('#hand'  );

btnOK.onclick = closeDialog;

/**
 * Obtains a requested element
 * @param {string} el element to be obtained
 * @returns requested element
 */
function el(el) {
    return document.querySelector(el);
}

/**
 * Creates a new element inside a parent element with or without content
 * @param {node} parent within the element to be created
 * @param {string} element to create
 * @param {string} content to contain the new element (optional)
 * @returns the appended element
 */
function createEl(parent, element, content = null) {
    let newEl = document.createElement(element);
    if (content) newEl.innerHTML = content;
    return parent.appendChild(newEl);
}

/**
 * Create a new basic table with the indicated headers and footers
 * @param {node} parent within the table to be created
 * @param {String} id of the table
 * @param {Array} headers list
 * @param {Array} footers list (optional)
 * @returns 'tbody' element
 */
function createTable(parent, id, headers, footers = null) {
    let table, thead, tfoot, tr, th;
    table = createEl(parent, 'table');
    table.setAttribute('id', id);
    thead = createEl(table , 'thead');
    tr    = createEl(thead , 'tr');
    headers.forEach(header => {
        th = createEl(tr, 'th', header);
        th.setAttribute('scope', 'col');
    })
    if (footers) {
        tfoot = createEl(table, 'tfoot');
        tr    = createEl(tfoot, 'tr');
        footers.forEach(footer => {
            createEl(tr, 'td', footer);
        })  
    }
    return createEl(table, 'tbody');
}

/**
 * Adds content inside an element
 * @param {node} parent element where to add content
 * @param {String} content text or HTML
 * @param {Boolean} append the content (optional)
 */
function addHTML(parent, content, append = false) {
    append ? parent.innerHTML += content : parent.innerHTML = content;
}

/**
 * Queries the API on the given address and executes the callback function
 * @param {String} address to API
 * @param {function} callback to be executed
 */
function fetchAPI(address, callback) {
    setSpin(true);
    fetch(address)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => callback(data))
        .catch(err => {openDialog(err); console.log(err)})
        .finally(setSpin(false));
}

/**
 * Show or hide a given element
 * @param {node} element to change
 * @param {Boolean} status show/hide
 */
function showEl(element, status) {
    element.style.display = status ? 'initial' : 'none';
}

/**
 * Changes the disabled status of a given button
 * @param {node} button to change
 * @param {Boolean} status enabled/disabled
 */
function setInactiveBtn(button, status) {
    button.disabled = status;
    button.setAttribute('aria-disabled', status);
}

/**
 * Opens the modal window with a message
 * @param {String} mensaje to show
 */
function openDialog(message) {
    addHTML(elErrMsg, message);
    elDialog.showModal();
}

/**
 * Close the modal window
 */
function closeDialog() {
    elDialog.close()
};

/**
 * Enable or disable spin for each asynchronous process
 * @param {Boolean} status
 */
function setSpin(status) {
    status ? spins++ : spins--;
    if (status && !areSpins) {
        areSpins = setInterval(checkSpin, 300);
        elZone.showModal();
    }
}

/**
 * Check if 'spin' has reached zero to deactivate this verification
 */
function checkSpin() {
    if (!spins) {
        clearInterval(areSpins);
        areSpins = 0;
        elZone.close(); 
    }
}

/**
 * If the number given is less than 10, add a leading zero
 * @param {Number} number 
 * @returns formatted number
 */
function twoDigits(number) {
    return number < 10 ? '0' + number : number;
}

/**
 * Gets the current date and time
 * @returns formatted date and time
 */
function currentDateTime() {
    let now  = new Date();
    let date = `${twoDigits(now.getDate())}-${twoDigits(now.getMonth() + 1)}-${now.getFullYear()}`;
    let time = `${twoDigits(now.getHours())}:${twoDigits(now.getMinutes())}:${twoDigits(now.getSeconds())}`;
    return date + ' ' + time;
}

/**
 * Sets the meter parameters
 * @param {Number} value sum of scores
 * @param {Number} range maximum score per quiz
 * @param {Number} numScores number of possible scores
 * @param {Number} available number of available scores
 * @returns percent
 */
function setMeter(value, range, numScores, available) {
    let max, percent;
    if (available < numScores) max = available;
    else max = numScores;
    max = range * max;
    percent = (value * 100 / max);
    elTotal.setAttribute('value', value);
    elTotal.setAttribute('max', max);
    elTotal.setAttribute('high', max * .8);
    elTotal.setAttribute('optimum', max * .5);
    elTotal.setAttribute('low', max *.2);
    elTotal.textContent = percent + '%'; 
    return percent;  
}

/**
 * Sets the progress bar parameters
 * @param {Number} numQ number of questions per quiz
 * @param {Number} q actual question
 * @returns percent
 */
function setProgress(numQ, q) {
    percent = (q * 100 / numQ);
    elNumQ.setAttribute('value', q);
    elNumQ.textContent = percent + '%';
    return percent;
}

/**
 *  Sets the hand of the counter to the indicated position according to 'hits'.
 * @param {Number} hits
 */
function setHand(hits) {
    const  handPosition = [
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
    elHand.setAttribute('transform', `matrix(${handPosition[hits]})`);
}
