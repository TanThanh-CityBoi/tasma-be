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
const project_repository_1 = require("../repository/project.repository");
const project_controller_1 = require("../web/rest/project.controller");
const project_service_1 = require("../service/project.service");
let ProjectModule = class ProjectModule {
};
ProjectModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_repository_1.ProjectRepository])],
        controllers: [project_controller_1.ProjectController, management_controller_1.ManagementController],
        providers: [project_service_1.ProjectService],
        exports: [project_service_1.ProjectService],
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map