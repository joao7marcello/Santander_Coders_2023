const alunos = [
  {
    nome: "Aluno1",
    nota1: 8,
    nota2: 7,
  },
  {
    nome: "Aluno2",
    nota1: 6,
    nota2: 9,
  },
  {
    nome: "Aluno3",
    nota1: 5,
    nota2: 8,
  },
  {
    nome: "Aluno4",
    nota1: 9,
    nota2: 6,
  },
  {
    nome: "Aluno5",
    nota1: 7,
    nota2: 7,
  },
  {
    nome: "Aluno6",
    nota1: 8,
    nota2: 9,
  },
  {
    nome: "Aluno7",
    nota1: 6,
    nota2: 8,
  },
  {
    nome: "Aluno8",
    nota1: 7,
    nota2: 6,
  },
  {
    nome: "Aluno9",
    nota1: 9,
    nota2: 7,
  },
  {
    nome: "Aluno10",
    nota1: 8,
    nota2: 8,
  },
];

for (const aluno of alunos) {
  const { nome, nota1, nota2 } = aluno;
  const media = (nota1 + nota2) / 2;
  console.log(`O aluno ${nome} teve média ${media}`);
}
