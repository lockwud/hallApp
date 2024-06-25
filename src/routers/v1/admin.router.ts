import { Router } from "express";
import { adminSignUp, getSingleAdmin, getAdmins, removeAdmin, updateAdmin, login } from "../../controllers/admin.controller";
import { adminSchema } from "../../utils/zodSchema";

import validateRequest from "../../utils/validationError";


const adminRouter = Router();

adminRouter.post("/signup", validateRequest(adminSchema), adminSignUp);
adminRouter.get("/:id", getSingleAdmin);
adminRouter.get("/", getAdmins);
adminRouter.delete("/:id", removeAdmin);
adminRouter.patch("/:id", updateAdmin);
adminRouter.post("/login", login);

export default adminRouter;