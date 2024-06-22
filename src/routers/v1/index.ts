import { Router } from "express";
import adminRouter from "./admin.router";
import router  from "./studentRoute"
import roomRouter from "./roomsRoute"
const studentRouter = router;
import hall from "./hall.router"
const mainRouter = Router();
import requestRouter from "./roomRequest"


mainRouter.use("/admin", adminRouter);
mainRouter.use("/student", studentRouter)
mainRouter.use("/room", roomRouter)
mainRouter.use("/hall",hall)
mainRouter.use("request", requestRouter )

export default mainRouter;