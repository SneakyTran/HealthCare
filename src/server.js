import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";

require("dotenv").config(); //import process .env

//create instance of express
let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

//connect DB
connectDB();

//config PORT
let port = process.env.PORT || 8080; //default port

//listen
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
