import express from "express";
import HomeController from "../controller/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage);
    router.get("/about", HomeController.getAboutPage);
    router.get("/crud", HomeController.getCRUD);
    router.post("/post-crud", HomeController.postCRUD);

    return app.use("/", router);
};

module.exports = initWebRoutes;
