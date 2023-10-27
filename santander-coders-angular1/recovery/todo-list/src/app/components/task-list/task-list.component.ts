import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() handleTask = new EventEmitter<Task>();
  @Output() editTaskEvent = new EventEmitter<Task>(); // Define a new EventEmitter for edit events

  statuses: string[] = ['trabalhando', 'finalizado', 'toDo'];

  selectedTask(task: Task) {
    this.handleTask.emit(task);
  }

  // Function to transform status names
  transformStatus(status: string): string {
    return (
      status.charAt(0).toUpperCase() +
      status.slice(1).replace(/([A-Z])/g, ' $1')
    );
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  editTask(task: Task) {
    this.editTaskEvent.emit(task); // Emit the edit event when the button is clicked
  }
}
