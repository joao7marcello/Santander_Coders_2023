// Final Project by Erivaldo Silva, Iza Machado, João Marcello, Kadidja Lima and Pedro Kassardjian.
let tarefas = [];
let contadorID = 1;

function addTarefa(tarefaString) {
  let tarefa = {
    id: contadorID,
    tarefaString: tarefaString,
    statusBool: false,
  };
  contadorID++;
  tarefas.push(tarefa);
}

// Obtendo tarefa por ID
function exibirPorID(id) {
  let tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === id);

  if (tarefaEncontrada) {
    console.log(
      `ID: ${tarefaEncontrada.id}, Tarefa: ${tarefaEncontrada.tarefaString}`
    );
  } else {
    console.log(`Tarefa com ID ${id} não encontrada.`);
  }
}

// Removendo tarefa por ID
function removerPorID(id) {
  let tarefaRemovida = tarefas.find((tarefa) => tarefa.id === id);

  if (tarefaRemovida) {
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    console.log(`Tarefa ID ${id} removida.`);
  } else {
    console.log(`Tarefa ID ${id} não encontrada.`);
  }
}

// Editando tarefa
function editarPorID(id, tarefaEditada) {
  let tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (tarefa) {
    tarefa.tarefaString = tarefaEditada;
    console.log(`Tarefa ID ${id} editada para: ${tarefaEditada}.`);
  } else {
    console.log(`Tarefa ID ${id} não encontrada.`);
  }
}

// Marcando como concluída
function done(id) {
  let tarefa = tarefas.find((tarefa) => tarefa.id === id);
  if (tarefa) {
    tarefa.statusBool = true;
    console.log(`Tarefa ID ${id} marcada como concluída.`);
  } else {
    console.log(`Tarefa ID ${id} não encontrada.`);
  }
}

function listAll() {
  for (let tarefa of tarefas) {
    let status = tarefa.statusBool ? " - Concluída ✓" : "";
    console.log(`ID: ${tarefa.id}; Tarefa: ${tarefa.tarefaString}${status}`);
  }
}

function facilitarView() {
  console.log("----------------------------");
}

addTarefa("Tarefa 001");
addTarefa("Tarefa 002");
addTarefa("Tarefa 003");
addTarefa("Tarefa 004");
listAll();
facilitarView();
exibirPorID(2);
facilitarView();
removerPorID(3);
facilitarView();
editarPorID(4, "Tarefa 4 editada");
facilitarView();
done(1);
facilitarView();
listAll();
