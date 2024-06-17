"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
const express_1 = __importDefault(require("express"));
exports.mainRoute = (0, express_1.default)();
const index_1 = require("./v1/index");
exports.mainRoute.use("/v1", index_1.mainRouter);
module.exports = exports.mainRoute;
