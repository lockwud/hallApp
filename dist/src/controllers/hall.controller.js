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
exports.removeHall = exports.updateHall = exports.loadHalls = exports.getHall = exports.registerHall = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const httpstatus_1 = require("../utils/httpstatus");
const hall_1 = require("../helpers/hall");
const registerHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const hall = yield (0, hall_1.addHall)(data);
        res.status(httpstatus_1.httpstatus.OK).json({
            hall,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.registerHall = registerHall;
const getHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const hall = yield (0, hall_1.getSingle)(id);
        res.status(httpstatus_1.httpstatus.OK).json({
            hall,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.getHall = getHall;
const loadHalls = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hall = yield (0, hall_1.getHalls)();
        res.status(httpstatus_1.httpstatus.OK).json({
            hall,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.loadHalls = loadHalls;
const updateHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const hall = yield (0, hall_1.editHall)(id, data);
        res.status(httpstatus_1.httpstatus.OK).json({
            hall,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.updateHall = updateHall;
const removeHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const hall = yield (0, hall_1.deleteHall)(id);
        res.status(httpstatus_1.httpstatus.OK).json({
            hall,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.removeHall = removeHall;
