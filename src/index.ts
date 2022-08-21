import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import "dotenv";
import ApplicationRoutes from "./app/routes";

let app = express();
let env = process.env;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/main/view"));
app.use("public", express.static(path.join(__dirname, "public")));

let port = 3500;

app.use(ApplicationRoutes.InitialRoutes());

app.listen(port, () => console.log("server started on port " + port));
