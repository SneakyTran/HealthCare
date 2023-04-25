import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            message: "Missing parameters!",
        });
    }
    let userCheck = await userService.handleUserLogin(req.body);

    return res.status(200).json({
        errCode: userCheck.errCode,
        message: userCheck.errMsg,
        userCheck,
    });
};

let handleGetAllUsers = async (req, res) => {
    let { id } = req.body;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
        });
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: "OK",
        users,
    });
};

module.exports = { handleLogin, handleGetAllUsers };
