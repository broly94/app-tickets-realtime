const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
})

const searchParam = new URLSearchParams(window.location.search);

if(!searchParam.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParam.get('escritorio');

let label = document.querySelector('h1 small')
label.innerText = escritorio;
let label2 = document.querySelector('h4 small');

document.querySelector('button').addEventListener('click', () => {
    socket.emit('atenderTicket', {escritorio}, res => {
        if(res.ok === false) {
            label2.innerHTML = "No hay tickets que atender";
        } else {
            label2.innerHTML = res.numero;
        }
    });
})