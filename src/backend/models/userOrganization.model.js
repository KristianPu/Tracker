const { model, Schema, Types } = require("mongoose");
const { newUserSchema } = require("./user.model");
const { newOrganizationSchema } = require("./organization.model");

const newUserOrganizationSchema = new Schema({
    userId: {
        type: Types.ObjectId, ref: 'User'
    },
    organizationId: {
        type: Types.ObjectId, ref: 'Organization'
    }
})

module.exports = mongoose.model("UserOrganization", newUserOrganizationSchema)