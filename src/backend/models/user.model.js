const { model, Schema } = require("mongoose");
const bcrypt = require('bcrypt');

const newUserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    hash_password: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
    },
);

module.exports = model("User", newUserSchema);