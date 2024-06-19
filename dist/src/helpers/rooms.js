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
exports.removeRoom = exports.updateRoom = exports.getSingleRoom = exports.getRoom = exports.saveRoom = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const saveRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prismaUtil_1.default.rooms.create({ data });
    return room;
});
exports.saveRoom = saveRoom;
const getRoom = () => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prismaUtil_1.default.rooms.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    });
    return room;
});
exports.getRoom = getRoom;
const getSingleRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prismaUtil_1.default.rooms.findUnique({
        where: {
            id
        }
    });
    return room;
});
exports.getSingleRoom = getSingleRoom;
const updateRoom = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prismaUtil_1.default.rooms.update({
        where: {
            id
        },
        data
    });
    return room;
});
exports.updateRoom = updateRoom;
const removeRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prismaUtil_1.default.rooms.delete({
        where: {
            id
        }
    });
    return room;
});
exports.removeRoom = removeRoom;
