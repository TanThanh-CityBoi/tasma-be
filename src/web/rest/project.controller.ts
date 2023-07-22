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
    Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProjectDTO } from '../../service/dto/project.dto';
import { ProjectService } from '../../service/project.service';
import { UserDTO } from '../../service/dto/user.dto';
import { NotificationService } from '../../service/notification.service';
import { UserService } from '../../service/user.service';
import { TaskService } from '../../service/task.service';

@Controller('api/project')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('project-resource')
export class ProjectController {
    logger = new Logger('ProjectController');

    constructor(
        private readonly projectService: ProjectService,
        private readonly userService: UserService,
        private readonly notificationService: NotificationService,
        private readonly taskService: TaskService,
    ) {}

    @Post('/create-project')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create project' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProjectDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createProject(@Body() projectDTO: ProjectDTO, @Req() req: Request): Promise<ProjectDTO> {
        const user: any = req.user;
        projectDTO.createdBy = user.login || 'Anonymous';
        projectDTO.members = [user];
        const projectCreated = await this.projectService.save(projectDTO);

        return projectCreated;
    }

    @Get('/get-all')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get the list of project' })
    @ApiResponse({
        status: 200,
        description: 'List all project',
        type: ProjectDTO,
    })
    async getAllProject(@Req() req: Request): Promise<ProjectDTO[]> {
        const user: any = req.user;
        const projects = await this.projectService.findAll(user?.id);

        return projects;
    }

    @Get('/get-all-project-for-select')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get the list of project' })
    @ApiResponse({
        status: 200,
        description: 'List all project',
        type: ProjectDTO,
    })
    async getAllProjectForSelect(): Promise<ProjectDTO[]> {
        const projects = await this.projectService.findAllByOptions({});

        return projects;
    }

    @Get('/get-project-detail')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get project detail by id' })
    @ApiResponse({
        status: 200,
        description: 'Project detail',
        type: ProjectDTO,
    })
    async getProjectDetail(@Req() req: Request): Promise<ProjectDTO | undefined> {
        const id = req.query.id;
        const user: any = req?.user;
        const project = await this.projectService.findById(id);
        const isMember = project?.members?.find(member => member?.id === user?.id);
        if (isMember) return project;
        return null;
    }

    @Put('/update')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Update project' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProjectDTO,
    })
    async updateProject(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
        const projectUpdated = await this.projectService.update(projectDTO);
        return projectUpdated;
    }

    @Put('/add-member')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Update project' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProjectDTO,
    })
    async addMember(@Body() projectDTO: ProjectDTO, @Req() req: Request): Promise<ProjectDTO | undefined> {
        const reqUser: any = req?.user;
        const projectPreUpdate = await this.projectService.findById(projectDTO?.id);
        const preMembers = projectPreUpdate?.members || [];
        const projectUpdated = await this.projectService.update(projectDTO);

        const newMembers = projectUpdated?.members?.filter(member => {
            const isMember = preMembers?.find(preMember => preMember?.id === member?.id);
            return !isMember;
        });

        newMembers.forEach(async newMember => {
            const memberInfo = await this.userService.findById(newMember?.id);
            if (memberInfo) {
                this.notificationService.inviteProject({
                    projectName: projectDTO?.name,
                    reqUser: reqUser?.login,
                    projectId: projectDTO?.id,
                    targetEmail: memberInfo?.email,
                });
            }
        });

        return projectUpdated;
    }

    @Put('/delete-member')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Update project' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProjectDTO,
    })
    async deleteMember(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {

        // const preInfo = await this.projectService.findById(projectDTO?.id)
        const projectUpdated = await this.projectService.update(projectDTO);

        // delete userAssign
        // const newMembers = projectDTO?.members.map(val=>val?.id); 
        // const deletedMember = preInfo?.members.filter((member)=> !newMembers.includes(member?.id) )
        
        // this.taskService.updateUserAssign({
        //     deletedMember: deletedMember[0],
        //     projectId: projectDTO?.id
        // }) 

        return projectUpdated;
    }

    @Delete('/delete')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Delete project' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
        type: ProjectDTO,
    })
    async deleteProject(@Req() req: Request): Promise<ProjectDTO | undefined> {
        const id = req.query.id;
        const projectDeleted = await this.projectService.delete(id);

        return projectDeleted;
    }

    @Get('/list-members')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Search user' })
    @ApiResponse({
        status: 200,
        description: 'The found records',
        type: UserDTO,
    })
    async searchUserByProject(@Req() req: Request): Promise<UserDTO[] | undefined> {
        const projectId = req.query.projectId;
        const members = await this.projectService.listMembers(projectId);
        const reqUser: any = req?.user;
        const isMember = members?.find(member => member?.id === reqUser?.id);
        if (isMember) return members;
        return [];
    }
}
