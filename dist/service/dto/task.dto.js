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
const base_dto_1 = require("./base.dto");
const user_dto_1 = require("./user.dto");
const project_dto_1 = require("./project.dto");
const comment_dto_1 = require("./comment.dto");
/**
 * An Task DTO object.
 */
class TaskDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyTaskTitle', description: 'Task title', required: false }),
    __metadata("design:type", String)
], TaskDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyTaskName', description: 'Task name', required: false }),
    __metadata("design:type", String)
], TaskDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyDescription', description: 'Task description', required: false }),
    __metadata("design:type", String)
], TaskDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: project_dto_1.ProjectDTO, description: 'Project Category DTO object', required: false }),
    __metadata("design:type", project_dto_1.ProjectDTO)
], TaskDTO.prototype, "project", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        isArray: true,
        type: user_dto_1.UserDTO,
        description: 'List users assign', required: false
    }),
    __metadata("design:type", Array)
], TaskDTO.prototype, "usersAssign", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'DONE', description: 'Task status', required: false }),
    __metadata("design:type", String)
], TaskDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2, description: 'Time tracking spent', required: false }),
    __metadata("design:type", Number)
], TaskDTO.prototype, "timeTrackingSpent", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 10, description: 'Time tracking remaining', required: false }),
    __metadata("design:type", Number)
], TaskDTO.prototype, "timeTrackingRemaining", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Bugs', description: 'Task type', required: false }),
    __metadata("design:type", String)
], TaskDTO.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'High', description: 'Priority', required: false }),
    __metadata("design:type", String)
], TaskDTO.prototype, "priority", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 5, description: 'Original Estimate', required: false }),
    __metadata("design:type", Number)
], TaskDTO.prototype, "originalEstimate", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        isArray: true,
        type: comment_dto_1.CommentDTO,
        description: 'List comment of task', required: false
    }),
    __metadata("design:type", Array)
], TaskDTO.prototype, "comments", void 0);
exports.TaskDTO = TaskDTO;
//# sourceMappingURL=task.dto.js.map