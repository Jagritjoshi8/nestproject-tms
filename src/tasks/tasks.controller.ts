import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { title } from 'process';
import { rootCertificates } from 'tls';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

// const taskslist = [
//   {
//     id: '1',
//     title: 'cleaning',
//     description: 'dust',
//     status: 'OPEN',
//   },
// ];
// @Controller('/')
// export class AppController {
//   @Get()
//   @Render('index')
//   root() {
//     return {
//       data: taskslist,
//     };
//   }
// }
@Controller('/')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  @Render('index')
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    if (Object.keys(filterDto).length) {
      const tasklist = this.tasksService.getTasksWithFilters(filterDto);
      return { data: tasklist };
    } else {
      const tasklist = this.tasksService.getAllTasks();
      return { data: tasklist };
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    console.log('in getbyid controller');
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @Render('index')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    this.tasksService.createTask(createTaskDto);
    const tasklist = this.tasksService.getAllTasks();
    return { data: tasklist };
  }

  @Patch('/:id/status')
  @Render('index')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDto;
    console.log('inside update controller', status);
    this.tasksService.updateTaskStatus(id, status);
    const tasklist = this.tasksService.getAllTasks();
    return { data: tasklist };
  }
  @Delete('/:id')
  @Render('index')
  deleteTask(@Param('id') id: string) {
    console.log('in delete controller');
    this.tasksService.deletetask(id);
    const tasklist = this.tasksService.getAllTasks();
    return { data: tasklist };
  }
}
