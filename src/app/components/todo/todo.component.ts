import { ITodo } from './../../models';
import { TodosService } from './../../services/todos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  public todosList: ITodo[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private todosService: TodosService) {
    this.subscription = this.todosService.todosList$.subscribe(
      (list: ITodo[]) => {
        this.todosList = list;
      }
    );
  }

  changeCheckBox(id: number) {
    this.todosService.changeCondition(id);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  ngOnInit(): void {
    this.todosList = this.todosService.getTodosFrmLocalStorage();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
