import { Router } from "express"
export const router: Router = Router();

import * as student from "../../controllers/studentController"
import { checkAvailability } from "../../middleware/studentCheck";
import upload from "../../middleware/multer"
import { studentSchema } from "../../utils/zodSchema";
import validateRequest from "../../utils/validationError";


router.post("/signUp",  upload.single("profile"), validateRequest(studentSchema), checkAvailability, student.registerStudent);
router.post("/login", student.login)
router.get("/list", student.getStudents)
router.get("/:id", student.getStudentsById)
router.patch("/:studentId", student.updateStudentData)
router.delete("/:studentId", student.deleteStudentData)

export default router;