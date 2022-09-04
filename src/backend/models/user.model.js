const { model, Schema } = require("mongoose");

const newUserSchema = new Schema({
    firstName: {
        type: String,
        writable: true,
    },
    lastName: {
        type: String,
        writable: true,
    },
    email: {
        type: String,
        writable: true,
    },
    password: {
        type: String,
        writable: true,
    },
    dateCreated: {
        type: Date,
    }
    },
);

module.exports = model("User", newUserSchema);