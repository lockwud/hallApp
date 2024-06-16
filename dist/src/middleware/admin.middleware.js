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
exports.validateEmail = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const validateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const admin = yield prismaUtil_1.default.admin.findUnique({
            where: {
                email
            }
        });
        if (admin) {
            res.status(400).json({ message: "Email Already Exists" });
        }
        else {
            req.admin = admin;
            next();
        }
    }
    catch (error) {
        console.error('Error in validateEmail middleware:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.validateEmail = validateEmail;
