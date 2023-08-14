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

addTarefa("Tarefa 001");
addTarefa("Tarefa 002");
addTarefa("Tarefa 003");

console.log(tarefas);
// Listar todas as tarefas
for (let tarefa of tarefas) {
  console.log(tarefa.tarefaString);
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

function removerPorID(id) {
  let indiceTarefa = tarefas.findIndex((tarefa) => tarefas.id !== id);

  if (indiceTarefa !== 1) {
    tarefas.splice(indiceTarefa, 1);
    console.log(`Tarefa ID ${id} removida.`);
  } else {
    console.log(`Tareda ID ${id} não encontrada.`);
  }
}
removerPorID(1);

for (let tarefa of tarefas) {
  console.log(tarefa.tarefaString);
}
addTarefa("Tarefa 004");
console.log(tarefas);

function editarPorID(id, tarefaEditada) {
  let tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (tarefa) {
    tarefa.tarefaString = tarefaEditada;
    console.log(`Tarefa ID ${id} editada para: ${tarefaEditada}.`);
  } else {
    console.log(`Tarefa ID ${id} não encontrada.`);
  }
}

editarPorID(2, "Editada 002");
editarPorID(1, "Editada 001");
for (let tarefa of tarefas) {
  console.log(tarefa.tarefaString);
}

function done(id) {
  let tarefa = tarefas.find((tarefa) => tarefa.id === id);
  if (tarefa) {
    tarefa.statusBool = true;
    console.log(`Tarefa ID ${id} marcada como concluída.`);
  } else {
    console.log(`Tarefa ID ${id}não encontrada.`);
  }
}
done(2);
for (let tarefa of tarefas) {
  let status = tarefa.statusBool ? " - Realizada" : "";
  console.log(`ID: ${tarefa.id}; Tarefa: ${tarefa.tarefaString}${status}`);
}
