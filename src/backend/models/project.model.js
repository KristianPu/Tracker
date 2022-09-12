const { model, Schema, Types } = require("mongoose");
const { newOrganizationSchema } = require("./organization.model");

const newProjectSchema = new Schema({
    name: {
        type: String,
        writable: true,
    },
    timeSpent: {
        type: Number,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    organizationId: {
        type: Types.ObjectId, ref: 'Organization'
    }
    },
);

module.exports = model("Project", newProjectSchema);