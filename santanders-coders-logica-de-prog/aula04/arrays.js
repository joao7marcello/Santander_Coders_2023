// Exercicio push()
const array = [];

array.push(12);
array.push(11);

//console.log(array);
//console.log(array.length);

// Exercicio pop()
const numeros = [1, 2, 3, 4];

numeros.pop();
//console.log(numeros.length);
numeros.pop();
//console.log(numeros.length);

// Exercicio shift()
const linguagens = ["javascript", "python", "golang", "java"];

linguagens.shift();
//console.log(linguagens.length);
linguagens.shift();
//console.log(linguagens.length);

// Exercício at()
const produtos = ["sabao", "detergente", "amaciante", "alvejante", "sapolio"];
index = 0;
//console.log(`${produtos.at(index)}`);
index = 2;
//console.log(`${produtos.at(index)}`);
index = 3;
//console.log(`${produtos.at(index)}`);

// Exercicio concat()
const lista1 = ["banana", "pera", "melancia"];
const lista2 = ["alface", "tomate", "rucula"];
const concatList = lista1.concat(lista2);
//console.log(concatList.length);
const lista3 = ["limao", "laranja", "acerola"];
const lista4 = ["pimenta", "pimentao", "alho"];
const concatLists = lista1.concat(lista2, lista3, lista4);
//console.log(concatLists.length);

// Exercicio every()
var pessoas = [
  { nome: "João", idade: 22 },
  { nome: "Maria", idade: 17 },
  { nome: "Pedro", idade: 18 },
  { nome: "Ana", idade: 22 },
  { nome: "Carlos", idade: 16 },
];

const ageCheck = pessoas.every((pessoa) => pessoa.idade > 18);
//console.log(ageCheck);
const nameCheck = pessoas.every((pessoa) => pessoa.nome.length > 3);
//console.log(nameCheck);
const infoCheck = pessoas.every(
  (pessoa) => pessoa.nome !== undefined && pessoa.idade !== undefined
);
//console.log(infoCheck);

// Exercicio filter()
const alunos = [
  { nome: "Ana", idade: 20 },
  { nome: "Pedro", idade: 18 },
  { nome: "Maria", idade: 22 },
  { nome: "João", idade: 17 },
  { nome: "Lucas", idade: 19 },
  { nome: "Julia", idade: 21 },
];

const maoirIDD = alunos.filter((aluno) => aluno.idade >= 18);
//console.log(maoirIDD);
const iddTwenty = alunos.filter((aluno) => aluno.idade < 20);
//console.log(iddTwenty);
const jota = alunos.filter((aluno) => aluno.nome.startsWith("J"));
//console.log(jota);

// Exercicio find()
const lugares = [
  { nome: "Sala de Reuniões", capacidade: 8 },
  { nome: "Auditório", capacidade: 50 },
  { nome: "Sala de Treinamento", capacidade: 20 },
  { nome: "Sala de Conferências", capacidade: 30 },
  { nome: "Sala de Estudos", capacidade: 12 },
];
const placeTen = lugares.find((lugar) => lugar.capacidade > 10);

//console.log(placeTen);
const placeTwFive = lugares.find((lugar) => lugar.capacidade >= 25);
//console.log(placeTwFive);
const placeForty = lugares.find((lugar) => lugar.capacidade >= 40);
//console.log(placeForty);

//Exercicio forEach()

const pizzas = [
  { sabor: "Mussarela", valor: 20 },
  { sabor: "Calabresa", valor: 25 },
  { sabor: "Marguerita", valor: 28 },
  { sabor: "Frango com Catupiry", valor: 32 },
  { sabor: "Portuguesa", valor: 30 },
];
pizzas.forEach((cardapio) => {
  //console.log(cardapio);
});

// Exercicio map()
const pessoas2 = [
  { nome: "João", altura: 1.75, peso: 80 },
  { nome: "Maria", altura: 1.68, peso: 60 },
  { nome: "Pedro", altura: 1.8, peso: 70 },
  { nome: "Ana", altura: 1.65, peso: 55 },
  { nome: "Carlos", altura: 1.9, peso: 100 },
];
const imc = pessoas2.map((pessoa2) => {
  const imcCalculo = pessoa2.peso / pessoa2.altura ** 2;
  return { nome: pessoa2.nome, imcCalculo };
});
//console.log(imc);

// Exercicio reduce()

const alunos12 = [
  { nome: "Ana", notas: [7, 8, 9] },
  { nome: "Pedro", notas: [5, 6, 7] },
  { nome: "Maria", notas: [9, 8, 10] },
  { nome: "João", notas: [6, 7, 8] },
  { nome: "Lucas", notas: [8, 9, 7] },
  { nome: "Julia", notas: [10, 8, 9] },
];
const mediaAlunos = alunos12.map((aluno) => {
  const somaNotas = aluno.notas.reduce((soma, nota) => soma + nota, 0);
  const media = somaNotas / aluno.notas.length;
  return { nome: aluno.nome, media };
});

//console.log(mediaAlunos);

// Exercicio reverse()

const numeros0 = [1, 2, 3, 4, 5];
numeros0.reverse();
//console.log(numeros0);

// Exercicio some()
const empregados = [
  { nome: "João", salario: 1200 },
  { nome: "Maria", salario: 1500 },
  { nome: "Pedro", salario: 1800 },
  { nome: "Ana", salario: 1400 },
  { nome: "Carlos", salario: 2000 },
];
const salaryCheck = empregados.some((soma) => soma.salario >= 1500);
//console.log(salaryCheck);
const salaryCheck2 = empregados.some((soma) => soma.salario <= 1500);
//console.log(salaryCheck2);

// Exercicio sort()
const atletas = [
  { nome: "João", altura: 1.75, peso: 80 },
  { nome: "Maria", altura: 1.68, peso: 60 },
  { nome: "Pedro", altura: 1.8, peso: 70 },
  { nome: "Ana", altura: 1.65, peso: 55 },
  { nome: "Carlos", altura: 1.9, peso: 100 },
];

atletas.sort((a, b) => a.peso - b.peso);

//console.log(atletas);
atletas.sort((a, b) => b.altura - a.altura);
//console.log(atletas);
atletas.sort((a, b) => a.nome.localeCompare(b.nome));
//console.log(atletas);
