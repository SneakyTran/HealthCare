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

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            //todo check existed email
            let check = await isExistedEmail(user.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message:
                        "Your email is already in used. Please try another email!",
                });
            }

            let hashPw = await hashUserPassword(user.password);
            let newUser = { ...user, password: hashPw };
            await db.User.create(newUser);
            resolve({
                errCode: 0,
                message: "OK",
            });
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {
                errCode: 0,
                errMessage: "",
            };
            let user = await db.User.findOne({
                where: { id },
                raw: false,
            });
            if (!user) {
                result.errCode = 2;
                result.errMessage = "Not found id: " + id;
            } else {
                await user.destroy();
            }
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

let updateUser = (input) => {
    return new Promise(async (resolve, reject) => {
        if (!input) resolve({ errCode: 2, errMessage: "Missing parameters!" });
        let { id } = input;
        try {
            let user = await db.User.findOne({ where: { id }, raw: false });
            if (user) {
                // user.dataValues = { ...user.dataValues, ...input };
                user.firstName = input.firstName;
                user.lastName = input.lastName;
                user.phoneNumber = input.phoneNumber;
                user.address = input.address;
                console.log("CHECKOUT >>> updated user", user);
                await user.save();
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User's not found",
                });
            }
            resolve({
                errCode: 0,
                message: "Update user successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
};
