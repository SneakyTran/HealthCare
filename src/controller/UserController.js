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
    let { id } = req.query;
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

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
};

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
};
