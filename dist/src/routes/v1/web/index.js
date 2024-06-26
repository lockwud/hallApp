"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoute = void 0;
const express_1 = require("express");
exports.indexRoute = (0, express_1.Router)();
const route = exports.indexRoute;
const studentRoute_1 = require("./studentRoute");
const studentRoute = studentRoute_1.router;
route.use("/student", studentRoute);
module.exports = exports.indexRoute;
