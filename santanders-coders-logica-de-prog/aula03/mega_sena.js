function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}
let ordenados;

do {
  let numSorteados = [];

  for (let index = 0; index < 6; index++) {
    let sorteio = getRandomIntInclusive(1, 60);
    numSorteados.push(sorteio);
  }

  ordenados = numSorteados.sort((a, b) => a - b);
} while (hasDuplicates(ordenados));

console.log(ordenados);
