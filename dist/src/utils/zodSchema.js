"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomSchema = exports.studentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.studentSchema = zod_1.default.object({
    profile: zod_1.default.string(),
    fullName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    gender: zod_1.default.string(),
    level: zod_1.default.string(),
    telephone: zod_1.default.string().length(10),
});
exports.roomSchema = zod_1.default.object({});
