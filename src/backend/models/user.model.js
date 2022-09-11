const { model, Schema } = require("mongoose");

const newUserSchema = new Schema({
    firstName: {
        type: String,
        // writable: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    dateCreated: {
        type: Date,
    }
    },
);

module.exports = model("User", newUserSchema);