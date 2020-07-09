const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on("siguienteTicket", (data, callback) => {
        let siguiente = ticketControl.siguenteTicket();
        callback(siguiente)
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio) {
            return callback({
                err: true,
                message: "El escritorio es necesario"
            })
        }
        callback(ticketControl.atenderTicket(data.escritorio));
        
        client.broadcast.emit("getUltimos4", {
            ultimos4: ticketControl.getUltimos4()
        });
    })


});