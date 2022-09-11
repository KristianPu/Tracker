const Organization = require("../models/organization.model");
const { columnName } = require("../helpers/enums")
const { crudFunctions } = require("../repositories");

const getAllOrganizations = async () => {
  return await crudFunctions.getAll(Organization);
}

const createOneOrganization = async (event, data) => {
  const post = { "name": data }
  return await crudFunctions.createOne(post, Organization);
}

async function editOneOrganization(oldName, newName) {
  const filter = { "name": oldName };
  const update = { $set: {"name": newName }}
  return await crudFunctions.editOne(filter, update, Organization);
}

async function deleteOneOrganization(id) {
  return await crudFunctions.deleteOne(id, Organization);
}

module.exports = {
    getAllOrganizations,
    createOneOrganization,
    editOneOrganization,
    deleteOneOrganization,
}