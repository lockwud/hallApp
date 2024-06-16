import { Router } from "express";
import mainRouter from "./v1";

const appRouter = Router();

appRouter.use("/api/v1", mainRouter);

export default appRouter;