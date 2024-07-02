import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

const mockTodosService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService(),
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result: Todo[] = [
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
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const result: Todo = {
        id: 1,
        title: 'First task',
        description: 'This is the first task',
        done: false,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const dto: Partial<Todo> = {
        title: 'New task',
        description: 'This is a new task',
      };
      const result = { id: 1, ...dto, done: false } as Todo;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const dto: Partial<Todo> = { title: 'Updated task' };
      const result: Todo = {
        id: 1,
        title: 'Updated task',
        description: 'This is the first task',
        done: false,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete an existing todo', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue();

      await controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
