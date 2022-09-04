const Project = require("../models/project.model");

const getAllProjects = async () => {
    try{
      const allProjects = await Project.find();
      return JSON.stringify(allProjects);
    } catch (e) {
      console.log(e);
    }
}

async function getOneProject(event, data) {
    try {
        const date = { "name" : data }
        await Project.create(date)
      } catch (e) {
        console.log(e);
      }
}

async function editOneProject(oldName, newName) {
    try {
        const filter = { name: oldName };
        const update = { $set: {name: newName }}
        await Project.updateOne(filter, update);

      } catch (e) {
        console.log(e);
      }
}

async function deleteOneProject(id) {
    try {
        await Project.deleteOne({_id: id})
      } catch (e) {
        console.log(e)
      }
}

module.exports = {
    getAllProjects,
    getOneProject,
    editOneProject,
    deleteOneProject,
}