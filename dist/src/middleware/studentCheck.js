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
exports.checkAvailability = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const httpstatus_1 = require("../utils/httpstatus");
const checkAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telephone = req.body;
        const student = yield prismaUtil_1.default.student.findUnique({
            where: {
                telephone
            }
        });
        if (!student) {
            res.status(httpstatus_1.httpstatus.UNAUTHORIZED).json({ message: "Student Already Registered" });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        next(new CustomError_1.default(500, error.toString()));
    }
});
exports.checkAvailability = checkAvailability;
