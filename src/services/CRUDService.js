import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            //!validate input

            //hash password
            let hashPw = await hashUserPassword(user.password);
            let newUser = { ...user, password: hashPw };
            await db.User.create(newUser);
            resolve("New user has been created");
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync("B4c0//", salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            //get all user
            let userList = await db.User.findAll({ raw: true });
            if (userList != null) {
                resolve(userList);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { createNewUser, getAllUser };
