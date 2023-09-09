// Classe Peca
class Peca {
  constructor(valor, posicao) {
    this.valor = valor;
    this.posicao = posicao;
  }
}

// Classe PecaNumerica
class PecaNumerica extends Peca {
  constructor(valor, posicao) {
    super(valor, posicao);
  }
}

// Classe PecaVazia
class PecaVazia extends Peca {
  constructor(posicao) {
    super(null, posicao);
  }
}

class Tabuleiro {
  constructor() {
    this.tabuleiro = [];
    this.inicializarTabuleiro();
    this.inicializarEmbaralhamento();
    this.turnoJogador1 = true;
    this.temporizador = null;
    this.startTime = null; // Add a startTime variable to track the game start time
    this.moveCounter = 0;
    this.elapsedTimeElement = document.getElementById("elapsed-time");
    this.updateElapsedTimeInterval = null;

    this.lastTime = null;
    this.elapsedTime = 0;

    // Start updating the elapsed time continuously
    this.updateElapsedTimeInterval = requestAnimationFrame(
      this.updateElapsedTime.bind(this)
    );

    this.tabuleiro.find((peca) => peca.valor === null).selecionada = true;
    this.updateElapsedTimeInterval = setInterval(() => {
      this.updateElapsedTime();
    }, 10);

    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  startTimer() {
    this.startTime = Date.now();
    this.updateElapsedTime();
  }

  stopTimer() {
    if (this.startTime !== null) {
      const endTime = Date.now();
      const elapsedTimeInSeconds = (endTime - this.startTime) / 1000;
      return elapsedTimeInSeconds;
    }
    return 0;
  }

  resetTimer() {
    this.startTime = null;
    this.updateElapsedTime();
  }

  updateElapsedTime() {
    if (this.startTime !== null) {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = (currentTime - this.startTime) / 1000;
      this.elapsedTimeElement.textContent =
        elapsedTimeInSeconds.toFixed(2) + " segundos"; // Display with two decimal places
    } else {
      this.elapsedTimeElement.textContent = "0.00 segundos";
    }

    // Continue updating elapsed time
    this.updateElapsedTimeInterval = requestAnimationFrame(() => {
      this.updateElapsedTime();
    });
  }

  incrementMoveCounter() {
    this.moveCounter++;
  }

  inicializarTabuleiro() {
    // Crie as peças do quebra-cabeça aqui (incluindo a peça vazia)
    for (let i = 1; i <= 8; i++) {
      this.tabuleiro.push(new PecaNumerica(i));
    }
    this.tabuleiro.push(new PecaVazia());
    // this.embaralhar();
  }

  inicializarEmbaralhamento() {
    const botaoEmbaralhar = document.getElementById("embaralhar");
    botaoEmbaralhar.addEventListener("click", () => {
      this.embaralhar();
      //this.iniciarTemporizador();
    });
  }

  embaralhar() {
    for (let i = this.tabuleiro.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tabuleiro[i], this.tabuleiro[j]] = [
        this.tabuleiro[j],
        this.tabuleiro[i],
      ];
    }

    this.exibirTabuleiro();
    this.resetTimer();
    this.moveCounter = 0;

    // Explicitly set the elapsedTimeElement to "0.00 seconds"
    this.elapsedTimeElement.textContent = "0.00 segundos";

    const botaoEmbaralhar = document.getElementById("embaralhar");
    botaoEmbaralhar.blur();
  }

  moverPeca(peca) {
    const indexPecaVazia = this.tabuleiro.findIndex((p) => p.valor === null);
    const indexPecaClicada = this.tabuleiro.indexOf(peca);
    const direcoes = [-1, 1, -3, 3];

    for (const direcao of direcoes) {
      if (indexPecaClicada + direcao === indexPecaVazia) {
        [this.tabuleiro[indexPecaClicada], this.tabuleiro[indexPecaVazia]] = [
          this.tabuleiro[indexPecaVazia],
          this.tabuleiro[indexPecaClicada],
        ];

        this.exibirTabuleiro();

        if (this.startTime === null) {
          this.startTimer();
        }

        this.incrementMoveCounter();

        if (this.verificarVitoria()) {
          const elapsedTimeInSeconds = this.stopTimer();
          this.updateElapsedTime(); // Update the elapsed time element
          cancelAnimationFrame(this.updateElapsedTimeInterval); // Stop updating elapsed time
          alert(
            "Parabéns! Você concluiu o jogo em " +
              elapsedTimeInSeconds.toFixed(2) +
              " segundos com " +
              this.moveCounter +
              " movimentos."
          );
          this.resetTimer(); // Reset the timer for the new round
          this.embaralhar(); // Start a new round
          this.moveCounter = 0; // Reset move counter
        }
        break;
      }
    }
  }

  verificarVitoria() {
    for (let i = 0; i < this.tabuleiro.length - 1; i++) {
      if (this.tabuleiro[i].valor !== i + 1) {
        return false;
      }
    }
    return true;
  }

  handleKeyPress(event) {
    const indexPecaVazia = this.tabuleiro.findIndex((p) => p.valor === null);
    let indexPecaSelecionada = this.tabuleiro.findIndex((p) => p.selecionada);

    switch (event.key) {
      case "ArrowLeft":
      case "a":
        if (indexPecaSelecionada % 3 !== 0) {
          indexPecaSelecionada--;
        }
        break;
      case "ArrowRight":
      case "d":
        if (indexPecaSelecionada % 3 !== 2) {
          indexPecaSelecionada++;
        }
        break;
      case "ArrowUp":
      case "w":
        if (indexPecaSelecionada >= 3) {
          indexPecaSelecionada -= 3;
        }
        break;
      case "ArrowDown":
      case "s":
        if (indexPecaSelecionada < 6) {
          indexPecaSelecionada += 3;
        }
        break;
      case "Enter":
        if (indexPecaSelecionada !== indexPecaVazia) {
          this.moverPeca(this.tabuleiro[indexPecaSelecionada]);
        }
        break;
      default:
        return; // Ignore other keys
    }

    // Update the selected piece and re-render the board
    this.tabuleiro.forEach((peca) => (peca.selecionada = false));
    this.tabuleiro[indexPecaSelecionada].selecionada = true;
    this.exibirTabuleiro();
  }

  exibirTabuleiro() {
    // Exiba o tabuleiro na página HTML
    const tabuleiroElement = document.getElementById("tabuleiro");
    tabuleiroElement.innerHTML = "";

    for (const [index, peca] of this.tabuleiro.entries()) {
      const pecaElement = document.createElement("div");
      pecaElement.classList.add("peca");
      if (peca.selecionada) {
        pecaElement.classList.add("selecionada"); // Apply a CSS class for selection
      }
      pecaElement.textContent = peca.valor !== null ? peca.valor : "";
      pecaElement.addEventListener("click", () => this.moverPeca(peca));
      tabuleiroElement.appendChild(pecaElement);
    }
  }
}

const tabuleiro = new Tabuleiro();
tabuleiro.exibirTabuleiro();
