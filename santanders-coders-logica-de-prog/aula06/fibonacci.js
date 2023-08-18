function F(n) {
  if (n === 1) {
    return 0;
  } else if (n === 2) {
    return 1;
  } else {
    return F(n - 1) + F(n - 2);
  }
}

const termo = 12;
const resultado = F(termo);
console.log(`O ${termo}º termo da série de Fibonacci é: ${resultado}`);
