import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import appRouter from "./src/routers";
import errorHandler from "./src/middleware/errorHandler";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 4050;

app.use(express.json())
app.use(morgan("dev"))
app.use(appRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})