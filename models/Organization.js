const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const Schema = mongoose.Schema;

mongoose.plugin(toJson);
const organizationSchema = new Schema({
    user_id: {type: String,  required: true},
    event_ids: [String],
    campaign_ids: [String],
    organization_name: {type: String, required: true, unique: true, minlength: 3},
    organization_description: {type: String, minlength: 3},
});

// Duplicate the ID field.
organizationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
organizationSchema.set('toJSON', {
    virtuals: true
});

let Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;