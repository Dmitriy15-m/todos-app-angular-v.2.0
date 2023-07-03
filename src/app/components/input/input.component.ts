import { TodosService } from './../../services/todos.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  constructor(private todosService: TodosService) {}

  title = '';
  addTodo(form: NgForm) {
    console.log(form);

    if (form.value.todoName.trim() !== '') {
      this.title = '';
      this.todosService.setTodoToLocalStorage(form.value.todoName);
    } else {
      
    }
  }
}
