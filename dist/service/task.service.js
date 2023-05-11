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
const typeorm_1 = require("@nestjs/typeorm");
const task_repository_1 = require("../repository/task.repository");
const task_mapper_1 = require("./mapper/task.mapper");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async save(taskDTO) {
        const newTask = task_mapper_1.TaskMapper.fromDTOtoEntity(taskDTO);
        const taskCreated = await this.taskRepository.save(newTask);
        return task_mapper_1.TaskMapper.fromEntityToDTO(taskCreated);
    }
    async findAll(options) {
        const result = await this.taskRepository.find(options);
        const tasksDTO = [];
        result.forEach((taskEntity) => tasksDTO.push(task_mapper_1.TaskMapper.fromEntityToDTO(taskEntity)));
        return tasksDTO;
    }
    async findOne(options) {
        const result = await this.taskRepository.findOne(options);
        return task_mapper_1.TaskMapper.fromEntityToDTO(result);
    }
    async findById(id) {
        const result = await this.taskRepository.findOne({
            relations: ['project', 'usersAssign'],
            where: {
                id: id,
            }
        });
        return task_mapper_1.TaskMapper.fromEntityToDTO(result);
    }
    async update(taskDTO) {
        const taskUpdate = task_mapper_1.TaskMapper.fromDTOtoEntity(taskDTO);
        const { id } = await this.taskRepository.save(taskUpdate);
        const taskUpdated = await this.findById(id);
        return task_mapper_1.TaskMapper.fromEntityToDTO(taskUpdated);
    }
};
TaskService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_repository_1.TaskRepository)),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map