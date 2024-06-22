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
exports.deleteRoom = exports.roomUpdate = exports.getRoomById = exports.listRoom = exports.addRoom = void 0;
const httpstatus_1 = require("../utils/httpstatus");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const logger_1 = __importDefault(require("../utils/logger"));
const rooms_1 = require("../helpers/rooms");
const addRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const room = yield (0, rooms_1.saveRoom)(data);
        res.status(httpstatus_1.httpstatus.OK).json({ message: "Room Saved", room });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.addRoom = addRoom;
const listRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, rooms_1.getRoom)();
        res.status(httpstatus_1.httpstatus.OK).json({ room });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.listRoom = listRoom;
const getRoomById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const room = yield (0, rooms_1.getSingleRoom)(id);
        res.status(httpstatus_1.httpstatus.OK).json({ room });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.getRoomById = getRoomById;
const roomUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const room = yield (0, rooms_1.updateRoom)(id, data);
        res.status(httpstatus_1.httpstatus.OK).json({ message: "updated", room });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.roomUpdate = roomUpdate;
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const room = yield (0, rooms_1.removeRoom)(id);
        res.status(httpstatus_1.httpstatus.OK).json({
            room
        });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.deleteRoom = deleteRoom;
