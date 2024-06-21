import { Router } from "express";
export const router: Router = Router();


import {
    registerHall, removeHall, getHall, updateHall, loadHalls
} from "../../controllers/hall.controller";


router.post('/', registerHall);

router.get('/:id', getHall);

router.get('/', loadHalls);

router.patch('/:id', updateHall);

router.delete('/:id', removeHall);

export default router;