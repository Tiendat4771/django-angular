import { Injectable } from "@angular/core";
import { Todo } from "./todo";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class TodoDataService {

  apiURL: string = "http://localhost:8000/api";
  // automatic inscrementing of ids
  lastId: number = 0;
  // Placehoder for todos
  todos: Todo[] = [];

  constructor(private httpClient: HttpClient) {}
  // Add Todo
  addTodo(todo: Todo) {
    return this.httpClient.post(`${this.apiURL}/todos/`, todo);
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number) {
    return this.httpClient.delete(`${this.apiURL}/todos/${id}/`);
  }

  // Simulate GET /todos
  getAllTodos() {
    return this.httpClient.get<Todo[]>(`${this.apiURL}/todos`);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    return this.httpClient.put(`${this.apiURL}/todos/${todo.id}/`, todo);
  }
}
