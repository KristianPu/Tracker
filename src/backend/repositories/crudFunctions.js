const getAll = async (Table) => {
    try{
      const all = await Table.find();
      return JSON.stringify(all);
    } catch (e) {
      console.log(e);
    }
}

const createOne = async (data, Table) => {
    try {
        await Table.create(data);
      } catch (e) {
        console.log(e);
      }
}

const editOne = async (filter, update, Table) => {
    try {
        await Table.updateOne(filter, update);
      } catch (e) {
        console.log(e);
      }
}

const deleteOne = async (id, Table) => {
    try {
        await Table.deleteOne({_id: id})
      } catch (e) {
        console.log(e)
      }
}

module.exports = {
    getAll,
    createOne,
    editOne,
    deleteOne,
}