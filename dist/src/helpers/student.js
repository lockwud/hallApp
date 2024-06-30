"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getStudent = exports.addStudent = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const addStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prismaUtil_1.default.student.create({
        data
    });
    return student;
});
exports.addStudent = addStudent;
const getStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prismaUtil_1.default.student.findMany();
    return student;
});
exports.getStudent = getStudent;
const getStudentById = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prismaUtil_1.default.student.findUnique({
        where: { studentId }
    });
    return student;
});
exports.getStudentById = getStudentById;
const updateStudent = (studentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prismaUtil_1.default.student.update({
        where: {
            studentId
        },
        data
    });
    return student;
});
exports.updateStudent = updateStudent;
const deleteStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prismaUtil_1.default.student.delete({
        where: {
            studentId: studentId
        }
    });
    return student;
});
exports.deleteStudent = deleteStudent;
const signIn = (telephone) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prismaUtil_1.default.student.findUnique({
        where: {
            telephone
        }
    });
    return student;
});
exports.signIn = signIn;
