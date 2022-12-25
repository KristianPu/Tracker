const { model, Schema } = require("mongoose");
const { newOrganizationSchema } = require("./organization.model");

const newProjectSchema = new Schema({
    name: {
        type: String,
        writable: true,
    },
    timeSpent: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    organizationId: {
        type: Schema.Types.ObjectId, ref: 'Organization'
    }
    },
);

module.exports = model("Project", newProjectSchema);