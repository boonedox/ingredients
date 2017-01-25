import { Injectable } from '@angular/core';

import { Todo, ITodo } from './todo';
import { HEROES } from './mock-heroes';

import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Injectable()
export class TodoService {
    constructor(
        private af: AngularFire
    ) {}

    getTodos(): FirebaseListObservable<ITodo[]> {
        return this.af.database.list('/todos');
    }

    createTodos(todos: ITodo[]): void {
        todos.forEach((t) => this.getTodos().push(t));
    }
}
