import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  @Output() addTask = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      status: ['toDo'],
    });
  }

  submitTask() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.addTask.emit(newTask);
      this.taskForm.reset();
      this.taskForm.patchValue({ status: 'toDo' });
    }
  }
}
