import { Router } from "express";
export const router: Router = Router();


import {
    registerHall, removeHall, getHall, updateHall, loadHalls
} from "../../controllers/hall.controller";
import { hallSchema } from "../../utils/zodSchema";
import validateRequest from "../../utils/validationError";

router.post('/', validateRequest(hallSchema), registerHall);

router.get('/:id', getHall);

router.get('/', loadHalls);

router.patch('/:id', updateHall);

router.delete('/:id', removeHall);

export default router;