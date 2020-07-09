var socket = io();

const label = document.getElementById("lblNuevoTicket");

socket.on('connect', () => {
    console.log('Usuario conectado');  
});

socket.on('disconnect', () => {
    console.log("Usuario desconectado");
});

  socket.on("estadoActual", (respuesta) => {
    label.innerText = respuesta.actual;
  });

document.getElementById('generarTicket').addEventListener('click', () => {
    socket.emit('siguienteTicket', null, siguienteTicket => {
        label.innerText = siguienteTicket;
    })
})