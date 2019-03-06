import { Component, OnInit } from "@angular/core";
import { Todo } from "./todo";
import { TodoDataService } from "./todo-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {
  newTodo: Todo = new Todo();
  todos: Todo[] = [];
  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  constructor(private todoDataService: TodoDataService) {
    this.todoDataService = todoDataService;
  }

  ngOnInit() {
    this.todoDataService.getAllTodos().subscribe(
      todos => {
        this.todos = todos;
      },
      err => console.log("get all todos fails", err)
    );
  }
  // Service is now available as this.todoDataService
  addTodo() {
    this.todoDataService.addTodo(this.newTodo).subscribe(
      (todo: Todo) => {
        this.todos.push(todo);
      },
      err => console.log("add new todo fails", err),
    );
  }

  toggleTodoComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoDataService.toggleTodoComplete(todo).subscribe(
      (res: Todo) => {
        this.todos = this.todos.map(item => {
          if (item.id === res.id) {
            item.completed = res.completed;
          }
          return item;
        });
      }
    );
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id).subscribe(
      (res: Response) => {
        this.todos = this.todos.filter(item => item.id !== todo.id);
      },
      err => console.log("delete todo fails", err)
    );
  }
}
