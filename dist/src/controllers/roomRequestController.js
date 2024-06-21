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
exports.getRequestById = exports.getRequests = exports.addRequest = void 0;
const httpstatus_1 = require("../utils/httpstatus");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const logger_1 = __importDefault(require("../utils/logger"));
const roomRequest_1 = require("../helpers/roomRequest");
const addRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const request = yield (0, roomRequest_1.makeRequest)(data);
        res.status(httpstatus_1.httpstatus.OK).json({
            requestDetails: request,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.addRequest = addRequest;
const getRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield (0, roomRequest_1.loadRequests)();
        res.status(httpstatus_1.httpstatus.OK).json({
            requests,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.getRequests = getRequests;
const getRequestById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const request = yield (0, roomRequest_1.loadSingleRequest)(studentId);
        res.status(httpstatus_1.httpstatus.OK).json({
            requestDetails: request
        });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.getRequestById = getRequestById;
