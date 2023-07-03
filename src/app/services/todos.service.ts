import { ITodo } from 'src/app/models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosList = new Subject<ITodo[]>();
  public todosList$ = this.todosList.asObservable();

  getTodosFrmLocalStorage() {
    let todos = localStorage.getItem('todos');

    if (todos !== null) {
      let list: ITodo[] = JSON.parse(todos);
      return list;
    } else {
      return [];
    }
  }

  setTodoToLocalStorage(title: string) {
    let todo: ITodo = {
      id: Math.random(),
      todoTitle: title,
      isDone: false,
    };
    let todos = this.getTodosFrmLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.todosList.next(this.getTodosFrmLocalStorage());
  }

  removeAllTodos() {
    localStorage.clear();
    this.todosList.next([]);
  }

  changeCondition(id: number) {
    let newTodosList = this.getTodosFrmLocalStorage().map((todo) => {
      if (todo.id == id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    localStorage.setItem('todos', JSON.stringify(newTodosList));
    this.todosList.next(this.getTodosFrmLocalStorage());
  }

  deleteTodo(id: number) {
    const localStorageTodos = this.getTodosFrmLocalStorage();
    const newTodos = localStorageTodos.filter((todo) => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(newTodos));
    this.todosList.next(this.getTodosFrmLocalStorage());
  }
}
