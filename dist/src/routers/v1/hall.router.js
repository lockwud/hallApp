"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const hall_controller_1 = require("../../controllers/hall.controller");
const zodSchema_1 = require("../../utils/zodSchema");
const validationError_1 = __importDefault(require("../../utils/validationError"));
exports.router.post('/', (0, validationError_1.default)(zodSchema_1.hallSchema), hall_controller_1.registerHall);
exports.router.get('/:id', hall_controller_1.getHall);
exports.router.get('/', hall_controller_1.loadHalls);
exports.router.patch('/:id', hall_controller_1.updateHall);
exports.router.delete('/:id', hall_controller_1.removeHall);
exports.default = exports.router;
