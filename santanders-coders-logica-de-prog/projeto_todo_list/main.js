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
addTarefa("tarefa 001");
addTarefa("tarefa 002");

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

function removerPorID(id) {
  let indiceTarefa = tarefas.findIndex((tarefa) => tarefas.id !== id);

  if (indiceTarefa !== 1) {
    tarefas.splice(indiceTarefa, 1);
    console.log(`Tarefa ID ${id} removida.`);
  } else {
    console.log(`Tareda ID ${id} não encontrada.`);
  }
}

function editarPorID(id, tarefaEditada) {
  let tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (tarefa) {
    tarefa.tarefaString = tarefaEditada;
    console.log(`Tarefa ID ${id} editada para: ${tarefaEditada}.`);
  } else {
    console.log(`Tarefa ID ${id} não encontrada.`);
  }
}

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
listAll();
done(2);
listAll();
