import  {Router} from "express"
export const indexRoute: Router = Router();
const route = indexRoute;

import {router} from "./studentRoute"
const studentRoute = router

route.use("/student", studentRoute);

module.exports = indexRoute;