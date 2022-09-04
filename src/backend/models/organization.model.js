const { model, Schema } = require("mongoose");

const newOrganizationSchema = new Schema({
    name: {
        type: String,
        writable: true,
    },
    dateCreated: {
        type: Date,
    }
    },
);

module.exports = model("Organization", newOrganizationSchema);