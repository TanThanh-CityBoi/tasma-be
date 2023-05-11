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
const common_1 = require("@nestjs/common");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
const project_category_dto_1 = require("../../service/dto/project-category.dto");
const project_category_service_1 = require("../../service/project-category.service");
let ProjectCategoryController = class ProjectCategoryController {
    constructor(projectCategoyService) {
        this.projectCategoyService = projectCategoyService;
        this.logger = new common_1.Logger('ProjectCategoryController');
    }
    async getAllProjectCategories() {
        return this.projectCategoyService.findAll();
    }
};
__decorate([
    common_1.Get('/get-all')
    // @Roles(RoleType.ADMIN)
    ,
    swagger_1.ApiOperation({ title: 'Get the list of project categories' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all project categories',
        type: project_category_dto_1.ProjectCategoryDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectCategoryController.prototype, "getAllProjectCategories", null);
ProjectCategoryController = __decorate([
    common_1.Controller('api/project-category')
    // @UseGuards(AuthGuard, RolesGuard)
    ,
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor, common_1.ClassSerializerInterceptor)
    // @ApiBearerAuth()
    ,
    swagger_1.ApiUseTags('project-category-resource'),
    __metadata("design:paramtypes", [project_category_service_1.ProjectCategoryService])
], ProjectCategoryController);
exports.ProjectCategoryController = ProjectCategoryController;
//# sourceMappingURL=project-category.controller.js.map