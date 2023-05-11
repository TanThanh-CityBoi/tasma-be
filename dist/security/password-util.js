"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
async function transformPassword(user) {
    if (user.password) {
        user.password = await bcryptjs_1.default.hash(user.password, config_1.config.get('jhipster.security.authentication.jwt.hash-salt-or-rounds'));
    }
    return Promise.resolve();
}
exports.transformPassword = transformPassword;
//# sourceMappingURL=password-util.js.map