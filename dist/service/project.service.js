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
const typeorm_2 = require("typeorm");
const project_repository_1 = require("../repository/project.repository");
const project_mapper_1 = require("./mapper/project.mapper");
const user_mapper_1 = require("./mapper/user.mapper");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async save(projectDTO) {
        const newPoject = project_mapper_1.ProjectMapper.fromDTOtoEntity(projectDTO);
        let projectFind = await this.findByName(newPoject.name);
        if (projectFind) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Project name already exist!',
            };
        }
        const projectCreated = await this.projectRepository.save(newPoject);
        return project_mapper_1.ProjectMapper.fromEntityToDTO(projectCreated);
    }
    async findAll() {
        const result = await this.projectRepository.find({ relations: ['projectCategory', 'members'] });
        const projectsDTO = [];
        result.forEach((project) => projectsDTO.push(project_mapper_1.ProjectMapper.fromEntityToDTO(project)));
        return projectsDTO;
    }
    async findAllByOptions(options) {
        const result = await this.projectRepository.find(options);
        const projectsDTO = [];
        result.forEach((project) => projectsDTO.push(project_mapper_1.ProjectMapper.fromEntityToDTO(project)));
        return projectsDTO;
    }
    async findById(id) {
        const result = await this.projectRepository.findOne({
            relations: ['projectCategory', 'members'],
            where: {
                id: id,
            }
        });
        return project_mapper_1.ProjectMapper.fromEntityToDTO(result);
    }
    async findByName(name) {
        const projectFind = await this.projectRepository.findOne({ name: name });
        return project_mapper_1.ProjectMapper.fromEntityToDTO(projectFind);
    }
    async findByNameNotId(name, id) {
        const projectFind = await this.projectRepository.findOne({
            where: {
                name: name,
                id: typeorm_2.Not(id),
            }
        });
        return project_mapper_1.ProjectMapper.fromEntityToDTO(projectFind);
    }
    async update(projectDTO) {
        let projectUpdate = project_mapper_1.ProjectMapper.fromDTOtoEntity(projectDTO);
        let projectFind = await this.findByNameNotId(projectUpdate.name, projectUpdate.id);
        if (projectFind) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Project name already exist!',
            };
        }
        const projectUpdated = await this.projectRepository.save(projectDTO);
        return project_mapper_1.ProjectMapper.fromEntityToDTO(projectUpdated);
    }
    async delete(id) {
        let projectToDelete = await this.findById(id);
        const projectDeleted = await this.projectRepository.remove(projectToDelete);
        return project_mapper_1.ProjectMapper.fromEntityToDTO(projectDeleted);
    }
    async listMembers(projectId) {
        var _a;
        const result = await this.findById(projectId);
        const usersDTO = [];
        (_a = result.members) === null || _a === void 0 ? void 0 : _a.forEach(user => usersDTO.push(user_mapper_1.UserMapper.fromEntityToDTO(user)));
        return usersDTO;
    }
};
ProjectService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_repository_1.ProjectRepository)),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map