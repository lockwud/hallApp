"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const allocation_controller_1 = require("../../controllers/allocation.controller");
const zodSchema_1 = require("../../utils/zodSchema");
const validationError_1 = __importDefault(require("../../utils/validationError"));
const router = (0, express_1.Router)();
router.post('/', (0, validationError_1.default)(zodSchema_1.allocationSchema), allocation_controller_1.saveAllocation);
router.get('/:id', allocation_controller_1.findAllocationById);
router.get('/all/analytics', allocation_controller_1.getAnalytics);
router.get('/', allocation_controller_1.getAllAlacocation);
router.patch('/:id', allocation_controller_1.updateAllocation);
router.delete('/:id', allocation_controller_1.deleteAllocation);
exports.default = router;
