import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with given id:${id} is not found`);
    }
    return found;
  }
  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    console.log(id);
    console.log(status);
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deletetask(id: string) {
    console.log(id);
    console.log(this.tasks.length);
    const reqtask = this.tasks.findIndex((task) => task.id === id);
    console.log(reqtask);
    if (reqtask >= 0 && reqtask < this.tasks.length) {
      this.tasks.splice(reqtask, 1);
    } else {
      throw new NotFoundException(`Task with given id:${id} is not found`);
    }
  }
}
