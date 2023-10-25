import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-filtro',
  templateUrl: './task-filtro.component.html',
  styleUrls: ['./task-filtro.component.scss'],
})
export class TaskFiltroComponent {
  @Output() onChangeFiltro = new EventEmitter();

  filtro: string = 'all';

  handleSelect() {
    this.onChangeFiltro.emit(this.filtro);
  }
}
