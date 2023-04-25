import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = input;
            let isExisted = await isExistedEmail(email);
            let userMsg = {};
            if (isExisted) {
                //compare password
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ["email", "firstName", "lastName", "password"],
                    raw: true,
                });
                if (user) {
                    //check password
                    let checkPassword = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (checkPassword) {
                        //OK
                        userMsg.errCode = 0;
                        userMsg.errMsg = "OK";
                        delete user.password;
                        userMsg.user = user;
                    } else {
                        //wrong password
                        userMsg.errCode = 3;
                        userMsg.errMsg = "Wrong password";
                    }
                } else {
                    userMsg.errCode = 2;
                    userMsg.errMsg =
                        "Your email is not existed. Please try again!";
                }
            } else {
                //not existed email
                userMsg.errCode = 1;
                userMsg.errMsg = "Your email is not existed. Please try again!";
            }
            resolve(userMsg);
        } catch (error) {
            reject(error);
        }
    });
};

let isExistedEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExisted = await db.User.findOne({
                where: { email: email },
            });
            if (isExisted) {
                resolve(true);
            } else resolve(false);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = [];
            if (userId === "ALL") {
                users = await db.User.findAll({
                    raw: true,
                    attributes: { exclude: ["password"] },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findAll({
                    where: { id: userId },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { handleUserLogin, getAllUsers };
