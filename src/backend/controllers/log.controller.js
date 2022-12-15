// const Log = require("../models/log.model");
// const { crudFunctions } = require("../repositories");

// const getAllLogs = async () => {
//   return await crudFunctions.getAll(Log);
// }

// const createOneLog = async (event, data) => {
//   const post = { "timeSpent": data }
//   return await crudFunctions.createOne(post, Log);
// }

// async function editOneLog(oldName, newName) {
//   const filter = { "timeSpent": oldName };
//   const update = { $set: {"timeSpent": newName }}
//   return await crudFunctions.editOne(filter, update, Log);
// }

// async function deleteOneLog(id) {
//   return await crudFunctions.deleteOne(id, Log);
// }

// module.exports = {
//     getAllLogs,
//     createOneLog,
//     editOneLog,
//     deleteOneLog,
// }