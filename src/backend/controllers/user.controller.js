const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const registerUser = async (event, firstName, lastName, email, password) => {
    let newUser = new User({firstName, lastName, email, hash_password: password});
    newUser.hash_password = bcrypt.hashSync(password, parseInt(process.env.SALT))
    newUser.save((error, user) => {
        if (error) {
            return error.message
        } else {
            user.hash_password = undefined;
        }
    })
    return true
}

const loginUser = (event, email, password) => {

    const getOne = User.find({"email": `${email}`});
    if (!getOne[0]) {
        return false;
    } else {
        const valid = bcrypt.compareSync(password, getOne[0].hash_password);
        return valid;
    }
}

const findOneUser = async (event, email) => {
    const getOne = await User.find({"email": `${email}`})
    return getOne
}

module.exports = {
    registerUser,
    loginUser,
    findOneUser
}