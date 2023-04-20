import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let user = await db.User.findAll();
        console.log("CHECKOUT >>> user", user);
        return res.render("homepage.ejs", { user: user });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = (req, res) => {
    return res.render("about.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
};

let getUser = async (req, res) => {
    let userList = await CRUDService.getAllUser();
    return res.render("user.ejs", { userList: userList });
};

module.exports = { getHomePage, getAboutPage, getCRUD, postCRUD, getUser };
