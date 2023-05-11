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
const project_entity_1 = require("./project.entity");
let ProjectCategory = class ProjectCategory extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], ProjectCategory.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => project_entity_1.Project, project => project.projectCategory),
    __metadata("design:type", Array)
], ProjectCategory.prototype, "projects", void 0);
ProjectCategory = __decorate([
    typeorm_1.Entity('project_category')
], ProjectCategory);
exports.ProjectCategory = ProjectCategory;
//# sourceMappingURL=project-category.entity.js.map