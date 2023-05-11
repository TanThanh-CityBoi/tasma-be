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
const project_category_repository_1 = require("../repository/project-category.repository");
const project_category_controller_1 = require("../web/rest/project-category.controller");
const project_category_service_1 = require("../service/project-category.service");
let ProjectCategoryModule = class ProjectCategoryModule {
};
ProjectCategoryModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_category_repository_1.ProjectCategoryRepository])],
        controllers: [project_category_controller_1.ProjectCategoryController, management_controller_1.ManagementController],
        providers: [project_category_service_1.ProjectCategoryService],
        exports: [project_category_service_1.ProjectCategoryService],
    })
], ProjectCategoryModule);
exports.ProjectCategoryModule = ProjectCategoryModule;
//# sourceMappingURL=project-category.module.js.map