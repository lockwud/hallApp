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
exports.deleteAllocation = exports.getAnalytics = exports.getAllAlacocation = exports.updateAllocation = exports.findAllocationById = exports.saveAllocation = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const allocation_1 = require("../helpers/allocation");
const saveAllocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const allocation = yield (0, allocation_1.addAllocation)(data);
        res.status(200).json({
            allocationDetails: allocation,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.saveAllocation = saveAllocation;
const findAllocationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const allocation = yield (0, allocation_1.allocateById)(id);
        res.status(200).json({
            allocationDetails: allocation,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.findAllocationById = findAllocationById;
const updateAllocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const allocation = yield (0, allocation_1.editAllocation)(id, data);
        res.status(200).json({
            allocation,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.updateAllocation = updateAllocation;
const getAllAlacocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allocations = yield (0, allocation_1.loadAllocations)();
        res.status(200).json({
            allocations,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getAllAlacocation = getAllAlacocation;
const getAnalytics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allocation = yield (0, allocation_1.loadAnalytics)();
        res.status(200).json({
            allocation,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getAnalytics = getAnalytics;
const deleteAllocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const allocation = yield (0, allocation_1.removeAllocation)(id);
        res.status(200).json({
            allocation,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.deleteAllocation = deleteAllocation;
