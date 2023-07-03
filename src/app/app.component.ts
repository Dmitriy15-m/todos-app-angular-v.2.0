import { TodosService } from './services/todos.service';
import { Component } from '@angular/core';
import { ITodo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private todosService: TodosService) {}

  removeTodos() {
    this.todosService.removeAllTodos()
  }
}
