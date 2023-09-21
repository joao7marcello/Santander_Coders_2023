let valorClicado = "";
let tela = false;
let cor = "";

function atualizarResultado() {
  const telaElement = document.getElementById("tela");
  telaElement.textContent = valorClicado;

  if (tela) {
    if (!isNaN(valorClicado) && parseFloat(valorClicado) > 20) {
      telaElement.style.color = "green";
    } else {
      telaElement.style.color = "orange";
    }
  } else {
    telaElement.style.color = "";
  }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (tela) {
      valorClicado = "";
      tela = false;
    }

    const igual = button.textContent;

    if (igual === "=") {
      try {
        valorClicado = eval(valorClicado);

        if (isNaN(valorClicado) || !isFinite(valorClicado)) {
          valorClicado = "Error";
          tela = true;
        } else {
          tela = true;
        }
      } catch (error) {
        valorClicado = "Error";
        tela = true;
      }
    } else {
      valorClicado += igual;
    }

    atualizarResultado();
  });
});
