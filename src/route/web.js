import express from "express";
import HomeController from "../controller/HomeController";
import UserController from "../controller/UserController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage);
    router.get("/about", HomeController.getAboutPage);
    router.get("/crud", HomeController.getCRUD);
    router.post("/post-crud", HomeController.postCRUD);
    router.get("/get-user", HomeController.getUser);

    //USER FUNCTION
    router.post("/health-care/api/login", UserController.handleLogin);

    //USER CRUD
    router.get("/health-care/api/get-all-user", UserController.handleGetAllUsers);
    

    return app.use("/", router);
};

module.exports = initWebRoutes;
