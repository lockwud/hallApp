"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRequest = exports.roomSchema = exports.hallSchema = exports.allocationSchema = exports.adminSchema = exports.studentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.studentSchema = zod_1.default.object({
    fullName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    gender: zod_1.default.string(),
    level: zod_1.default.string(),
    telephone: zod_1.default.string().length(10),
});
exports.adminSchema = zod_1.default.object({
    fullname: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    telephone: zod_1.default.string().length(10).optional(),
});
exports.allocationSchema = zod_1.default.object({
    studentId: zod_1.default.string(),
    roomsId: zod_1.default.string(),
});
exports.hallSchema = zod_1.default.object({
    name: zod_1.default.string(),
    location: zod_1.default.string()
});
exports.roomSchema = zod_1.default.object({});
exports.roomRequest = zod_1.default.object({});
