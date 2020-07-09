const socket = io();

// html static
var lblTicket1 = document.getElementById("lblTicket1");
var lblTicket2 = document.getElementById("lblTicket2");
var lblTicket3 = document.getElementById("lblTicket3");
var lblTicket4 = document.getElementById("lblTicket4");

var lblEscritorio1 = document.getElementById("lblEscritorio1");
var lblEscritorio2 = document.getElementById("lblEscritorio2");
var lblEscritorio3 = document.getElementById("lblEscritorio3");
var lblEscritorio4 = document.getElementById("lblEscritorio4");

var lblTickets = [ lblTicket1, lblTicket2, lblTicket3, lblTicket4 ];
var lblEscritorios = [ lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4 ];

// Sockets
socket.on('connect', () => {
    console.log("Conectado al servidor");
})

socket.on('disconnect', () => {
    console.log("Desconectado del servidor");
})

socket.on("estadoActual", (data) => {
  actualizaHtml(data.ultimos4);
});

socket.on("getUltimos4", data => {
    var audio = new Audio("../audio/new-ticket.mp3");
    console.log(audio)
    audio.play();
    actualizaHtml(data.ultimos4);
});

const actualizaHtml = ultimos4 => {
    ultimos4.forEach(((elemnt, index) => {
        lblTickets[index].innerText = `Ticket ${elemnt.numero}`;
        lblEscritorios[index].innerText = `Escritorio ${elemnt.escritorio}`;
    }));
}
