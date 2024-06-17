"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const config_1 = __importDefault(require("config"));
const logFormat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.align(), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}:${info.message}`));
const transport = new winston_daily_rotate_file_1.default({
    filename: `${config_1.default.get('logConfig.logFolder')}${config_1.default.get('logConfig.logFile')}`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    level: config_1.default.get('logConfig.logLevel'),
});
const logger = winston_1.default.createLogger({
    format: logFormat,
    transports: [
        transport,
        new winston_1.default.transports.Console({
            level: 'info',
        }),
    ],
});
exports.default = logger;
