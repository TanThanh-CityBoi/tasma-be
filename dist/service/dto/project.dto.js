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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const project_category_dto_1 = require("./project-category.dto");
const base_dto_1 = require("./base.dto");
const user_dto_1 = require("./user.dto");
const task_dto_1 = require("./task.dto");
/**
 * An Project DTO object.
 */
class ProjectDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyProject', description: 'Project name', required: true }),
    __metadata("design:type", String)
], ProjectDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'http://my-project-url', description: 'Project url', required: false }),
    __metadata("design:type", String)
], ProjectDTO.prototype, "url", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyDescription', description: 'Project description', required: false }),
    __metadata("design:type", String)
], ProjectDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: project_category_dto_1.ProjectCategoryDTO, description: 'Project Category DTO object', required: false }),
    __metadata("design:type", project_category_dto_1.ProjectCategoryDTO)
], ProjectDTO.prototype, "projectCategory", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        isArray: true,
        type: user_dto_1.UserDTO,
        description: 'List members', required: false
    }),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "members", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        isArray: true,
        type: task_dto_1.TaskDTO,
        description: 'List tasks', required: false
    }),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "tasks", void 0);
exports.ProjectDTO = ProjectDTO;
//# sourceMappingURL=project.dto.js.map