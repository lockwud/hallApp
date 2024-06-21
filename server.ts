import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser'
import morgan from "morgan"
import appRouter from "./src/routers";
import errorHandler from "./src/middleware/errorHandler";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 4050;


app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(appRouter)
app.use(morgan("dev"))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})