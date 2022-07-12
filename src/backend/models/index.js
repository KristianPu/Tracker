const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
const {
    DB_HOST: host,
    DB_NAME: name,
    DB_USERNAME: username,
    DB_PASSWORD: password,
} = process.env;

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(name, username, password, {
    dialect: "mysql",
    host,
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize.authenticate()
        .then(() => console.log("Connection has been established succesfully."))
        .catch((error) => console.error("Unable to connect to the database: ", error));

sequelize.sync();
console.log("syncaono?")
module.exports = sequelize;