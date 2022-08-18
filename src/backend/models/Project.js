const { model, Schema } = require("mongoose");

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
    },
);

module.exports = model("Project", newProjectSchema);