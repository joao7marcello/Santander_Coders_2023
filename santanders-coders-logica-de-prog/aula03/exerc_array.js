let lista1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < lista1.length; i++) {
  if (lista1[i] % 2 == 0) {
    console.log(`Elemento par: ${lista1[i]}`);
  } else {
    console.log(`Elemento impar: ${lista1[i]}`);
  }
}

let lista2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let impar = [];
let par = [];

for (let i = 0; i < lista2.length; i++) {
  if (lista2[i] % 2 == 0) {
    par.push(lista2[i]);
  } else {
    impar.push(lista2[i]);
  }
}

console.log(`Pares = [${par.join(", ")}]; Impares = [${impar.join(", ")}]`);
