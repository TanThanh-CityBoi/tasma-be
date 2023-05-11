"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_entity_1 = require("../../domain/comment.entity");
const comment_dto_1 = require("../dto/comment.dto");
/**
 * An Comment mapper object.
 */
class CommentMapper {
    static fromDTOtoEntity(commentDTO) {
        if (!commentDTO) {
            return;
        }
        const comment = new comment_entity_1.Comment();
        const fields = Object.getOwnPropertyNames(commentDTO);
        fields.forEach(field => {
            comment[field] = commentDTO[field];
        });
        return comment;
    }
    static fromEntityToDTO(comment) {
        if (!comment) {
            return;
        }
        const commentDTO = new comment_dto_1.CommentDTO();
        const fields = Object.getOwnPropertyNames(comment);
        fields.forEach(field => {
            commentDTO[field] = comment[field];
        });
        return commentDTO;
    }
}
exports.CommentMapper = CommentMapper;
//# sourceMappingURL=comment.mapper.js.map