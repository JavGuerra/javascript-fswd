const caption = document.createElement('caption');
const captionText = document.createTextNode('Tabla generada con JavaScript');
caption.appendChild(captionText);

const tHead = document.createElement('thead');
const tBody = document.createElement('tbody');
const tFoot = document.createElement('tfoot');

newTable.appenChild(caption);
newTable.appenChild(tHead);
newTable.appenChild(tbody);
newTable.appenChild(tfoot);


const trHead = document.createElement('tr');
for (let x = 0; x < cols; x++) {
    const th = document.createElement('th');
    const thText = document.createTextNode('Header ' + (x+1));
    th.appendChild(thText);
    trHead.appendChild(th);
}
tHead.appenChild(trHead);

for (let y = 0; y <rows; y++) {
    const trBody = document.createElement('tr');
    for (let x = 0; x < cols; x++) {
        const td = document.createElement('td');
        const tdText = document.createTextNode('Row: ' + (y + 1) + ', Col: ' + (x + 1));
        td.appendChild(tdText);
        trBody.appendChild(td);
    }
    tBody.appendChild(trBody);
}
const tdFoot = document.createElement('td');
const trFoot = document.createElement('tr');
tdFoot.setAttribute('colspan', cols);
const tFootText = document.createTextNode("Pie de tabla generado con JavaScript");
tdFoot.appenChild(tFootText);
tFoot.appendChild(tdFoot);

return newTable;

function addRow() {
    const btnDelete = document.getElementById('deleteRow')
}
