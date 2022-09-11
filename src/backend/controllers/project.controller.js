const Project = require("../models/project.model");
const { columnName } = require("../helpers/enums")
const { crudFunctions } = require("../repositories");

const getAllProjects = async () => {
  return await crudFunctions.getAll(Project);
}

const createOneProject = async (event, data) => {
  const post = { "name": data }
  return await crudFunctions.createOne(post, Project);
}

async function editOneProject(oldName, newName) {
  const filter = { "name": oldName };
  const update = { $set: {"name": newName }}
  return await crudFunctions.editOne(filter, update, Project);
}

async function deleteOneProject(id) {
  return await crudFunctions.deleteOne(id, Project);
}

module.exports = {
    getAllProjects,
    createOneProject,
    editOneProject,
    deleteOneProject,
}