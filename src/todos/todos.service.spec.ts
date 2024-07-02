import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

const mockTodoRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('TodosService', () => {
  let service: TodosService;
  let repository: MockRepository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository(),
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<MockRepository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const expectedTodos: Todo[] = [
        {
          id: 1,
          title: 'First task',
          description: 'This is the first task',
          done: false,
        },
        {
          id: 2,
          title: 'Second task',
          description: 'This is the second task',
          done: true,
        },
      ];
      repository.find.mockResolvedValue(expectedTodos);

      const todos = await service.findAll();
      expect(todos).toEqual(expectedTodos);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const expectedTodo: Todo = {
        id: 1,
        title: 'First task',
        description: 'This is the first task',
        done: false,
      };
      repository.findOneBy.mockResolvedValue(expectedTodo);

      const todo = await service.findOne(1);
      expect(todo).toEqual(expectedTodo);
    });

    it('should throw NotFoundException if todo is not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      try {
        await service.findOne(1);
      } catch (e) {
        expect(e.message).toBe('Todo item with ID 1 not found');
      }
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const newTodo: Partial<Todo> = {
        title: 'New task',
        description: 'This is a new task',
      };
      const savedTodo: Todo = { id: 1, ...newTodo, done: false } as Todo;
      repository.save.mockResolvedValue(savedTodo);

      const todo = await service.create(newTodo);
      expect(todo).toEqual(savedTodo);
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const existingTodo: Todo = {
        id: 1,
        title: 'Old task',
        description: 'This is an old task',
        done: false,
      };
      const updatedTodo: Partial<Todo> = { title: 'Updated task' };
      const savedTodo: Todo = { ...existingTodo, ...updatedTodo };
      repository.findOneBy.mockResolvedValue(existingTodo);
      repository.save.mockResolvedValue(savedTodo);

      const todo = await service.update(1, updatedTodo);
      expect(todo).toEqual(savedTodo);
    });
  });

  describe('delete', () => {
    it('should delete an existing todo', async () => {
      const existingTodo: Todo = {
        id: 1,
        title: 'Task to delete',
        description: 'This task will be deleted',
        done: false,
      };
      repository.findOneBy.mockResolvedValue(existingTodo);
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.delete(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if todo to delete is not found', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });

      try {
        await service.delete(1);
      } catch (e) {
        expect(e.message).toBe('Todo item with ID 1 not found');
      }
    });
  });
});
