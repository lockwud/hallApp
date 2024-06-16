import { Router } from "express";
import adminRouter from "./admin.router";

const mainRouter = Router();

mainRouter.use("/admin", adminRouter);

export default mainRouter;