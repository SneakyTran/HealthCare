import express from "express";
import HomeController from "../controller/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage);
    router.get("/about", HomeController.getAboutPage);
    return app.use("/", router);
};

module.exports = initWebRoutes;
