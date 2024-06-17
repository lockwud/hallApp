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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudent = void 0;
const httpstatus_1 = require("../utils/httpstatus");
const argon2_1 = require("../utils/argon2");
const student_1 = require("../helpers/student");
const registerStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.password = yield (0, argon2_1.hashPassword)(data.password);
        const student = yield (0, student_1.addStudent)(data);
        delete data.password;
        res.status(httpstatus_1.httpstatus.OK).json({ message: "Student Registered Successfully", student });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerStudent = registerStudent;
