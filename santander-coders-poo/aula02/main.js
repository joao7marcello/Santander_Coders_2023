class Conta {
  #numeroConta;
  constructor(nome, cpf) {
    this.nome = nome;
    this.cpf = cpf;
    this.#numeroConta = Utils.numeroConta();
  }
  set numeroConta(numero) {
    this.#numeroConta = numero;
  }
  get numeroConta() {
    return this.#numeroConta;
  }
}

class Utils {
  static totalContas = 0;
  constructor() {}

  static numeroConta() {
    return ++Utils.totalContas;
  }
}

const c = new Conta("bruno", 1233456);
const c1 = new Conta("bruno 1", 1234343456);
