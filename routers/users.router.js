const User = require('../src/models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users).status(200);
    } catch (e) {
        res.sendStatus(500);
    }
};

const createUser = async (req, res) => {
    const {username, job} = res.body;

    try {
        const user = await User.create({username, job});
        res.send(user).status(200);
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports = {
    getAllUsers,
    createUser
};