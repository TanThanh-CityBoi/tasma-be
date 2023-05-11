"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const security_1 = require("../../security");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
const project_dto_1 = require("../../service/dto/project.dto");
const project_service_1 = require("../../service/project.service");
const user_dto_1 = require("../../service/dto/user.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.logger = new common_1.Logger('ProjectController');
    }
    async createProject(projectDTO) {
        const projectCreated = await this.projectService.save(projectDTO);
        return projectCreated;
    }
    async getAllProject() {
        const projects = await this.projectService.findAll();
        return projects;
    }
    async getAllProjectForSelect() {
        const projects = await this.projectService.findAllByOptions({});
        return projects;
    }
    async getProjectDetail(req) {
        const id = req.query.id;
        const project = await this.projectService.findById(id);
        return project;
    }
    async updateProject(projectDTO) {
        const projectUpdated = await this.projectService.update(projectDTO);
        return projectUpdated;
    }
    async addMember(projectDTO) {
        const projectUpdated = await this.projectService.update(projectDTO);
        return projectUpdated;
    }
    async deleteMember(projectDTO) {
        const projectUpdated = await this.projectService.update(projectDTO);
        return projectUpdated;
    }
    async deleteProject(req) {
        const id = req.query.id;
        const projectDeleted = await this.projectService.delete(id);
        return projectDeleted;
    }
    async searchUserByProject(req) {
        const projectId = req.query.projectId;
        return await this.projectService.listMembers(projectId);
    }
};
__decorate([
    common_1.Post('/create-project'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create project' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: project_dto_1.ProjectDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    common_1.Get('/get-all'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Get the list of project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all project',
        type: project_dto_1.ProjectDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProject", null);
__decorate([
    common_1.Get('/get-all-project-for-select'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Get the list of project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all project',
        type: project_dto_1.ProjectDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProjectForSelect", null);
__decorate([
    common_1.Get('/get-project-detail'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Get project detail by id' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Project detail',
        type: project_dto_1.ProjectDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectDetail", null);
__decorate([
    common_1.Put('/update'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Update project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: project_dto_1.ProjectDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    common_1.Put('/add-member'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Update project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: project_dto_1.ProjectDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addMember", null);
__decorate([
    common_1.Put('/delete-member'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Update project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: project_dto_1.ProjectDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteMember", null);
__decorate([
    common_1.Delete('/delete'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Delete project' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
        type: project_dto_1.ProjectDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
__decorate([
    common_1.Get('/list-members'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Search user' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found records',
        type: user_dto_1.UserDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "searchUserByProject", null);
ProjectController = __decorate([
    common_1.Controller('api/project'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor, common_1.ClassSerializerInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('project-resource'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map