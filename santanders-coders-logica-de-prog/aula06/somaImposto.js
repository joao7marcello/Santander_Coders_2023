let taxaImposto = 12; // em porcentagem
let custo = 1200;
let valorTotal;

function somaImposto(taxaImposto, custo) {
  let valorImposto = custo * (taxaImposto / 100);
  let valorTotal = custo + valorImposto;
  return valorTotal;
}
valorTotal = somaImposto(taxaImposto, custo);
console.log(`Custo: ${custo}; Novo Valor: ${valorTotal}`);
