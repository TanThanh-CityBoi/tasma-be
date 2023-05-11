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
const security_1 = require("../../security");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
const comment_service_1 = require("../../service/comment.service");
const comment_dto_1 = require("../../service/dto/comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
        this.logger = new common_1.Logger('CommentController');
    }
    async createTask(commentDTO) {
        const commentCreated = await this.commentService.save(commentDTO);
        return commentCreated;
    }
    async updateProject(commentDTO) {
        const commentUpdated = await this.commentService.update(commentDTO);
        return commentUpdated;
    }
    async deleteComment(req) {
        const commentId = req.query.id;
        const commentDeleted = await this.commentService.delete(commentId);
        return commentDeleted;
    }
};
__decorate([
    common_1.Post('/create-comment'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create comment' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: comment_dto_1.CommentDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDTO]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createTask", null);
__decorate([
    common_1.Put('/update'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Update comment' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: comment_dto_1.CommentDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDTO]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateProject", null);
__decorate([
    common_1.Delete('/delete'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Delete comment' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
        type: comment_dto_1.CommentDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    common_1.Controller('api/comment'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor, common_1.ClassSerializerInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('comment-resource'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map