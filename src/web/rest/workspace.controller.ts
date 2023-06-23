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
import { WorkspaceService } from '../../service/workspace.service';
import { UserDTO } from '../../service/dto/user.dto';
import { WorkspaceDTO } from 'src/service/dto/workpsace.dto';


@Controller('api/workspace')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('workspace-resource')
export class WorkspaceController {
    logger = new Logger('WorkspaceController');

    constructor(private readonly workspaceService: WorkspaceService) { }

    // @Post('/create-workspace')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Create workspace' })
    // @ApiResponse({
    //     status: 201,
    //     description: 'The record has been successfully created.',
    //     type: ProjectDTO,
    // })
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    // async createProject(@Body() workspaceDTO: WorkspaceDTO): Promise<ProjectDTO> {
    //     const spaceCreated = await this.workspaceService.save(workspaceDTO);

    //     return spaceCreated;
    // }

    // @Get('/get-all')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Get the list of project' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'List all project',
    //     type: ProjectDTO,
    // })
    // async getAllProject(): Promise<ProjectDTO[]> {
    //     const projects = await this.projectService.findAll();

    //     return projects;
    // }

    // @Get('/get-all-project-for-select')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Get the list of project' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'List all project',
    //     type: ProjectDTO,
    // })
    // async getAllProjectForSelect(): Promise<ProjectDTO[]> {
    //     const projects = await this.projectService.findAllByOptions({});

    //     return projects;
    // }


    // @Get('/get-project-detail')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Get project detail by id' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Project detail',
    //     type: ProjectDTO,
    // })
    // async getProjectDetail(@Req() req: Request): Promise<ProjectDTO | undefined> {
    //     const id = req.query.id;
    //     const project = await this.projectService.findById(id);

    //     return project
    // }

    // @Put('/update')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Update project' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'The record has been successfully updated.',
    //     type: ProjectDTO,
    // })
    // async updateProject(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
    //     const projectUpdated = await this.projectService.update(projectDTO);

    //     return projectUpdated;
    // }

    // @Put('/add-member')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Update project' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'The record has been successfully updated.',
    //     type: ProjectDTO,
    // })
    // async addMember(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
    //     const projectUpdated = await this.projectService.update(projectDTO);

    //     return projectUpdated;
    // }

    // @Put('/delete-member')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Update project' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'The record has been successfully updated.',
    //     type: ProjectDTO,
    // })
    // async deleteMember(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
    //     const projectUpdated = await this.projectService.update(projectDTO);

    //     return projectUpdated;
    // }

    // @Delete('/delete')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Delete project' })
    // @ApiResponse({
    //     status: 204,
    //     description: 'The record has been successfully deleted.',
    //     type: ProjectDTO,
    // })
    // async deleteProject(@Req() req: Request): Promise<ProjectDTO | undefined> {
    //     const id = req.query.id;
    //     const projectDeleted = await this.projectService.delete(id);

    //     return projectDeleted;
    // }

    // @Get('/list-members')
    // @Roles(RoleType.USER)
    // @ApiOperation({ title: 'Search user' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'The found records',
    //     type: UserDTO,
    // })
    // async searchUserByProject(@Req() req: Request): Promise<UserDTO[] | undefined> {
    //     const projectId = req.query.projectId;
    //     return await this.projectService.listMembers(projectId);
    // }

}