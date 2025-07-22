import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepo.find();
  }

  findByStatus(completed: boolean) {
    return this.taskRepo.find({ where: { completed } });
  }

  search(query: string) {
    return this.taskRepo.find({
      where: [
        { title: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
    });
  }

  create(dto: CreateTaskDto) {
    // const task = this.taskRepo.create({ ...dto, completed: false });
    const task = this.taskRepo.create(dto);
    return this.taskRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.taskRepo.update(id, dto);
    return this.taskRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.taskRepo.delete(id);
  }
}
