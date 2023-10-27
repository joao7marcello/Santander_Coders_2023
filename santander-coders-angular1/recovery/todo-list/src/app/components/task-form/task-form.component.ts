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
      description: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', Validators.required],
      status: ['toDo'],
    });
  }

  submitTask() {
    const titleControl = this.taskForm.get('title');
    const descriptionControl = this.taskForm.get('description');
    const dateControl = this.taskForm.get('date');

    if (
      titleControl?.invalid ||
      descriptionControl?.invalid ||
      dateControl?.invalid
    ) {
      if (titleControl?.invalid) {
        titleControl.markAsTouched();
      }

      if (descriptionControl?.invalid) {
        descriptionControl.markAsTouched();
      }

      if (dateControl?.invalid) {
        dateControl.markAsTouched();
      }
    } else {
      const newTask: Task = this.taskForm.value;
      this.addTask.emit(newTask);
      this.taskForm.reset();
      this.taskForm.patchValue({ status: 'toDo' });
    }
  }
}
