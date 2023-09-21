let valor01 = 0;
let valor02 = 0;
let operacao = "";
let resultado = 0;

function calcular() {
  const inputValor01 = parseFloat(document.getElementById("valor01").value);
  const inputValor02 = parseFloat(document.getElementById("valor02").value);

  if (isNaN(inputValor01) || isNaN(inputValor02)) {
    document.getElementById("resultado").textContent = "Digite valores válidos";
    return;
  }

  valor01 = inputValor01;
  valor02 = inputValor02;

  switch (operacao) {
    case "+":
      resultado = valor01 + valor02;
      break;
    case "-":
      resultado = valor01 - valor02;
      break;
    case "*":
      resultado = valor01 * valor02;
      break;
    case "/":
      if (valor02 === 0) {
        document.getElementById("resultado").textContent =
          "Erro: Divisão por zero";
        return;
      } else {
        resultado = valor01 / valor02;
      }
      break;
    default:
      document.getElementById("resultado").textContent =
        "Selecione uma operação";
      return;
  }

  const resultadoSpan = document.getElementById("resultado");
  resultadoSpan.style.color = "white";

  if (resultado > 20) {
    resultadoSpan.style.backgroundColor = "green";
  } else {
    resultadoSpan.style.backgroundColor = "orange";
  }

  resultadoSpan.textContent = "Resultado: " + resultado;
}

function selecionarOperacao(operacaoSelecionada) {
  operacao = operacaoSelecionada;
  document.getElementById("operacao").textContent = operacao;
}

// Executar calculo
document.getElementById("calcular").addEventListener("click", calcular);

// Selecionar operacao
document
  .getElementById("somaButton")
  .addEventListener("click", () => selecionarOperacao("+"));
document
  .getElementById("subtracaoButton")
  .addEventListener("click", () => selecionarOperacao("-"));
document
  .getElementById("multiplicacaoButton")
  .addEventListener("click", () => selecionarOperacao("*"));
document
  .getElementById("divisaoButton")
  .addEventListener("click", () => selecionarOperacao("/"));
