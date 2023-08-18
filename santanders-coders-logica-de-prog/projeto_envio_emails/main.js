// main.js
const clientes = require("./clientes");
const enviarEmail = require("./envia-email");
const today = new Date();
const currentMonth = today.getMonth();

// Percorra a lista de clientes e envie emails de acordo com as especificacoes
clientes.forEach((cliente) => {
  if (cliente.receberMarketing) {
    const ultimaCompraDate = new Date(cliente.ultimaCompra);
    const ultimaCompraMonth = ultimaCompraDate.getMonth(); // Mês da última compra

    // Verifica se a última compra foi no mês anterior ou no mês atual
    if (
      currentMonth === ultimaCompraMonth ||
      currentMonth - 1 === ultimaCompraMonth
    ) {
      if (today.getDay() === 1) {
        const subject = "Oferta Especial para Você!";
        const body = "Confira as nossas últimas ofertas em carros novos.";
        enviarEmail(cliente.addressee, subject, body);
      } else {
        console.log("Hoje não é segunda-feira. Nenhum email será enviado.");
      }
    } else {
      console.log(
        "O cliente não fez uma compra no mês atual ou no mês anterior. Nenhum email será enviado."
      );
    }
  }
});
