// const User = require("../models/user.model");
// const { crudFunctions } = require("../repositories");

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

// module.exports = {
//     getAllUsers,
//     createOneUser,
//     editOneUser,
//     deleteOneUser,
// }