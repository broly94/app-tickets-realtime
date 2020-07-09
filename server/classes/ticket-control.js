const fs = require("fs");

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.ticket = [];
    this.ultimos4 = [];
    let data = require("../data/data.json");
    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
    } else {
      //Si la hoy != hoy entonces reinicia los tickets para tener nuevos tickets cada dia
      this.reiniciarConteo();
    }
  }

  reiniciarConteo = () => {
    this.ultimo = 0;
    this.ticket = [];
    this.ultimos4 = [];
    console.log("se ah inicializado el sistema");
    this.grabarArchivo();
  };

  siguenteTicket = () => {
    this.ultimo += 1;
    let tickets = new Ticket(this.ultimo, null);
    this.ticket.push(tickets);
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  };

  atenderTicket(escritorio) {
    if (this.ultimos4 === 0) {
      return {
        ok: false,
        message: "No hay tickets que atender",
        tickets: this.ticket,
      };
    }
    if (this.ticket.length === 0) {
      return {
        ok: false,
        message: "No hay tickets que atender",
        tickets: this.ticket,
      };
    }
    //Extraemos el pimer ticket del listado y lo guardamos en una variable
    var numeroTicket = this.ticket[0].numero;
    //Eliminamos ese primer elemento extraido del array de tickets
    this.ticket.shift();
    //Guardamos un nuevo ticket en una variable y le pasamos como parametro el numeroTicket que se extrae del array de ticket
    //Y le pasamos el escritorio que sera el que atenderá el ticket
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    //Se le pasa al array de ultimos4 el nuevo ticket y lo inserta en la primer posicion
    this.ultimos4.unshift(atenderTicket);
    //Eliminar el ultimo ticket del array mientras que la longitud sea mayor a 4
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1); //Borra el ultimo elemento del array
    }

    console.log("Ultimos 4");
    console.log(this.ultimos4);

    this.grabarArchivo();

    return atenderTicket;
  }

  getUltimoTicket = () => {
    return `Ticket ${this.ultimo}`;
  };

  getUltimos4 = () => {
    return this.ultimos4;
  };

  //Reiniciar diariamente el archivo json para que todos los dias inicialize con los nuevos tickets
  grabarArchivo = () => {
    //Construir un objeto con los datos del constructor
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      ticket: this.ticket,
      ultimos4: this.ultimos4,
    };
    //Pasar a string los datos del objeto para guardarlos guardarlos en el archivo json
    let jsonDataString = JSON.stringify(jsonData);
    //Escrbir la data en el archivo json para reiniciar el cada dia los tickets
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  };
}

module.exports = { TicketControl };
