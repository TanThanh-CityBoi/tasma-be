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
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const user_dto_1 = require("../../service/dto/user.dto");
const header_util_1 = require("../../client/header-util");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../service/auth.service");
let PublicUserController = class PublicUserController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('PublicUserController');
    }
    async getAllPublicUsers(req) {
        const sortField = req.query.sort;
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, sortField);
        const [results, count] = await this.authService.getAllUsers({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    getAuthorities(req) {
        const user = req.user;
        if (!user) {
            return [];
        }
        return user.authorities;
    }
};
__decorate([
    common_1.Get('/users'),
    swagger_1.ApiOperation({ title: 'Get the list of users' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all users records',
        type: user_dto_1.UserDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicUserController.prototype, "getAllPublicUsers", null);
__decorate([
    common_1.Get('/authorities'),
    swagger_1.ApiOperation({ title: 'Get the list of user roles' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all user roles',
        type: 'string',
        isArray: true,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PublicUserController.prototype, "getAuthorities", null);
PublicUserController = __decorate([
    common_1.Controller('api'),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor, common_1.ClassSerializerInterceptor),
    swagger_1.ApiUseTags('public-user-controller'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], PublicUserController);
exports.PublicUserController = PublicUserController;
//# sourceMappingURL=public.user.controller.js.map