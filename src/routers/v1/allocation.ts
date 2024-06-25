import { Router } from "express";

import { saveAllocation, findAllocationById, updateAllocation, getAllAlacocation, getAnalytics, deleteAllocation } from '../../controllers/allocation.controller'

import { allocationSchema } from "../../utils/zodSchema";
import validateRequest from "../../utils/validationError";

const router = Router()

router.post('/', validateRequest(allocationSchema), saveAllocation);

router.get('/:id', findAllocationById);

router.get('/all/analytics', getAnalytics);

router.get('/', getAllAlacocation);

router.patch('/:id', updateAllocation);

router.delete('/:id', deleteAllocation);

export default router;