import express from "express";
import cookieParser from "cookie-parser";
import initAPI from "./routes/api.js";
import configCors from "./config/cors.js";
import bodyParser from "body-parser";
import run from "./config/connectMongo.js";
import http from "http";
import cors from "cors";
import { initializeSocket } from './service/socket.js'
require("dotenv").config();
const app = express();
app.options('*', cors())
configCors(app);
const server = http.createServer(app);
initializeSocket(server);
//const port = process.env.PORT || 8080;
const port = 8000;
configCors(app);
//connectDB();
run().catch(console.dir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
initAPI(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
}
);



