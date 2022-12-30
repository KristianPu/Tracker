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

const loginUser = async (event, email, password) => {

    const getOne = await User.find({"email": `${email}`});
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

// const getAllUsers = async () => {
//     return await crudFunctions.getAll(User);
// }

// const createOneUser = async (event, data) => {
//     const post = { "firstName": data }
//     return await crudFunctions.createOne(post, User);
// }

// async function editOneUser(oldName, newName) {
//     const filter = { "firstName": oldName }; 
//     const update = { $set: {"firstName": newName }}
//     return await crudFunctions.editOne(filter, update, User);
// }

// async function deleteOneUser(id) {
//     return await crudFunctions.deleteOne(id, User);
// }

module.exports = {
    registerUser,
    loginUser,
    findOneUser
}