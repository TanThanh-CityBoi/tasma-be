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
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const comment_entity_1 = require("./comment.entity");
const project_entity_1 = require("./project.entity");
const user_entity_1 = require("./user.entity");
let Task = class Task extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column("longtext", { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("longtext", { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("longtext", { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(() => project_entity_1.Project, project => project.tasks),
    __metadata("design:type", project_entity_1.Project)
], Task.prototype, "project", void 0);
__decorate([
    typeorm_1.ManyToMany(() => user_entity_1.User),
    typeorm_1.JoinTable({ name: 'users_assign' }),
    __metadata("design:type", Array)
], Task.prototype, "usersAssign", void 0);
__decorate([
    typeorm_1.Column({ default: 'BACKLOG' }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "timeTrackingSpent", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "timeTrackingRemaining", void 0);
__decorate([
    typeorm_1.Column({ default: 'NEW TASK' }),
    __metadata("design:type", String)
], Task.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ default: 'LOW' }),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "originalEstimate", void 0);
__decorate([
    typeorm_1.OneToMany(() => comment_entity_1.Comment, comment => comment.task),
    __metadata("design:type", Array)
], Task.prototype, "comments", void 0);
Task = __decorate([
    typeorm_1.Entity('task')
], Task);
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map