import {Router} from "express"
import * as request from "../../controllers/roomRequestController"

const requestRouter = Router();

requestRouter.post("/save", request.addRequest)
requestRouter.get("/list", request.getRequests)
requestRouter.get("/:id", request.getRequestById)
requestRouter.patch("/:id", request.updateRequest)
requestRouter.delete("/:id", request.removeRequest)

export default requestRouter;