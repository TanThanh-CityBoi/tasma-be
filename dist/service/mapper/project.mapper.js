"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_entity_1 = require("../../domain/project.entity");
const project_dto_1 = require("../dto/project.dto");
/**
 * An Project mapper object.
 */
class ProjectMapper {
    static fromDTOtoEntity(projectDTO) {
        if (!projectDTO) {
            return;
        }
        const project = new project_entity_1.Project();
        const fields = Object.getOwnPropertyNames(projectDTO);
        fields.forEach(field => {
            project[field] = projectDTO[field];
        });
        return project;
    }
    static fromEntityToDTO(project) {
        if (!project) {
            return;
        }
        const projectDTO = new project_dto_1.ProjectDTO();
        const fields = Object.getOwnPropertyNames(project);
        fields.forEach(field => {
            projectDTO[field] = project[field];
        });
        return projectDTO;
    }
}
exports.ProjectMapper = ProjectMapper;
//# sourceMappingURL=project.mapper.js.map