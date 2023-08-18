function fatorialRecursivo(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * fatorialRecursivo(n - 1);
  }
}

function fatorialIterativo(n) {
  let resultado = 1;
  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

const numero = 2;

console.time("Recursivo");
const resultadoRecursivo = fatorialRecursivo(numero);
console.log(`${resultadoRecursivo}`);
console.timeEnd("Recursivo");

console.time("Iterativo");
const resultadoIterativo = fatorialIterativo(numero);
console.log(`${resultadoIterativo}`);
console.timeEnd("Iterativo");
