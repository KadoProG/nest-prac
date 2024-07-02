import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo item with ID ${id} not found`);
    }
    return todo;
  }

  create(todo: Partial<Todo>): Todo {
    const newTodo = { ...todo, id: this.idCounter++, done: false } as Todo;
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedTodo: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo item with ID ${id} not found`);
    }
    Object.assign(todo, updatedTodo);
    return todo;
  }

  delete(id: number): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo item with ID ${id} not found`);
    }
    this.todos.splice(todoIndex, 1);
  }
}
