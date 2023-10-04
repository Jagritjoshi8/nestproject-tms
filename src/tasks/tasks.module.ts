import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController], //[AppController],
  providers: [TasksService],
})
export class TasksModule {}
