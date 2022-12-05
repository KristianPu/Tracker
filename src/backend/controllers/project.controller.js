const Project = require("../models/project.model");
const { crudFunctions } = require("../repositories");

const getProjectByName = async (event, name) => {
  return await Project.findOne({name})
}

const getAllProjects = async () => {
  return await crudFunctions.getAll(Project);
}

const getAllLikeProjects = async (filter) => {
  return await Project.find(filter, {name:1, _id:0});
}

const createOneProject = async (event, data) => {
  const post = { "name": data }
  return await crudFunctions.createOne(post, Project);
}

async function editOneProject(taskId, newName) {
  const filter = { "_id": taskId };
  const update = { $set: {"name": newName }}
  return await crudFunctions.editOne(filter, update, Project);
}

async function deleteOneProject(id) {
  return await crudFunctions.deleteOne(id, Project);
}

module.exports = {
    getAllProjects,
    getProjectByName,
    createOneProject,
    editOneProject,
    deleteOneProject,
    getAllLikeProjects
}