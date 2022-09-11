const Enum = require('enum');

const columnName = new Enum({
    User: "firstName",
    Project: "name"

})

module.exports = {
    columnName,
}