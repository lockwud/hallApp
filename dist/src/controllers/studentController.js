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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteStudentData = exports.updateStudentData = exports.getStudentsById = exports.getStudents = exports.registerStudent = void 0;
const httpstatus_1 = require("../utils/httpstatus");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const argon2_1 = require("../utils/argon2");
const logger_1 = __importDefault(require("../utils/logger"));
const cloudinary_1 = require("../utils/cloudinary");
const student_1 = require("../helpers/student");
const zodSchema_1 = require("../utils/zodSchema");
const registerStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        zodSchema_1.studentSchema.parse(req.body);
        data.password = yield (0, argon2_1.hashPassword)(data.password);
        data.level = parseInt(data.level);
        const profile = req.file ? req.file.path : undefined;
        if (profile) {
            const uploaded = yield cloudinary_1.cloudinary.uploader.upload(profile, {
                folder: "student/profile",
            });
            if (uploaded) {
                data.profile = uploaded.secure_url;
            }
        }
        const student = yield (0, student_1.addStudent)(data);
        if (!student) {
            throw new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, "An Error Occured");
        }
        //   destructure  the password out of the student object 
        const { password } = student, studentWithoutPassword = __rest(student, ["password"]);
        // clear this comment
        //  if you want you can put the studentwithoutpassword in the  student variable but you will have to change it to const
        res.status(httpstatus_1.httpstatus.OK).json({ message: "Student Registered Successfully", studentWithoutPassword });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, error.toString()));
    }
});
exports.registerStudent = registerStudent;
const getStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield (0, student_1.getStudent)();
        res.status(httpstatus_1.httpstatus.OK).json({ student });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, error.toString()));
    }
});
exports.getStudents = getStudents;
const getStudentsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const student = yield (0, student_1.getStudentById)(studentId);
        res.status(httpstatus_1.httpstatus.OK).json({ student });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, error.toString()));
    }
});
exports.getStudentsById = getStudentsById;
const updateStudentData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const data = req.body;
        const student = yield (0, student_1.updateStudent)(studentId, data);
        res.status(httpstatus_1.httpstatus.OK).json({ student });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, error.toString()));
    }
});
exports.updateStudentData = updateStudentData;
const deleteStudentData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const student = yield (0, student_1.deleteStudent)(studentId);
        res.status(httpstatus_1.httpstatus.OK).json({ message: "Student removed successfully", student });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, error.toString()));
    }
});
exports.deleteStudentData = deleteStudentData;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telephone, password } = req.body;
        const login = (0, student_1.signIn)(telephone);
        const studentPassword = req.student.password;
        if (!telephone) {
            res.status(httpstatus_1.httpstatus.UNAUTHORIZED).json({ message: "Invalid Credentials" });
        }
        else {
            const checkPassword = yield (0, argon2_1.verifyPassword)(password, studentPassword);
            if (!checkPassword) {
                throw new CustomError_1.default(httpstatus_1.httpstatus.BAD_REQUEST, 'Invalid credentials');
            }
            else {
                delete req.student.password;
                res.status(httpstatus_1.httpstatus.OK).json({
                    message: 'Student successfully logged in!',
                    id: req.student.studentId
                });
            }
        }
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(httpstatus_1.httpstatus.INTERNAL_SERVER_ERROR, error.toString()));
    }
});
exports.login = login;
