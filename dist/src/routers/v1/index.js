"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_router_1 = __importDefault(require("./admin.router"));
const studentRoute_1 = __importDefault(require("./studentRoute"));
const roomsRoute_1 = __importDefault(require("./roomsRoute"));
const studentRouter = studentRoute_1.default;
const mainRouter = (0, express_1.Router)();
mainRouter.use("/admin", admin_router_1.default);
mainRouter.use("/student", studentRouter);
mainRouter.use("/room", roomsRoute_1.default);
exports.default = mainRouter;
