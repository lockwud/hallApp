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
exports.getSingle = exports.deleteHall = exports.editHall = exports.getHalls = exports.addHall = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const addHall = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hall = yield prismaUtil_1.default.hall.create({
        data
    });
    return hall;
});
exports.addHall = addHall;
const getHalls = () => __awaiter(void 0, void 0, void 0, function* () {
    const hall = yield prismaUtil_1.default.hall.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    });
    return hall;
});
exports.getHalls = getHalls;
const editHall = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const hall = yield prismaUtil_1.default.hall.update({
        where: {
            id
        },
        data
    });
    return hall;
});
exports.editHall = editHall;
const deleteHall = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const hall = yield prismaUtil_1.default.hall.delete({
        where: {
            id
        }
    });
    return hall;
});
exports.deleteHall = deleteHall;
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const hall = yield prismaUtil_1.default.hall.findUnique({
        where: {
            id
        }
    });
    return hall;
});
exports.getSingle = getSingle;
