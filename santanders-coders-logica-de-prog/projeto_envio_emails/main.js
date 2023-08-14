// main.js
const clientes = require("./clientes");
const enviarEmail = require("./envia-email");

// Percorra a lista de clientes e envie emails de acordo com a preferência
clientes.forEach((cliente) => {
  if (cliente.receberMarketing) {
    const subject = "Oferta Especial para Você!";
    const body = "Confira as nossas últimas ofertas em carros novos.";
    enviarEmail(cliente.addressee, subject, body);
  }
});
