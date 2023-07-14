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
import { ProjectService } from '../../service/project.service';

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
        private readonly projectService: ProjectService,
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
        const reqUser: any = req.user;
        taskDTO.createdBy = reqUser.firstName || 'Anonymous';

        const taskCreated = await this.taskService.save(taskDTO);
        const usersAssign = taskCreated?.usersAssign || [];
        usersAssign.forEach(async (item, _id) => {
            const user = await this.userService.findByFields({ where: { id: item?.id } });
            if (user) {
                this.notificationService.assignedTask({
                    taskName: taskCreated?.name,
                    reqUser: reqUser?.login,
                    projectId: taskCreated?.project?.id,
                    targetEmail: user?.email,
                });
            }
        });

        if (taskCreated?.reporter) {
            this.notificationService.reporterTask({
                taskName: taskCreated?.name,
                reqUser: reqUser?.login,
                projectId: taskCreated?.project?.id,
                targetEmail: taskCreated?.reporter?.email,
            });
        }

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
        const projects: any = await this.projectService.findAllByOptions({
            relations: ['members'],
            where: {
                id: projectId,
            },
        });
        if (!projects) return [];
        const reqUser: any = req?.user;
        const isMember = projects[0]?.members?.find(member => member?.id === reqUser?.id);
        if (!isMember) return [];

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
    async updateProject(@Body() taskDTO: TaskDTO, @Req() req: Request): Promise<TaskDTO | undefined> {
        const reqUser: any = req?.user;
        const taskPre = await this.taskService.findOne({ where: { id: taskDTO?.id } });
        const listUpdate = [];
        let stringUpdate = '';
        const fieldCompares = [
            'title',
            'name',
            'description',
            'status',
            'timeTrackingSpent',
            'timeTrackingRemaining',
            'priority',
            'originalEstimate',
            'dueDate',
        ];
        fieldCompares.map(key => {
            console.log(`${key}: ${taskPre[key]}`);
            console.log(`${key}: ${taskDTO[key]}`);
            if (key == 'dueDate') {
                const preDate = new Date(taskPre[key]);
                const dateAfter = new Date(taskDTO[key]);
                if (preDate.getTime() != dateAfter.getTime()) {
                    listUpdate.push({ key, from: taskPre[key], to: taskDTO[key] });
                    stringUpdate += ` <div>${key}: ${taskPre[key]}  -->  ${taskDTO[key]}<div>`;
                }
            } else if (String(taskPre[key]) !== String(taskDTO[key])) {
                listUpdate.push({ key, from: taskPre[key], to: taskDTO[key] });
                stringUpdate += `   <div style="display: flex; align-items: center; margin-top: 50px"> 
                                        <div><b>${key.toUpperCase()} : </b></div> 

                                        <div style="display: flex; align-items: center; justify-content: space-between; min-width: 500px; margin-left: 50px;">
                                            <div style="text-decoration: line-through;"> ${taskPre[key]}</div> 
                                            <div style="display: flex; align-items: center; margin-left: 30px; margin-right: 30px"> <b style="font-size: 20px;"> &#129146; </b> </div>   
                                            <div>${taskDTO[key]}</div>
                                        </div>
                                      
                                    </div>`;
            }
        });
        const taskUpdated = await this.taskService.update(taskDTO);

        if (taskDTO?.usersAssign?.length > 0) {
            taskDTO?.usersAssign?.forEach(async (item, _id) => {
                this.notificationService.updateTaskNotify({
                    taskName: taskDTO?.name,
                    reqUser: reqUser?.login,
                    projectId: taskDTO?.project?.id,
                    updateInfo: stringUpdate,
                    targetEmail: item?.email,
                });
            });
        }

        if (taskDTO?.reporter) {
            this.notificationService.updateTaskNotify({
                taskName: taskDTO?.name,
                reqUser: reqUser?.login,
                projectId: taskDTO?.project?.id,
                updateInfo: stringUpdate,
                targetEmail: taskDTO?.reporter?.email,
            });
        }

        return taskUpdated;
    }

    @Post('/send-mail')
    async sendMail() {
        this.notificationService.updateTaskNotify({});
    }
}
