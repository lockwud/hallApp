import {Router} from "express"
export const router: Router = Router();

import * as student from "../../controllers/studentController"

router.post("/signUp", student.registerStudent);
router.post("/login", student.login)
router.get("/list", student.getStudents)
router.get("/:id", student.getStudentsById)
router.patch("/:id", student.updateStudentData)
router.delete("/:id", student.deleteStudentData)

export default router;