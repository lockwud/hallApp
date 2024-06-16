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
exports.loadSingleAdmin = exports.addAdmin = exports.editAdmin = exports.deleteAdmin = exports.loadAdmins = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const loadAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield prismaUtil_1.default.admin.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    });
    return admins;
});
exports.loadAdmins = loadAdmins;
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prismaUtil_1.default.admin.delete({
        where: {
            id
        }
    });
    return admin;
});
exports.deleteAdmin = deleteAdmin;
const editAdmin = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prismaUtil_1.default.admin.update({
        where: {
            id
        },
        data
    });
    return admin;
});
exports.editAdmin = editAdmin;
const addAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prismaUtil_1.default.admin.create({
        data
    });
    return admin;
});
exports.addAdmin = addAdmin;
const loadSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prismaUtil_1.default.admin.findUniqueOrThrow({
        where: {
            id
        }
    });
    return admin;
});
exports.loadSingleAdmin = loadSingleAdmin;
