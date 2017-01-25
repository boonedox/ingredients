export interface ITodo {
  $key?: string;
  completed: boolean;
  title: string;
}

export class Todo implements ITodo {
  completed: boolean;
  title: string;

  constructor(title: string, completed: boolean = false) {
      this.title = title;
      this.completed = completed;
  }
}
