import {Router} from "express"
export const mainRouter: Router = Router();

import {indexRoute} from "./web/index"
mainRouter.use("/web", indexRoute);

module.exports = mainRouter;