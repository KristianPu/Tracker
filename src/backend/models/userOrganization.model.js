const { model, Schema } = require("mongoose");

const newUserOrganizationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    organizationId: {
        type: Schema.Types.ObjectId, ref: 'Organization'
    }
})

module.exports = mongoose.model("UserOrganization", newUserOrganizationSchema)