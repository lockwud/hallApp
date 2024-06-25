import { Router } from "express"
import * as request from "../../controllers/roomRequestController"
import { studentSchema } from "../../utils/zodSchema";
import validateRequest from "../../utils/validationError";
const requestRouter = Router();

requestRouter.post("/save", validateRequest(studentSchema), request.addRequest)
requestRouter.get("/list", request.getRequests)
requestRouter.get("/:id", request.getRequestById)
requestRouter.patch("/:id", request.updateRequest)
requestRouter.delete("/:id", request.removeRequest)

export default requestRouter;