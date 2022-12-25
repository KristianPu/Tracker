const Project = require("../models/project.model");
const { crudFunctions } = require("../repositories");

const getProjectById = async (event, id) => {
  return await crudFunctions.getOne(id, Project);
}

const getAllProjects = async () => {
  return await crudFunctions.getAll(Project);
}

const getAllLikeProjects = async (event, data) => {
  return await Project.find({"name": `/${data}/`});
}

const createOneProject = async (event, data) => {
  return await crudFunctions.createOne(data, Project);
}

async function editOneProject(event, taskId, data) {
  const filter = { "_id": taskId };
  const update = { $set: data}
  return await crudFunctions.editOne(filter, update, Project);
}

async function deleteOneProject(event, id) {
  return await crudFunctions.deleteOne(id, Project);
}

module.exports = {
    getAllProjects,
    getProjectById,
    createOneProject,
    editOneProject,
    deleteOneProject,
    getAllLikeProjects
}