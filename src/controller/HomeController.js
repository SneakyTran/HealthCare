import db from "../models/index";

let getHomePage = async (req, res) => {
    try {
        let user = await db.User.findAll();
        console.log("CHECKOUT >>> user", user);
        return res.render("homepage.ejs", { user: JSON.stringify(user) });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = (req, res) => {
    return res.render("about.ejs");
};

module.exports = { getHomePage, getAboutPage };
