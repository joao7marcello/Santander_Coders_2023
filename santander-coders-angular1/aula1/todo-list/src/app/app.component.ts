import { Component } from '@angular/core';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  listTask: Task[] = [
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title01',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title02',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title03',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title04',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title05',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title06',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title07',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title08',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title09',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title10',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title11',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title12',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title13',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title14',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title15',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title16',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title17',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title18',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'toDo',
      title: 'title19',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title20',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title21',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title22',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title23',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'trabalhando',
      title: 'title24',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title25',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title26',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title27',
    },
    {
      date: new Date(),
      description: 'description01',
      status: 'finalizado',
      title: 'title28',
    },
  ];
  // listTask: Array<IListTask> = [];
  selectedTask: Task | null = null;

  ngOnInit() {
    console.log(this.selectedTask);
  }

  onAddTask(task: Task) {
    this.listTask.push(task);
  }

  handleTask(task: Task) {
    this.selectedTask = task;
  }

  fecharDetalhes() {
    this.selectedTask = null;
  }
}
