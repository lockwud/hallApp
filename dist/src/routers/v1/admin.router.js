"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../../controllers/admin.controller");
const zodSchema_1 = require("../../utils/zodSchema");
const validationError_1 = __importDefault(require("../../utils/validationError"));
const adminRouter = (0, express_1.Router)();
adminRouter.post("/signup", (0, validationError_1.default)(zodSchema_1.adminSchema), admin_controller_1.adminSignUp);
adminRouter.get("/:id", admin_controller_1.getSingleAdmin);
adminRouter.get("/", admin_controller_1.getAdmins);
adminRouter.delete("/:id", admin_controller_1.removeAdmin);
adminRouter.patch("/:id", admin_controller_1.updateAdmin);
adminRouter.post("/login", admin_controller_1.login);
exports.default = adminRouter;
