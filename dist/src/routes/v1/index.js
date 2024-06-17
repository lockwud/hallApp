"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
exports.mainRouter = (0, express_1.Router)();
const index_1 = require("./web/index");
exports.mainRouter.use("/web", index_1.indexRoute);
module.exports = exports.mainRouter;
