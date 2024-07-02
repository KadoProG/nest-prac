// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // グローバルモジュールとして利用
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite', // SQLiteを使用する場合の設定
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Todo],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
      }),
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
