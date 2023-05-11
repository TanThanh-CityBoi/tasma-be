"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_entity_1 = require("../../domain/task.entity");
const task_dto_1 = require("../dto/task.dto");
/**
 * An Task mapper object.
 */
class TaskMapper {
    static fromDTOtoEntity(taskDTO) {
        if (!taskDTO) {
            return;
        }
        const task = new task_entity_1.Task();
        const fields = Object.getOwnPropertyNames(taskDTO);
        fields.forEach(field => {
            task[field] = taskDTO[field];
        });
        return task;
    }
    static fromEntityToDTO(task) {
        if (!task) {
            return;
        }
        const taskDTO = new task_dto_1.TaskDTO();
        const fields = Object.getOwnPropertyNames(task);
        fields.forEach(field => {
            taskDTO[field] = task[field];
        });
        return taskDTO;
    }
}
exports.TaskMapper = TaskMapper;
//# sourceMappingURL=task.mapper.js.map