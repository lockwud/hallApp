import express, {Express, Request,Response} from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import bodyParser from "body-parser"
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 4050;

app.use(bodyParser.json());
app.use(morgan("dev"))

app.listen(port, ()=>{
    console.log(`[server]: Server is running at http://localhost:${port}`);
})