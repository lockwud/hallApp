import {Router} from "express"
export const router: Router = Router();

import * as student from "../../../controllers/studentController"

router.post("/signUp", student.registerStudent  );

module.exports = router;