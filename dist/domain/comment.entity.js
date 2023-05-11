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
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
let Comment = class Comment extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column("longtext", { nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => task_entity_1.Task, task => task.comments),
    __metadata("design:type", task_entity_1.Task)
], Comment.prototype, "task", void 0);
Comment = __decorate([
    typeorm_1.Entity('comment')
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map