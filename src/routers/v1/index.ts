import { Router } from "express";
import adminRouter from "./admin.router";
import router  from "./studentRoute"
import roomRouter from "./roomsRoute"
const studentRouter = router;

const mainRouter = Router();

mainRouter.use("/admin", adminRouter);
mainRouter.use("/student", studentRouter)
mainRouter.use("/room", roomRouter)

export default mainRouter;