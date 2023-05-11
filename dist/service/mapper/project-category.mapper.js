"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_category_entity_1 = require("../../domain/project-category.entity");
const project_category_dto_1 = require("../dto/project-category.dto");
/**
 * An Project Category mapper object.
 */
class ProjectCategoryMapper {
    static fromDTOtoEntity(projectCategoryDTO) {
        if (!projectCategoryDTO) {
            return;
        }
        const projectCategory = new project_category_entity_1.ProjectCategory();
        const fields = Object.getOwnPropertyNames(projectCategoryDTO);
        fields.forEach(field => {
            projectCategory[field] = projectCategoryDTO[field];
        });
        return projectCategory;
    }
    static fromEntityToDTO(projectCategory) {
        if (!projectCategory) {
            return;
        }
        const projectCategoryDTO = new project_category_dto_1.ProjectCategoryDTO();
        const fields = Object.getOwnPropertyNames(projectCategory);
        fields.forEach(field => {
            projectCategoryDTO[field] = projectCategory[field];
        });
        return projectCategoryDTO;
    }
}
exports.ProjectCategoryMapper = ProjectCategoryMapper;
//# sourceMappingURL=project-category.mapper.js.map