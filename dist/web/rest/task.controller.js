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
const task_dto_1 = require("../../service/dto/task.dto");
const task_service_1 = require("../../service/task.service");
const comment_service_1 = require("../../service/comment.service");
let TaskController = class TaskController {
    constructor(taskService, commetService) {
        this.taskService = taskService;
        this.commetService = commetService;
        this.logger = new common_1.Logger('TaskController');
    }
    async createTask(taskDTO) {
        const taskCreated = await this.taskService.save(taskDTO);
        return taskCreated;
    }
    async getAllTasksByProject(req) {
        let { projectId, status } = req.query;
        const tasks = await this.taskService.findAll({
            relations: ['usersAssign'],
            where: {
                project: {
                    id: projectId,
                },
                status: status,
            }
        });
        return tasks;
    }
    async getProjectDetail(req) {
        const taskId = req.query.id;
        const task = await this.taskService.findById(taskId);
        const comments = await this.commetService.findAllByTask(taskId);
        task.comments = [...comments];
        return task;
    }
    async updateProject(taskDTO) {
        const taskUpdated = await this.taskService.update(taskDTO);
        return taskUpdated;
    }
};
__decorate([
    common_1.Post('/create-task'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create task' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: task_dto_1.TaskDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    common_1.Get('/get-all-by-project'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Get the list of task' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all tasks by project',
        type: task_dto_1.TaskDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTasksByProject", null);
__decorate([
    common_1.Get('/get-task-detail'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Get task detail by id' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Task detail',
        type: task_dto_1.TaskDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getProjectDetail", null);
__decorate([
    common_1.Put('/update'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Update task' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: task_dto_1.TaskDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateProject", null);
TaskController = __decorate([
    common_1.Controller('api/task'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor, common_1.ClassSerializerInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('task-resource'),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        comment_service_1.CommentService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map