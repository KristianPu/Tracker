const { model, Schema } = require("mongoose");

const newLogSchema = new Schema({
    timeSpent: {
        type: Number,
    },
    dateCreated: {
        type: Date,
    },
    },
);

module.exports = model("Log", newLogSchema);