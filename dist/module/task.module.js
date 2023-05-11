"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const management_controller_1 = require("../web/rest/management.controller");
const typeorm_1 = require("@nestjs/typeorm");
const task_repository_1 = require("../repository/task.repository");
const task_controller_1 = require("../web/rest/task.controller");
const task_service_1 = require("../service/task.service");
const comment_module_1 = require("./comment.module");
let TaskModule = class TaskModule {
};
TaskModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([task_repository_1.TaskRepository]), comment_module_1.CommentModule],
        controllers: [task_controller_1.TaskController, management_controller_1.ManagementController],
        providers: [task_service_1.TaskService],
        exports: [task_service_1.TaskService],
    })
], TaskModule);
exports.TaskModule = TaskModule;
//# sourceMappingURL=task.module.js.map