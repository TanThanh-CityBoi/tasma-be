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
const comment_repository_1 = require("../repository/comment.repository");
const comment_mapper_1 = require("./mapper/comment.mapper");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async save(commentDTO) {
        const newComment = comment_mapper_1.CommentMapper.fromDTOtoEntity(commentDTO);
        const commentCreated = await this.commentRepository.save(newComment);
        return comment_mapper_1.CommentMapper.fromEntityToDTO(commentCreated);
    }
    async findById(id) {
        const result = await this.commentRepository.findOne({
            where: {
                id: id,
            }
        });
        return comment_mapper_1.CommentMapper.fromEntityToDTO(result);
    }
    async findAllByTask(taskId) {
        const result = await this.commentRepository.find({
            where: {
                task: {
                    id: taskId,
                }
            },
            relations: ['user'],
        });
        const commentsDTO = [];
        result.forEach(comment => commentsDTO.push(comment_mapper_1.CommentMapper.fromEntityToDTO(comment)));
        return commentsDTO;
    }
    async update(commentDTO) {
        let projectToUpdate = comment_mapper_1.CommentMapper.fromDTOtoEntity(commentDTO);
        const projectUpdated = await this.commentRepository.save(projectToUpdate);
        return comment_mapper_1.CommentMapper.fromEntityToDTO(projectUpdated);
    }
    async delete(id) {
        let commentToDelete = await this.findById(id);
        const commentDeleted = await this.commentRepository.remove(commentToDelete);
        return comment_mapper_1.CommentMapper.fromEntityToDTO(commentDeleted);
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_repository_1.CommentRepository)),
    __metadata("design:paramtypes", [comment_repository_1.CommentRepository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map