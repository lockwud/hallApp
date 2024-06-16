"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError_1.default) {
        res.status(error.status).json({ message: error.message });
    }
    else {
        console.error('Unhandled Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.default = errorHandler;
