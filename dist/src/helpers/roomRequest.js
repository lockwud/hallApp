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
exports.deleteRequest = exports.editRequest = exports.loadSingleRequest = exports.loadRequests = exports.makeRequest = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const makeRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prismaUtil_1.default.roomRequest.create({
        data
    });
    return request;
});
exports.makeRequest = makeRequest;
const loadRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield prismaUtil_1.default.roomRequest.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    });
    return requests;
});
exports.loadRequests = loadRequests;
const loadSingleRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prismaUtil_1.default.roomRequest.findUniqueOrThrow({
        where: {
            id
        }
    });
    return request;
});
exports.loadSingleRequest = loadSingleRequest;
const editRequest = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prismaUtil_1.default.roomRequest.update({
        where: {
            id
        },
        data
    });
    return request;
});
exports.editRequest = editRequest;
const deleteRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prismaUtil_1.default.roomRequest.delete({
        where: {
            id
        }
    });
    return request;
});
exports.deleteRequest = deleteRequest;
