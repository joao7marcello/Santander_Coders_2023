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

    this.tabuleiro.find((peca) => peca.valor === null).selecionada = true;

    document.addEventListener("keydown", this.handleKeyPress.bind(this));
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

        if (this.verificarVitoria()) {
          alert("Parabéns! Você concluiu o jogo.");
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
