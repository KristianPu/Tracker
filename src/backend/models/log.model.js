const { model, Schema } = require("mongoose");
const { newProjectSchema } = require("./project.model");
const { newUserSchema } = require("./user.model");

const newLogSchema = new Schema({
    timeSpent: {
        type: Number,
    },
    dateCreated: {
        type: Date,
    },
    projectId: {
        type: Schema.Types.ObjectId, ref: 'Project'
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    },
);

module.exports = model("Log", newLogSchema);