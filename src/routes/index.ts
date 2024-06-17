import router, {Router} from "express"
export const mainRoute: Router = router();

import {mainRouter} from "./v1/index"
mainRoute.use("/v1", mainRouter );

module.exports = mainRoute;