import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm';
import { TaskRepository } from '../repository/task.repository';
import { TaskDTO } from './dto/task.dto';
import { TaskMapper } from './mapper/task.mapper';
import {getConnection, createQueryBuilder, getManager, getRepository} from "typeorm"; 


@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }

    async save(taskDTO: TaskDTO): Promise<TaskDTO | undefined> {
        const newTask = TaskMapper.fromDTOtoEntity(taskDTO);

        const taskCreated = await this.taskRepository.save(newTask);

        return TaskMapper.fromEntityToDTO(taskCreated);
    }

    async findAll(options: FindManyOptions<TaskDTO>): Promise<TaskDTO[] | undefined> {
        const result = await this.taskRepository.find(options);
        const tasksDTO: TaskDTO[] = [];

        result.forEach((taskEntity) => tasksDTO.push(TaskMapper.fromEntityToDTO(taskEntity)));

        return tasksDTO;
    }

    async findOne(options: FindManyOptions<TaskDTO>): Promise<TaskDTO | undefined> {
        const result = await this.taskRepository.findOne(options);

        return TaskMapper.fromEntityToDTO(result);
    }

    async findById(id: number): Promise<TaskDTO | undefined> {
        const result = await this.taskRepository.findOne({
            relations: ['project', 'usersAssign', 'reporter'],
            where: {
                id: id,
            },
        });

        return TaskMapper.fromEntityToDTO(result);
    }

    async update(taskDTO: TaskDTO): Promise<TaskDTO | undefined> {
        const taskUpdate = TaskMapper.fromDTOtoEntity(taskDTO);

        const { id } = await this.taskRepository.save({ ...taskUpdate, lastModifiedDate: new Date() });

        const taskUpdated = await this.findById(id);

        return TaskMapper.fromEntityToDTO(taskUpdated);
    }

    async updateUserAssign(data: any) {
        const { deletedMember, projectId } = data;

        const tasks = await this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.project', 'project')
            .leftJoinAndSelect('task.reporter', 'reporter')
            .leftJoinAndSelect('task.usersAssign', 'usersAssign')
            .where(`project.id = :projectId and ( usersAssign.id = :deleteId or reporter.id = :deleteId)`, {
                projectId,
                deleteId: deletedMember?.id,
            })
            .getMany();

        const taskIds = tasks.map(item => item?.id);
        taskIds.map(async taskId => {
            const taskDetail = await this.taskRepository.findOne({
                relations: ['usersAssign', 'reporter'],
                where: {
                    id: taskId,
                },
            });
            if (taskDetail) {
                const newMembers = taskDetail?.usersAssign.filter(val => val?.id != deletedMember?.id);

                this.taskRepository.save({
                    ...taskDetail,
                    usersAssign: newMembers,
                    reporter: taskDetail?.reporter?.id === deletedMember?.id ? null : taskDetail?.reporter,
                });
            }
        });

    }

}
