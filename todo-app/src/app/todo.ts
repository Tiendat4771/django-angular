export class Todo {
  id: number;
  title: string = "";
  completed: boolean = false;
  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
