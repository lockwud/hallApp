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
exports.removeAllocation = exports.loadAnalytics = exports.loadAllocations = exports.editAllocation = exports.allocateById = exports.addAllocation = void 0;
const prismaUtil_1 = __importDefault(require("../utils/prismaUtil"));
const addAllocation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const allocation = yield prismaUtil_1.default.allocation.create({
        data,
    });
    return allocation;
});
exports.addAllocation = addAllocation;
const allocateById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const allocation = yield prismaUtil_1.default.allocation.findUnique({
        where: {
            id,
        },
    });
    return allocation;
});
exports.allocateById = allocateById;
const editAllocation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const allocation = yield prismaUtil_1.default.allocation.update({
        where: {
            id,
        },
        data,
    });
    return allocation;
});
exports.editAllocation = editAllocation;
const loadAllocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const allocations = yield prismaUtil_1.default.allocation.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return allocations;
});
exports.loadAllocations = loadAllocations;
const loadAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const allocation = yield prismaUtil_1.default.allocation.groupBy({
        by: ['roomsId', 'studentId'],
        _count: true,
    });
    return allocation;
});
exports.loadAnalytics = loadAnalytics;
const removeAllocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const allocation = yield prismaUtil_1.default.allocation.delete({
        where: {
            id,
        },
    });
    return allocation;
});
exports.removeAllocation = removeAllocation;
