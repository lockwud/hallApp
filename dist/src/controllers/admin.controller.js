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
exports.removeAdmin = exports.getSingleAdmin = exports.updateAdmin = exports.getAdmins = exports.login = exports.adminSignUp = void 0;
const argon2_1 = require("../utils/argon2");
const httpstatus_1 = require("../utils/httpstatus");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const admin_1 = require("../helpers/admin");
const logger_1 = __importDefault(require("../utils/logger"));
const adminSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.password = yield (0, argon2_1.hashPassword)(data.password);
        const admin = yield (0, admin_1.addAdmin)(data);
        if (!admin) {
            throw new CustomError_1.default(500, "An Error Occured");
        }
        const { password } = admin, adminWithoutPassword = __rest(admin, ["password"]);
        console.log(adminWithoutPassword);
        res.status(httpstatus_1.httpstatus.CREATED).json({
            message: "Admin Registered Successfully",
            adminWithoutPassword,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.adminSignUp = adminSignUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const systemPassword = req.admin.password;
        const checkPassword = yield (0, argon2_1.verifyPassword)(password, systemPassword);
        if (!checkPassword) {
            throw new CustomError_1.default(400, 'Invalid credentials');
        }
        else {
            delete req.admin.password;
            res.status(200).json({
                message: 'User successfully logged in!',
                id: req.admin.id,
            });
        }
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.login = login;
const getAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, admin_1.loadAdmins)();
        res.status(200).json({
            admins
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.getAdmins = getAdmins;
const updateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const admin = yield (0, admin_1.editAdmin)(id, data);
        res.status(200).json({
            admin
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.updateAdmin = updateAdmin;
//  can nestjs be used for microservices?
const getSingleAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield (0, admin_1.loadSingleAdmin)(id);
        const { password } = admin, adminWithoutPassword = __rest(admin, ["password"]);
        res.status(200).json({
            adminWithoutPassword
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.getSingleAdmin = getSingleAdmin;
const removeAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield (0, admin_1.deleteAdmin)(id);
        res.status(200).json({
            admin
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.removeAdmin = removeAdmin;
