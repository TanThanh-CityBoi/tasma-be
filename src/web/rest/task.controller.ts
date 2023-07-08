import {
    Body,
    Controller,
    Logger,
    Post,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Get,
    Req,
    Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TaskDTO } from '../../service/dto/task.dto';
import { TaskService } from '../../service/task.service';
import { CommentService } from '../../service/comment.service';
import { NotificationService } from '../../service/notification.service';
import { UserService } from '../../service/user.service';

@Controller('api/task')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('task-resource')
export class TaskController {
    logger = new Logger('TaskController');

    constructor(
        private readonly taskService: TaskService,
        private readonly commetService: CommentService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
    ) {}

    @Post('/create-task')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create task' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TaskDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createTask(@Body() taskDTO: TaskDTO, @Req() req: Request): Promise<TaskDTO | undefined> {
        const user: any = req.user;
        taskDTO.createdBy = user.firstName || 'Anonymous';

        const taskCreated = await this.taskService.save(taskDTO);
        const usersAssign = taskCreated?.usersAssign || [];
        usersAssign.forEach(async (item, _id) => {
            const user = await this.userService.findByFields({ where: { id: item?.id } });
            if (user) {
                this.notificationService.assignedTask({
                    taskName: taskCreated?.name,
                    reqUser: user?.login,
                    projectId: taskCreated?.project?.id,
                });
            }
        });

        return taskCreated;
    }

    @Get('/get-all-by-project')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get the list of task' })
    @ApiResponse({
        status: 200,
        description: 'List all tasks by project',
        type: TaskDTO,
    })
    async getAllTasksByProject(@Req() req: Request): Promise<TaskDTO[]> {
        let { projectId, status } = req.query;
        const tasks = await this.taskService.findAll({
            relations: ['usersAssign', 'reporter'],
            where: {
                project: {
                    id: projectId,
                },
                status: status,
            },
        });

        return tasks;
    }

    @Get('/get-task-detail')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get task detail by id' })
    @ApiResponse({
        status: 200,
        description: 'Task detail',
        type: TaskDTO,
    })
    async getProjectDetail(@Req() req: Request): Promise<TaskDTO | undefined> {
        const taskId = req.query.id;
        const task = await this.taskService.findById(taskId);
        const comments = await this.commetService.findAllByTask(taskId);
        task.comments = [...comments];

        return task;
    }

    @Put('/update')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Update task' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TaskDTO,
    })
    async updateProject(@Body() taskDTO: TaskDTO): Promise<TaskDTO | undefined> {
        const taskUpdated = await this.taskService.update(taskDTO);

        return taskUpdated;
    }

    @Post('/send-mail')
    async sendMail() {
        this.notificationService.updateTaskNotify({});
    }
}