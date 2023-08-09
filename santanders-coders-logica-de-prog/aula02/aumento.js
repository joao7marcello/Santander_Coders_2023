// Equipe 5 - Erivaldo Silva, Iza Machado, João Marcello, Kadidja Lima e Pedro Kassardjian

/* 
As Organizações Tabajara resolveram dar um aumento de salário aos seus colaboradores e você foi contratado para desenvolver um script que calculará os reajustes.

Faça um script que recebe o salário de um colaborador e o reajuste segundo o seguinte critério, baseado no salário atual:

    salários até R$ 1500,00 (incluindo) : aumento de 20%
    salários entre R$ 1500,00 e R$ 1700,00 : aumento de 15%
    salários entre R$ 1700,00 e R$ 2000,00 : aumento de 10%
    salários de R$ 2000,00 em diante : aumento de 5% 
    
Após o aumento ser realizado, informe na tela:
    o salário antes do reajuste;
    o percentual de aumento aplicado;
    o valor do aumento;
    o novo salário, após o aumento.
*/

let salario_depois, percentual;
const salario_antes = 1717;

if (salario_antes <= 1500) {
  percentual = 0.2;
} else if (salario_antes <= 1700) {
  percentual = 0.15;
} else if (salario_antes <= 2000) {
  percentual = 0.1;
} else {
  percentual = 0.05;
}

salario_depois = salario_antes * (1 + percentual);

console.log(`O salário antes do reajuste era de R$ ${salario_antes}.`);
console.log(`O percentual aplicado foi de ${percentual * 100}%.`);
console.log(
  `O valor de aumento foi de R$ ${(salario_depois - salario_antes).toFixed(2)}.`
);
console.log(
  `O novo salário é de R$ ${salario_depois.toFixed(2)}, após o aumento.`
);
