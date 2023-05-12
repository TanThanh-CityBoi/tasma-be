"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class SeedProjectCategory1570200490073 {
    constructor() {
        this.categories = [
            { name: "Personal Project" },
            { name: "Group Project" },
            { name: "Business Project" },
        ];
    }
    async up(queryRunner) {
        const categoryRepository = typeorm_1.getRepository('project_category');
        await categoryRepository.save(this.categories);
    }
    // eslint-disable-next-line
    async down(queryRunner) { }
}
exports.SeedProjectCategory1570200490073 = SeedProjectCategory1570200490073;
//# sourceMappingURL=1570200490073-SeedProjectCategory.js.map