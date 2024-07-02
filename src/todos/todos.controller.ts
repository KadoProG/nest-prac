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
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() todo: Partial<Todo>): Todo {
    return this.todosService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: Partial<Todo>,
  ): Todo {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.todosService.delete(id);
  }
}
