// src/todos/todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.delete(id);
  }
}
