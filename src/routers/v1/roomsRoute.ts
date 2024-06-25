import { Router } from "express"
import * as room from "../../controllers/roomController"
import { roomSchema } from "../../utils/zodSchema";
import validateRequest from "../../utils/validationError";

const roomRouter = Router();

roomRouter.post("/save", validateRequest(roomSchema), room.addRoom)
roomRouter.get("/list", room.listRoom)
roomRouter.get("/:id", room.getRoomById)
roomRouter.patch("/:id", room.roomUpdate)
roomRouter.delete("/:id", room.deleteRoom)




export default roomRouter;